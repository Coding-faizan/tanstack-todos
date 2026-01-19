import { Todo } from "@/app/features/todos/todos.types";
import {
  useDeleteTodo,
  useToggleTodo,
} from "@/app/features/todos/hooks/useTodos";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();
  return (
    <li className="flex justify-between items-center mb-2">
      <span
        onClick={() => toggleTodoMutation.mutate(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodoMutation.mutate(todo.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </li>
  );
};
