import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toast_config = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "dark",
  pauseOnFocusLoss: false,
};

export function dismissToast() {
  toast.dismiss();
  return true;
}

export function notifyError(message) {
  dismissToast() && toast.error(message, { t });
}
export function notifySuccess(message) {
  dismissToast() && toast.success(message, toast_config);
}
export function notifyWarn(message) {
  dismissToast() && toast.warn(message, toast_config);
}

function Toast({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}

export default Toast;
