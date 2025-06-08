import "server-only";

import { todos } from "@/backend/todo/todo.db";

export const getTodos = async () => {
    return [...todos].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });
};
