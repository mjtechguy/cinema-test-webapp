import { filterTodos, parseTitle, stats, type Todo } from "./todos";

const todos: Todo[] = [];
let nextId = 1;
const app = document.querySelector<HTMLElement>("#app");

function render(): void {
  if (!app) return;
  app.replaceChildren();
  const input = document.createElement("input");
  input.placeholder = "New todo #tag";
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || !input.value.trim()) return;
    todos.push({ id: nextId++, done: false, ...parseTitle(input.value) });
    render();
  });
  const list = document.createElement("ul");
  for (const t of filterTodos(todos, {})) {
    const li = document.createElement("li");
    li.textContent = `${t.done ? "✓" : "○"} ${t.title}`;
    li.addEventListener("click", () => {
      t.done = !t.done;
      render();
    });
    list.append(li);
  }
  const s = stats(todos);
  const footer = document.createElement("p");
  footer.textContent = `${s.done}/${s.total} done`;
  app.append(input, list, footer);
}

render();
