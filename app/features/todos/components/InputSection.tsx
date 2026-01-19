import { useState } from "react";
import { useAddTodo } from "@/app/features/todos/hooks/useTodos";

export const InputSection = () => {
  const [title, setTitle] = useState("");
  const addTodoMutation = useAddTodo();

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodoMutation.mutate(title);
      setTitle("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Add new todo"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add
      </button>
    </div>
  );
};
