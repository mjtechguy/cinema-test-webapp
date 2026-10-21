export type Todo = { id: number; title: string; done: boolean; tags: string[] };

export type Filter = { text?: string; done?: boolean; tag?: string };

export function parseTitle(raw: string): { title: string; tags: string[] } {
  const tags = [...raw.matchAll(/#([\w-]+)/g)].map((m) => m[1].toLowerCase());
  const title = raw.replace(/#[\w-]+/g, "").replace(/\s+/g, " ").trim();
  return { title, tags: [...new Set(tags)] };
}

export function filterTodos(todos: Todo[], f: Filter): Todo[] {
  const text = f.text?.toLowerCase();
  return todos.filter(
    (t) =>
      (text === undefined || t.title.toLowerCase().includes(text)) &&
      (f.done === undefined || t.done === f.done) &&
      (f.tag === undefined || t.tags.includes(f.tag)),
  );
}

export function stats(todos: Todo[]): { total: number; done: number; byTag: Record<string, number> } {
  const byTag: Record<string, number> = {};
  for (const t of todos) for (const tag of t.tags) byTag[tag] = (byTag[tag] ?? 0) + 1;
  return { total: todos.length, done: todos.filter((t) => t.done).length, byTag };
}
