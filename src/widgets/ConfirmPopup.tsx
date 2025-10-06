import type { Dispatch } from "react";
import Swal from "sweetalert2";
import type { AppAction } from "../store/AppState";
import { removeTodo } from "../utils/TodoAction";

const confirmPopup = (dispatch: Dispatch<AppAction>, id: string) => {
  Swal.fire({
    title: "Delete Task?",
    text: "Once deleted, there's no Ctrl+Z! Are you sure you want to nuke this task?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6ab04c",
    cancelButtonColor: "#eb4d4b",
    confirmButtonText: "Yep, delete it",
    cancelButtonText: "Nah, keep it",
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
      animate__faster
    `,
    },
  }).then((result) => {
    if (result.isConfirmed) {
      removeTodo(dispatch, id);
    }
  });
};

export { confirmPopup };
