import { filterTodos, parseTitle, stats, type Todo } from "./todos";

const sample: Todo[] = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  title: `task ${i}`,
  done: i % 3 === 0,
  tags: i % 2 ? ["odd"] : ["even", "work"],
}));

describe("parseTitle", () => {
  it.each([
    ["buy milk #home", "buy milk", ["home"]],
    ["#Work ship  it #work", "ship it", ["work"]],
    ["plain", "plain", []],
  ])("%s", (raw, title, tags) => {
    expect(parseTitle(raw)).toEqual({ title, tags });
  });
});

describe("filterTodos", () => {
  it("combines filters", () => {
    const got = filterTodos(sample, { done: true, tag: "work", text: "task 1" });
    expect(got.every((t) => t.done && t.tags.includes("work") && t.title.includes("task 1"))).toBe(true);
    expect(got.length).toBeGreaterThan(0);
  });
});

describe("stats", () => {
  it("counts tags", () => {
    const s = stats(sample);
    expect(s.total).toBe(5000);
    expect(s.byTag.odd + s.byTag.even).toBe(5000);
  });
});
