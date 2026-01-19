import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "@/app/api/todos";

import { QUERY_KEYS } from "@/app/constants/queryKeys";
import { Todo } from "@/app/features/todos/todos.types";

export const useTodos: () => UseQueryResult<Todo[], Error> = () => {
  return useQuery<Todo[]>({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodos,
  });
};

export const useAddTodo: () => UseMutationResult<
  Todo,
  Error,
  string,
  unknown
> = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) =>
      queryClient.setQueryData<Todo[]>([QUERY_KEYS.TODOS], (oldTodos) => [
        ...(oldTodos as Todo[]),
        newTodo,
      ]),
  });
};

export const useToggleTodo: () => UseMutationResult<
  Todo,
  Error,
  number,
  unknown
> = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: (newTodo) =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] }),
  });
};

export const useDeleteTodo: () => UseMutationResult<
  number,
  Error,
  number,
  unknown
> = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] }),
  });
};
