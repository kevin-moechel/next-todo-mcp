"use server";

import { TodoRepository } from "@/backend/todo/todo.db";
import { revalidatePath } from "next/cache";

export const addTodo = async (text: string) => {
    TodoRepository.addTodo(text);
    revalidatePath("/todo");
};

export const removeTodo = async (id: string) => {
    TodoRepository.removeTodo(id);
    revalidatePath("/todo");
};

export const completeTodo = async (id: string) => {
    TodoRepository.completeTodo(id);
    revalidatePath("/todo");
};
