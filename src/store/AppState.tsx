import type { Todo } from "../model/Todo";
import {
  loadTodos,
  saveTodos,
  clearTodos,
  saveSelectedTab,
  loadSelectedTab,
} from "../utils/TodoStorage";

export interface AppState {
  titleInput: string;
  taskInput: string;
  updatedTitleInput: string;
  updatedTaskInput: string;
  todos: Todo[];
  selectedTodo: Todo | null;
  selectedTab: number[];
  updatePopupOpen: boolean;
  showUpdatePopupError: string;
}

const appStates: AppState = {
  titleInput: "",
  taskInput: "",
  updatedTitleInput: "",
  updatedTaskInput: "",
  todos: loadTodos(),
  selectedTodo: null,
  selectedTab: loadSelectedTab(),
  updatePopupOpen: false,
  showUpdatePopupError: "",
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
  | { type: "todosClear"; payload: boolean }
  | { type: "selectedTab"; payload: number }
  | { type: "updatePopupOpen"; payload: boolean }
  | { type: "showUpdatePopupError"; payload: string }
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
      const addTodos = [action.payload, ...state.todos];
      saveTodos(addTodos);
      return { ...state, todos: addTodos };
    case "removeTodos": {
      const removeTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      saveTodos(removeTodos);
      return { ...state, todos: removeTodos };
    }
    case "selectedTodo":
      return {
        ...state,
        selectedTodo:
          state.todos.find((todo) => todo.id === action.payload) || null,
      };
    case "updateTodo": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.newText,
              task: action.payload.newTask,
            }
          : todo
      );
      saveTodos(updatedTodos);
      return { ...state, todos: updatedTodos };
    }
    case "markTodo": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.newCompleted }
          : todo
      );
      saveTodos(updatedTodos);
      return { ...state, todos: updatedTodos };
    }
    case "selectedTab":
      const updatedTab = [action.payload];
      saveSelectedTab(updatedTab);
      return { ...state, selectedTab: updatedTab };
    case "updatePopupOpen":
      return { ...state, updatePopupOpen: action.payload };
    case "showUpdatePopupError":
      return { ...state, showUpdatePopupError: action.payload };
    case "todosClear": {
      const updatedTodos = clearTodos(action.payload, state.todos);
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    default:
      return state;
  }
};

export { appStates, appReducer };
