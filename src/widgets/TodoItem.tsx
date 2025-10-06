import { motion } from "framer-motion";
import type { Todo } from "../model/Todo";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import type { Dispatch } from "react";
import type { AppAction } from "../store/AppState";
import { markTodo, viewTodo } from "../utils/TodoAction";
import { confirmPopup } from "./ConfirmPopup";

type TodoItemProps = {
  todo: Todo;
  dispatch: Dispatch<AppAction>;
};

const TodoItem = ({ todo, dispatch }: TodoItemProps) => {
  const removeTodoFun = (dispatch: Dispatch<AppAction>, id: string) => {
    confirmPopup(dispatch, id);
  };

  return (
    <motion.div
      style={{ background: "#f5f6fa" }}
      className={`flex justify-between items-start cursor-default rounded-lg shadow-md px-4 py-4 mb-4 ${
        todo.completed ? "" : "hover:shadow-xl"
      } transition-shadow duration-200`}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{
        // type: "spring",
        // stiffness: 500,
        // damping: 20,
        // mass: 0.5,
        duration: 0.3,
      }}
    >
      <div className="flex flex-col gap-1 flex-wrap w-9/12">
        <h2
          className={`text-base sm:text-lg md:text-xl font-semibold break-words ${
            todo.completed ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {todo.text}
        </h2>
        <p
          className={`text-sm sm:text-base ${
            todo.completed ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {todo.task}{" "}
        </p>
        <p
          className={`font-mono font-bold text-sm sm:text-base ${
            todo.completed ? "line-through text-gray-400" : "text-black"
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
                : "cursor-pointer group hover:bg-blue-600 active:scale-95"
            }`}
            onClick={() => viewTodo(dispatch, todo.id)}
          >
            <FaPen />
            <span className="absolute bottom-full mb-2 px-4 py-2 text-sm text-white bg-gray-800 rounded scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 pointer-events-none whitespace-nowrap">
              Update task
            </span>
          </button>
          <button
            className="w-3/12 relative group py-4 flex justify-center items-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 cursor-pointer active:scale-95"
            onClick={() => removeTodoFun(dispatch, todo.id)}
          >
            <FaTrash />
            <span className="absolute bottom-full mb-2 px-4 py-2 text-sm text-white bg-gray-800 rounded scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 pointer-events-none whitespace-nowrap">
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
              : "cursor-pointer group hover:bg-green-600 active:scale-95"
          }`}
          onClick={() => markTodo(dispatch, todo)}
        >
          <FaCheck />
          <span className="absolute bottom-full mb-2 px-4 py-2 text-sm text-white bg-gray-800 rounded scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 pointer-events-none whitespace-nowrap">
            Mark as completed
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
