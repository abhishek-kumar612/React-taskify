import type { Dispatch } from "react";
import Swal from "sweetalert2";
import type { AppAction } from "../store/AppState";

const confirmAllPopup = (theme: string, dispatch: Dispatch<AppAction>) => {
  Swal.fire({
    title: "Delete All Tasks?",
    text: "This will permanently delete all tasks — no undo, no rollback. Proceed?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6ab04c",
    cancelButtonColor: "#eb4d4b",
    confirmButtonText: "Yep, delete it",
    cancelButtonText: "Nah, keep it",
    theme: theme === "dark" ? "dark" : "light",
    showClass: {
      popup: `
      animate__animated
      animate__jello
      animate__faster
    `,
    },
    hideClass: {
      popup: `
      animate__animated
      animate__hinge
      animate__fast
    `,
    },
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch({ type: "todosClear", payload: false });
    }
  });
};

export { confirmAllPopup };
