"use client";

import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "@/app/api/todos";

import { QUERY_KEYS } from "@/app/constants/queryKeys";
import { Todo } from "@/app/features/todos/types/todos.types";

export const useTodos: () => UseQueryResult<Todo[], Error> = () => {
  return useQuery<Todo[]>({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchTodos,
  });
};

export const useAddTodo: () => UseMutationResult<
  Todo,
  Error,
  Todo,
  unknown
> = () => {
  return useMutation({
    mutationFn: addTodo,
    async onMutate(variables, context) {
      await context.client.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const previousTodos = context.client.getQueryData([QUERY_KEYS.TODOS]);

      context.client.setQueryData<Todo[]>([QUERY_KEYS.TODOS], (old) => [
        ...(old ?? []),
        variables,
      ]);

      return { previousTodos };
    },
    onSettled: (newTodo, error, variables, onMutateResult, context) => {
      if (error) {
        context.client.setQueryData(
          [QUERY_KEYS.TODOS],
          onMutateResult?.previousTodos,
        );
        return;
      }
      context.client.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};

export const useToggleTodo: () => UseMutationResult<
  Todo,
  Error,
  number,
  unknown
> = () => {
  return useMutation({
    mutationFn: toggleTodo,
    async onMutate(variables, context) {
      await context.client.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });
      const previousTodos = context.client.getQueryData([QUERY_KEYS.TODOS]);

      context.client.setQueryData<Todo[]>([QUERY_KEYS.TODOS], (old) =>
        old?.map((todo) =>
          todo.id === variables
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      );

      return { previousTodos };
    },
    onSettled: (newTodo, error, variables, onMutateResult, context) => {
      if (error) {
        context.client.setQueryData(
          [QUERY_KEYS.TODOS],
          onMutateResult?.previousTodos,
        );
        return;
      }
      context.client.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};

export const useDeleteTodo: () => UseMutationResult<
  number,
  Error,
  number,
  unknown
> = () => {
  return useMutation({
    mutationFn: deleteTodo,
    async onMutate(variables, context) {
      await context.client.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const previousTodos = context.client.getQueryData([QUERY_KEYS.TODOS]);

      context.client.setQueryData<Todo[]>([QUERY_KEYS.TODOS], (old) =>
        old?.filter((todo) => todo.id !== variables),
      );

      return { previousTodos };
    },
    onSettled: (newTodo, error, variables, onMutateResult, context) => {
      if (error) {
        context.client.setQueryData(
          [QUERY_KEYS.TODOS],
          onMutateResult?.previousTodos,
        );
        return;
      }
      context.client.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};
