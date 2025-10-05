import type { Dispatch } from "react";
import type { Todo } from "../model/Todo";
import { errorToast, successToast } from "./Toast";
import type { AppAction, AppState } from "../store/AppState";
import { v4 as uuidv4 } from "uuid";

const addTodo = (
  e: React.FormEvent<HTMLFormElement>,
  state: AppState,
  dispatch: Dispatch<AppAction>,
  inputRef?: React.RefObject<HTMLInputElement | null>,
  taskRef?: React.RefObject<HTMLTextAreaElement | null>
) => {
  e.preventDefault();

  if (state.titleInput.trim() === "") {
    errorToast("Title is required!");
    inputRef?.current?.focus();
    return;
  }

  if (state.taskInput.trim() === "") {
    errorToast("Task is required!");
    taskRef?.current?.focus();
    return;

  }

  dispatch({
    type: "todos",
    payload: {
      id: uuidv4(),
      text: state.titleInput,
      task: state.taskInput,
      completed: false,
      date: new Date(),
    },
  });

  successToast("Task created successfully");

  dispatch({ type: "titleInput", payload: "" });
  dispatch({ type: "taskInput", payload: "" });
};

const markTodo = (dispatch: Dispatch<AppAction>, todo: Todo) => {
  dispatch({
    type: "markTodo",
    payload: { id: todo.id, newCompleted: true },
  });
  successToast("Task completed successfully");
};

const removeTodo = (dispatch: Dispatch<AppAction>, id: string) => {
  dispatch({ type: "removeTodos", payload: id });
  successToast("Task removed successfully");
};

const viewTodo = (dispatch: Dispatch<AppAction>, id: string) => {
  dispatch({ type: "selectedTodo", payload: id });
  dispatch({ type: "updatePopupOpen", payload: true });
};

const updateTodo = (dispatch: Dispatch<AppAction>, id: string, newText: string, newTask: string) => {
  dispatch({ type: "updateTodo", payload: { id: id, newText: newText, newTask: newTask } })
  dispatch({ type: "updatePopupOpen", payload: false });
  successToast("Task updated successfully");
}

export { addTodo, markTodo, removeTodo, viewTodo, updateTodo }