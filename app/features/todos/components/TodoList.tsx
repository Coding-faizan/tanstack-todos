import { useTodos } from "@/app/features/todos/hooks/useTodos";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { data: todos } = useTodos();
  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
