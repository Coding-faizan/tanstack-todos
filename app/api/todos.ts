import { Todo } from "@/app/features/todos/types/todos.types";

// Mock data
let todos: Todo[] = [
  { id: 1, title: "Learn TanStack Query", completed: false },
  { id: 2, title: "Build Todo App", completed: false },
];

export const fetchTodos = async (): Promise<Todo[]> =>
  new Promise((resolve) => setTimeout(() => resolve(todos), 300));

export const addTodo = async (todo: Todo): Promise<Todo> => {
  todos.push(todo);
  return new Promise((resolve) => setTimeout(() => resolve(todo), 300));
};

export async function toggleTodo(id: number): Promise<Todo> {
  const todo = todos.find((t) => t.id === id);
  if (!todo) throw new Error("Todo not found");
  todo.completed = !todo.completed;
  return new Promise((resolve) => setTimeout(() => resolve(todo), 300));
}

export const deleteTodo = async (id: number): Promise<number> => {
  todos = todos.filter((t) => t.id !== id);
  return new Promise((resolve) => setTimeout(() => resolve(id), 300));
};
