import { motion } from "framer-motion";
import type { Todo } from "../model/Todo";
import { FaCheck, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import type { Dispatch } from "react";
import type { AppAction } from "../store/AppState";
import { markTodo, removeTodo } from "../utils/TodoAction";

type TodoItemProps = {
  todo: Todo;
  dispatch: Dispatch<AppAction>;
};

const TodoItem = ({ todo, dispatch }: TodoItemProps) => {
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
          className={`font-sans font-bold text-sm sm:text-base ${
            todo.completed ? "line-through text-gray-400" : "text-black"
          }`}
        >
          {dayjs(todo.date).format("hh:mm A, D MMM YYYY")}
        </p>

        <div className="flex justify-start items-center gap-3 mt-3">
          {/* <button
            disabled={todo.completed}
            className={`w-3/12 py-4 flex justify-center items-center bg-blue-500 text-white rounded transition-colors duration-200 ${
              todo.completed
                ? "cursor-default opacity-50"
                : "cursor-pointer hover:bg-blue-600 active:scale-95"
            }`}
            onClick={() => viewTodo(dispatch, todo.id)}
          >
            <FaPen />
          </button> */}
          <button
            className="w-3/12 py-4 flex justify-center items-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 cursor-pointer active:scale-95"
            onClick={() => removeTodo(dispatch, todo.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <button
          disabled={todo.completed}
          className={`w-8 h-8 flex justify-center items-center bg-green-500 shadow-lg text-white rounded transition-colors duration-200 ${
            todo.completed
              ? "cursor-default opacity-50"
              : "cursor-pointer hover:bg-green-600 active:scale-95"
          }`}
          onClick={() => markTodo(dispatch, todo)}
        >
          <FaCheck />
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
