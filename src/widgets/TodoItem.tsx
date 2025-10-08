import { motion } from "framer-motion";
import type { Todo } from "../model/Todo";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import type { Dispatch } from "react";
import type { AppAction } from "../store/AppState";
import { markTodo, viewTodo } from "../utils/TodoAction";
import { confirmPopup } from "./ConfirmPopup";

type TodoItemProps = {
  theme: string;
  todo: Todo;
  dispatch: Dispatch<AppAction>;
};

const TodoItem = ({ theme, todo, dispatch }: TodoItemProps) => {
  const removeTodoFun = (dispatch: Dispatch<AppAction>, id: string) => {
    confirmPopup(theme, dispatch, id);
  };

  return (
    <motion.div
      className={`flex justify-between items-start cursor-default bg-white rounded-lg shadow-lg px-4 py-4 mb-4 ${
        todo.completed ? "" : "hover:shadow-xl"
      } transition-shadow duration-200 dark:bg-gray-800 dark:shadow-gray-900`}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{
        duration: 0.3,
      }}
    >
      <div className="flex flex-col gap-1 flex-wrap w-9/12">
        <h2
          className={`text-base sm:text-lg md:text-xl font-semibold break-words ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-black dark:text-gray-200"
          }`}
        >
          {todo.text}
        </h2>
        <p
          className={`text-sm sm:text-base ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-black dark:text-gray-200"
          }`}
        >
          {todo.task}{" "}
        </p>
        <p
          className={`font-mono font-bold text-xs sm:text-base ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-black dark:text-gray-200"
          }`}
        >
          {`${dayjs(todo.date).format("hh:mm A, D MMM YYYY")}`}
        </p>

        <div className="flex justify-start items-center gap-3 mt-3">
          <button
            disabled={todo.completed}
            className={`w-3/12 relative py-4 flex justify-center items-center bg-blue-500 text-white rounded transition-colors duration-200 ${
              todo.completed
                ? "cursor-default opacity-50"
                : "cursor-pointer group hover:bg-blue-600 active:scale-95 dark:hover:bg-blue-700"
            }`}
            onClick={() => viewTodo(dispatch, todo.id)}
          >
            <FaPen />
            <span className="absolute bottom-full mb-2 px-4 py-2 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 pointer-events-none whitespace-nowrap">
              Update task
            </span>
          </button>
          <button
            className="w-3/12 relative group py-4 flex justify-center items-center bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 cursor-pointer active:scale-95"
            onClick={() => removeTodoFun(dispatch, todo.id)}
          >
            <FaTrash />
            <span className="absolute bottom-full mb-2 px-4 py-2 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 pointer-events-none whitespace-nowrap">
              Delete task
            </span>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <button
          disabled={todo.completed}
          className={`w-8 h-8 relative flex justify-center items-center bg-green-500 text-white rounded transition-colors duration-200 ${
            todo.completed
              ? "cursor-default opacity-50"
              : "cursor-pointer group hover:bg-green-600 active:scale-95 dark:hover:bg-green-700"
          }`}
          onClick={() => markTodo(dispatch, todo)}
        >
          <FaCheck />
          <span className="absolute bottom-full mb-2 px-4 py-2 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 pointer-events-none whitespace-nowrap">
            Mark as completed
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
