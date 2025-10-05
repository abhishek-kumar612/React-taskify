import type { Todo } from "../model/Todo";

export interface AppState {
  titleInput: string;
  taskInput: string;
  updatedTitleInput: string;
  updatedTaskInput: string;
  todos: Todo[];
  selectedTodo: Todo | null;
  selectedTab: number[];
  updatePopupOpen: boolean;
}

const appStates: AppState = {
  titleInput: "",
  taskInput: "",
  updatedTitleInput: "",
  updatedTaskInput: "",
  todos: [],
  selectedTodo: null,
  selectedTab: [0],
  updatePopupOpen: false,
};

export type AppAction =
  | { type: "titleInput"; payload: string }
  | { type: "taskInput"; payload: string }
  | { type: "updatedTitleInput"; payload: string }
  | { type: "updatedTaskInput"; payload: string }
  | { type: "todos"; payload: Todo }
  | { type: "removeTodos"; payload: string }
  | { type: "selectedTodo"; payload: string }
  | {
      type: "updateTodo";
      payload: { id: string; newText: string; newTask: string };
    }
  | { type: "markTodo"; payload: { id: string; newCompleted: boolean } }
  | { type: "todosClear" }
  | { type: "selectedTab"; payload: number }
  | { type: "updatePopupOpen"; payload: boolean }
  | { type: "setTodos"; payload: Todo[] };

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "titleInput":
      return { ...state, titleInput: action.payload };
    case "taskInput":
      return { ...state, taskInput: action.payload };
    case "updatedTitleInput":
      return { ...state, updatedTitleInput: action.payload };
    case "updatedTaskInput":
      return { ...state, updatedTaskInput: action.payload };
    case "setTodos":
      return { ...state, todos: action.payload };
    case "todos":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "removeTodos":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "selectedTodo":
      return {
        ...state,
        selectedTodo:
          state.todos.find((todo) => todo.id === action.payload) || null,
      };
    case "updateTodo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.newText,
                task: action.payload.newTask,
              }
            : todo
        ),
      };
    case "markTodo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.newCompleted }
            : todo
        ),
      };
    case "selectedTab":
      return { ...state, selectedTab: [action.payload] };
    case "updatePopupOpen":
      return { ...state, updatePopupOpen: action.payload };
    case "todosClear":
      return { ...state, todos: [] };
    default:
      return state;
  }
};

export { appStates, appReducer };
