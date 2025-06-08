import { z } from "zod";

import { TodoRepository } from "@/backend/todo/todo.db";

import { createMcpHandler } from "@vercel/mcp-adapter";
import { revalidatePath } from "next/cache";

const handler = createMcpHandler(
    async (server) => {
        server.tool(
            "add_todo",
            "Adds a todo to the list",
            {
                text: z.string().min(3),
            },
            async ({ text }) => {
                TodoRepository.addTodo(text);
                revalidatePath("/todo");
                return {
                    content: [{ type: "text", text: `Todo added: ${text}` }],
                };
            }
        );

        server.tool(
            "remove_todo",
            "Removes a todo from the list",
            {
                id: z.string().describe("The ID of the todo to remove"),
            },
            async ({ id }) => {
                TodoRepository.removeTodo(id);
                revalidatePath("/todo");
                return {
                    content: [{ type: "text", text: `Todo removed: ${id}` }],
                };
            }
        );

        server.tool("get_todos", "Gets the list of todos", {}, async () => {
            const todos = TodoRepository.getTodos();
            return {
                content: [{ type: "text", text: JSON.stringify(todos) }],
            };
        });
    },
    {},
    {
        basePath: "/api/llm",
    }
);

export { handler as GET, handler as POST, handler as DELETE };
