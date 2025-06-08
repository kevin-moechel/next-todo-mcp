import { TodoList } from "@/app/todo/_components/todo-list";
import { getTodos } from "@/backend/todo/todo.dal";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
    const todos = getTodos();

    return (
        <main className="min-h-screen">
            <div className="container max-w-3xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold">MCP Todo List</h1>
                        <p className="text-muted-foreground">
                            The 2025 way to manage your tasks
                        </p>
                    </div>

                    <ThemeToggle />

                    <TodoList todosPromise={todos} />
                </div>
            </div>
        </main>
    );
}
