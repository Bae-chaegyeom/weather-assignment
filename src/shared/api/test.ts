import { getJson } from "./http";

export type Todo = { id: number; title: string; completed: boolean };

export function fetchTestTodo() {
  return getJson<Todo>("https://jsonplaceholder.typicode.com/todos/1");
}