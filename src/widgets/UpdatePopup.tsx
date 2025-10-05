import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useReducer } from "react";
import { FaSave } from "react-icons/fa";
import { appReducer, appStates } from "../store/AppState";
import { updateTodo } from "../utils/TodoAction";

type UpdatePopupProps = {
  id: string;
  title: string;
  description: string;
  show: boolean;
  onClose: () => void;
};

const UpdatePopup: React.FC<UpdatePopupProps> = ({
  id,
  title,
  description,
  show,
  onClose,
}) => {
  const [state, dispatch] = useReducer(appReducer, appStates);

  useEffect(() => {
    if (show) {
      dispatch({ type: "updatedTitleInput", payload: title });
      dispatch({ type: "updatedTaskInput", payload: description });
    }
  }, [show, title, description]);

  const updateTodoForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo(dispatch, id, state.updatedTitleInput, state.updatedTaskInput);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{ zIndex: 999999 }}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <form
            onSubmit={(e) => updateTodoForm(e)}
            className="flex flex-col w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-lg  shadow-lg rounded-lg gap-3 px-5 py-6 md:py-10 mt-5 z-50 bg-white animate__animated animate__flipInX animate__faster"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              placeholder="Title"
              value={state.updatedTitleInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "updatedTitleInput", payload: e.target.value })
              }
              className="border-2 border-gray-300  rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            />
            <textarea
              placeholder="Task"
              rows={2}
              value={state.updatedTaskInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                dispatch({ type: "updatedTaskInput", payload: e.target.value })
              }
              className="border-2 border-gray-300  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-purple-500 flex justify-center items-center gap-2 cursor-pointer text-white rounded-lg px-6 py-3 hover:bg-purple-600 duration-200 w-full transition active:scale-95"
            >
              UPDATE
              <FaSave />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { UpdatePopup };
