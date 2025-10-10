import type React from "react";
import { addTodo } from "../utils/TodoAction";
import type { AppAction, AppState } from "../store/AppState";
import type { Dispatch } from "react";
import { motion } from "framer-motion";
import { FaPlusSquare } from "react-icons/fa";

type TodoAddFormProps = {
  e: React.FormEvent<HTMLFormElement>;
  state: AppState;
  dispatch: Dispatch<AppAction>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  taskRef?: React.RefObject<HTMLTextAreaElement | null>;
};

const TodoAddForm = ({
  e,
  state,
  dispatch,
  inputRef,
  taskRef,
}: TodoAddFormProps) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onSubmit={() => addTodo(e, state, dispatch, inputRef, taskRef)}
      className="flex flex-col shadow-xl rounded-lg gap-3 w-full px-5 py-6 md:py-10 z-10 dark:bg-gray-900"
    >
      <input
        placeholder="Title"
        value={state.titleInput}
        ref={inputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "titleInput", payload: e.target.value })
        }
        className="border-2 border-gray-300 rounded-lg p-3 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-500 dark:bg-black dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
      />
      <textarea
        ref={taskRef}
        placeholder="Task"
        rows={2}
        value={state.taskInput}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          dispatch({ type: "taskInput", payload: e.target.value })
        }
        className="border-2 border-gray-300 rounded-lg p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-black dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-purple-500 mt-2 flex justify-center items-center gap-2 cursor-pointer shadow-lg text-white rounded-lg px-6 py-3 hover:bg-purple-600 w-full active:scale-95 dark:bg-purple-600 dark:hover:bg-purple-700"
      >
        ADD TASK
        <FaPlusSquare />
      </button>
    </motion.form>
  );
};

export { TodoAddForm };
