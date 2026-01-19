import { Todo } from "@/app/features/todos/todos.types";
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
  return (
    <li className="flex justify-between items-center mb-2">
      <button
        onClick={() => toggleTodoMutation.mutate(todo.id)}
        disabled={toggleTodoMutation.isPending}
        className={cn(
          "cursor-pointer",
          todo.completed ? "line-through text-gray-500" : "",
        )}
      >
        {todo.title}
      </button>
      <button
        onClick={() => deleteTodoMutation.mutate(todo.id)}
        className="text-red-500"
        disabled={deleteTodoMutation.isPending}
      >
        {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
};
