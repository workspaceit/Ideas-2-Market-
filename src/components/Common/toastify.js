import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = (n_type, msg) => {
  const toast_config = {
    position: "top-right",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false
  }
  switch (n_type) {
    case 'error':
      toast.error(msg, toast_config);
      break;
    case 'info':
      toast.info(msg, toast_config);
      break;
    case 'warn':
      toast.warn(msg, toast_config);
      break;  
    default:
      break;
  }
}

const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange={false}
      draggable={false}
      pauseOnHover
    />
  )
}

export { Toastify, notify }