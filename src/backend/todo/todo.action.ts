"use server";

import { todos } from "@/backend/todo/todo.db";
import { revalidatePath } from "next/cache";

export const addTodo = async (text: string) => {
    console.log("addTodo", text);
    todos.push({
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
    });
    revalidatePath("/todo");
};

export const removeTodo = async (id: string) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    revalidatePath("/todo");
};

export const completeTodo = async (id: string) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos[index].completed = true;
    }
    revalidatePath("/todo");
};
