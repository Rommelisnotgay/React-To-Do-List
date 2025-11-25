import { createContext } from "react";
import { useState } from "react";
import Toast from "../components/Toast";
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [msg, setmsg] = useState("");
  const [open, setOpen] = useState(false);
  function showhidetoast(msg) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setmsg(msg);
  }
  return (
    <ToastContext.Provider value={{ showhidetoast }}>
      <Toast open={open} msg={msg} />
      {children}
    </ToastContext.Provider>
  );
};
