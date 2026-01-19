import { useState } from "react";
import { useAddTodo } from "@/app/features/todos/hooks/useTodos";

export const InputSection = () => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useAddTodo();

  const handleAddTodo = () => {
    if (title.trim()) {
      mutate(title);
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
        disabled={isPending}
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Todo"}
      </button>
    </div>
  );
};
