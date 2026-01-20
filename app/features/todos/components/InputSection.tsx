"use client";

import { useState } from "react";
import { useAddTodo } from "@/app/features/todos/hooks/useTodos";

export const InputSection = () => {
  const [title, setTitle] = useState<string>("");
  const { mutate } = useAddTodo();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (title.trim()) {
      const newTodo = { id: Date.now(), title, completed: false };
      mutate(newTodo);
      setTitle("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="border p-2 flex-1 rounded-md"
        placeholder="Add new todo"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Todo
      </button>
    </div>
  );
};
