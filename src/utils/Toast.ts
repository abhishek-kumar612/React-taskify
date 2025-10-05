import toast from "react-hot-toast";

const successToast = (message: string) => {
  toast.success(message);
};

const errorToast = (message: string) => {
  toast.error(message);
};

export { successToast, errorToast };
