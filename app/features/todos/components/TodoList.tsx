"use client";

import { useTodos } from "@/app/features/todos/hooks/useTodos";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading todos.</div>;
  }

  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
