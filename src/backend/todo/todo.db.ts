import { Todo } from "@/backend/todo/todo.type";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "todos.json");

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

export const TodoRepository = {
    getTodos: () => {
        const todos = fs.existsSync(DB_PATH)
            ? JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
            : [];
        return todos as Todo[];
    },
    addTodo: (text: string) => {
        const todos = TodoRepository.getTodos();
        todos.push({
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date(),
        });
        fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
    },
    removeTodo: (id: string) => {
        const todos = TodoRepository.getTodos();
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
    },
    completeTodo: (id: string) => {
        const todos = TodoRepository.getTodos();
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = true;
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
    },
};
