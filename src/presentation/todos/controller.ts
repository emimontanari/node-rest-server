import { Request, Response } from 'express';

interface Todo {
    id: number
    text: string
    completedAt: Date | null
}
const todos: Todo[] = [
    { id: 1, text: "Comprar Leche", completedAt: new Date() },
    { id: 2, text: "Comprar Coca Cola", completedAt: new Date() },
    { id: 3, text: "Comprar Cafe", completedAt: new Date() },
]


export class TodosController {
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }
    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: "ID argument is not a number" })
        const todo = todos.find(todo => todo.id == id)

        if (!todo) return res.status(404).json({ error: "Todo no encontrado" })

        res.json(todos)

    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body
        if (!text) return res.status(400).json({ error: "TEXT property is required" })

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: new Date()
        }
        todos.push(newTodo)
        res.json(todos)
    }
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const { text, completedAt } = req.body;

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);
        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);

    }
}