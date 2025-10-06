import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, type Dispatch } from "react";
import { FaSave } from "react-icons/fa";
import { type AppAction, type AppState } from "../store/AppState";
import { updateTodo } from "../utils/TodoAction";

type UpdatePopupProps = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  id: string;
  title: string;
  description: string;
  btnText: string;
  show: boolean;
  onClose: () => void;
};

const UpdatePopup: React.FC<UpdatePopupProps> = ({
  state,
  dispatch,
  id,
  title,
  description,
  btnText,
  show,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      dispatch({ type: "updatedTitleInput", payload: title });
      dispatch({ type: "updatedTaskInput", payload: description });
    }
  }, [show, title, description]);

  const updateTodoForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      state.updatedTitleInput.trim() === "" ||
      state.updatedTaskInput.trim() === ""
    ) {
      // errorToast("Title and task cannot be empty");
      dispatch({
        type: "showUpdatePopupError",
        payload: "Validation failed: title && task must not be empty;",
      });
      return;
    }
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
          onClick={() => {
            onClose();
            dispatch({ type: "showUpdatePopupError", payload: "" });
          }}
        >
          <form
            onSubmit={(e) => updateTodoForm(e)}
            className="flex flex-col w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-lg  shadow-lg rounded-lg gap-3 px-5 py-6 md:py-10 mt-5 z-50 bg-white animate__animated animate__jackInTheBox animate__faster"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              placeholder="Title"
              value={state.updatedTitleInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: "updatedTitleInput",
                  payload: e.target.value,
                })
              }
              className="border-2 border-gray-300  rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            />
            <textarea
              placeholder="Task"
              rows={2}
              value={state.updatedTaskInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                dispatch({
                  type: "updatedTaskInput",
                  payload: e.target.value,
                })
              }
              className="border-2 border-gray-300  rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            />

            {state.showUpdatePopupError.trim() && (
              <h1 className="my-2 text-red-600 bg-red-50 border border-red-300 rounded-md px-3 py-2 text-sm sm:text-base font-medium flex items-center gap-2">
                <span>{state.showUpdatePopupError}</span>
              </h1>
            )}

            <button
              type="submit"
              className="bg-purple-500 flex justify-center items-center gap-2 cursor-pointer text-white rounded-lg px-6 py-3 hover:bg-purple-600 duration-200 w-full transition active:scale-95"
            >
              {btnText}
              <FaSave />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { UpdatePopup };
