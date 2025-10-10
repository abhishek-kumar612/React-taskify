import { type Todo } from "../model/Todo";

const STORAGE_KEY = "todos";

const saveTodos = (todos: Todo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const loadTodos = (): Todo[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

const clearTodos = (completed: boolean, todos: Todo[]): Todo[] => {
    const filtered = todos.filter(todo => todo.completed == completed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
};

const saveSelectedTab = (selectedTab: number[]) => {
    localStorage.setItem("selectedTab", JSON.stringify(selectedTab));
}

const loadSelectedTab = (): number[] => {
    const saved = localStorage.getItem("selectedTab");
    return saved ? JSON.parse(saved) : [];
}

export { saveTodos, loadTodos, clearTodos, saveSelectedTab, loadSelectedTab };