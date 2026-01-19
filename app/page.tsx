"use client";

import { InputSection, TodoList } from "@/app/features/todos/components/index";

export default function TodoPage() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <InputSection />
      <TodoList />
    </div>
  );
}
