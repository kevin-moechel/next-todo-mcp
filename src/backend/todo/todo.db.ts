import { Todo } from "@/backend/todo/todo.type";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "todos.json");

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

export const TodoRepository = {
    getTodos: (userId: string) => {
        const todos = fs.existsSync(DB_PATH)
            ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
            : [];
        return (todos as Todo[]).filter((todo) => todo.userId === userId);
    },
    addTodo: (text: string, userId: string) => {
        const todos = fs.existsSync(DB_PATH)
            ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
            : [];
        todos.push({
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date(),
            userId,
        });
        fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
    },
    removeTodo: (id: string, userId: string) => {
        const todos = fs.existsSync(DB_PATH)
            ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
            : [];
        const index = todos.findIndex(
            (todo: Todo) => todo.id === id && todo.userId === userId
        );
        if (index !== -1) {
            todos.splice(index, 1);
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
    },
    completeTodo: (id: string, userId: string) => {
        const todos = fs.existsSync(DB_PATH)
            ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
            : [];
        const todo = todos.find(
            (todo: Todo) => todo.id === id && todo.userId === userId
        );
        if (todo) {
            todo.completed = true;
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
    },
};
