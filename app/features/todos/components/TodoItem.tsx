import { Todo } from "@/app/features/todos/types/todos.types";
import {
  useDeleteTodo,
  useToggleTodo,
} from "@/app/features/todos/hooks/useTodos";
import { cn } from "@/app/utils/cn";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleToggle = () => {
    toggleTodoMutation.mutate(todo.id);
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <li className="flex justify-between items-center mb-2">
      <button
        onClick={handleToggle}
        disabled={toggleTodoMutation.isPending}
        className={cn(
          "cursor-pointer",
          todo.completed ? "line-through text-gray-500" : "",
        )}
      >
        {todo.title}
      </button>
      <button
        onClick={handleDelete}
        className="text-red-500"
        disabled={deleteTodoMutation.isPending}
      >
        {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
};
