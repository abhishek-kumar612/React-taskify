import React, { useReducer, useRef } from "react";
import { appReducer, appStates } from "../store/AppState";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { FaMoon, FaPlus, FaPlusSquare, FaSun } from "react-icons/fa";
import { TabsData } from "../data/TabsData";
import { UpdatePopup } from "../widgets/UpdatePopup";
import { addTodo } from "../utils/TodoAction";
import TodoItem from "../widgets/TodoItem";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [state, dispatch] = useReducer(appReducer, appStates);
  const inputRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      {/* Toaster */}
      <div style={{ zIndex: 99999999999 }}>
        <Toaster
          toastOptions={{
            style: {
              color: theme === "dark" ? "#fff" : "#2c3e50",
              background: theme === "dark" ? "#2c3e50" : "#fff",
            },
          }}
          position="top-center"
          reverseOrder={false}
        />
      </div>

      {/* Update Popup */}
      <UpdatePopup
        state={state}
        dispatch={dispatch}
        id={state.selectedTodo?.id ?? ""}
        title={state.selectedTodo?.text ?? ""}
        description={state.selectedTodo?.task ?? ""}
        btnText="UPDATE TASK"
        show={state.updatePopupOpen}
        onClose={() => dispatch({ type: "updatePopupOpen", payload: false })}
      />

      {/* Theme toggle */}
      <div
        onClick={toggleTheme}
        className="fixed dark:bg-white dark:text-purple-500 top-3 right-5 flex justify-center items-center text-white w-12 h-12 rounded-lg shadow-lg cursor-pointer bg-purple-500 active:scale-90 transition duration-100"
      >
        {state.themeToggle ? <FaSun size={20} /> : <FaMoon size={20} />}
      </div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0, rotate: 30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-2xl md:text-4xl mt-5 pointer-events-none font-extrabold font-mono text-center leading-none -tracking-tighter text-gray-900 dark:text-white">
          TASKIFY
        </h1>
      </motion.div>

      <main className="relative px-5 flex justify-evenly items-start flex-wrap mt-10">
        <div className="w-full md:w-4/12 sticky top-0">
          {/* Todo Add Form */}
          <motion.form
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onSubmit={(e) => addTodo(e, state, dispatch, inputRef, taskRef)}
            className="flex flex-col shadow-xl rounded-lg gap-3 w-full px-5 py-6 md:py-10 mt-5 z-10 dark:bg-gray-800 dark:shadow-gray-900"
          >
            <input
              placeholder="Title"
              value={state.titleInput}
              ref={inputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "titleInput", payload: e.target.value })
              }
              className="border-2 border-gray-300 rounded-lg p-3 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <textarea
              ref={taskRef}
              placeholder="Task"
              rows={2}
              value={state.taskInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                dispatch({ type: "taskInput", payload: e.target.value })
              }
              className="border-2 border-gray-300 rounded-lg p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-purple-500 mt-2 flex justify-center items-center gap-2 cursor-pointer shadow-lg text-white rounded-lg px-6 py-3 hover:bg-purple-600 duration-200 w-full transition active:scale-95 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              ADD TASK
              <FaPlusSquare />
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-7/12 z-20"
        >
          {/* {state.todos.length > 0 ? (
          <div className="flex justify-end items-cente  my-5">
            <button
              type="button"
              className="bg-red-500 cursor-pointer text-white rounded-lg px-6 py-3 hover:bg-red-600 transition-colors duration-200 w-full sm:w-auto"
              onClick={() => dispatch({ type: "todosClear" })}
            >
              CLEAR ALL
            </button>
          </div>
        ) : null} */}

          {/* Tabs */}
          <div className="border-b border-gray-400 mt-5 flex justify-center items-center sticky top-0 z-50 dark:border-gray-700 dark:bg-gray-900">
            <ul className="relative w-full flex justify-center items-center flex-wrap text-center">
              <motion.span
                className="absolute bottom-0 left-0 w-6/12 h-1 rounded-tl-lg rounded-tr-lg bg-purple-600 dark:bg-purple-500"
                animate={{
                  x: state.selectedTab.includes(0) ? 0 : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ></motion.span>
              {TabsData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    dispatch({ type: "selectedTab", payload: index });
                  }}
                  className={`relative w-6/12 flex items-center justify-center gap-3 font-mono cursor-pointer text-sm md:text-lg p-4 rounded-t-lg ${
                    state.selectedTab.includes(index)
                      ? "text-purple-600 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                      : "text-black border-transparent dark:text-gray-300 dark:hover:text-purple-400"
                  } hover:border-purple-600 hover:text-purple-600 transition duration-200 active:scale-110 group`}
                >
                  {item.icon}
                  {item.text}

                  <motion.span
                    key={
                      state.todos.filter((t) => t.completed === item.status)
                        .length
                    }
                    className="text-xs flex justify-center items-center top-1 -right-2 leading-none bg-purple-600 text-white rounded-full w-5 h-5 pointer-events-none dark:bg-purple-500"
                    initial={{ scale: 1 }}
                    animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {
                      state.todos.filter((t) => t.completed === item.status)
                        .length
                    }
                  </motion.span>
                </button>
              ))}
            </ul>
          </div>

          <div className="flex justify-center items-center mt-10 dark:text-gray-200">
            <h1 className="text-xl md:text-2xl font-mono text-center">
              {state.selectedTab.includes(0) ? (
                state.todos.filter((todo) => !todo.completed).length === 0 ? (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <span>Add your first task</span>
                    <button
                      onClick={() => inputRef.current?.focus()}
                      className="w-10 h-10 flex justify-center items-center bg-purple-500 text-white rounded-full shadow-lg cursor-pointer active:scale-90 dark:bg-purple-600 dark:hover:bg-purple-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  ""
                )
              ) : state.todos.filter((todo) => todo.completed).length === 0 ? (
                <span>No completed tasks yet</span>
              ) : (
                ""
              )}
            </h1>
          </div>

          <div className="z-20">
            <AnimatePresence>
              {state.todos
                .filter(
                  (todo) => todo.completed === state.selectedTab.includes(1)
                )
                .map((data) => (
                  <TodoItem
                    key={data.id}
                    theme={theme}
                    todo={data}
                    dispatch={dispatch}
                  />
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default Home;
