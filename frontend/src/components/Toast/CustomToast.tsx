import { CheckCircle } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { FaUndoAlt } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { IoAlertCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { ToastContext } from '../../context/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import './CustomToast.css';
import { ToastProps } from '../../interfaces/ToastContextProps.ts';

/**
 * Renders a CustomToast component showing a toast message with an optional undo action.
 *
 * @param {string} message - The message of the toast.
 * @param {string} type - The type of toast
 * @param {function} undoAction - Function to handle action when the "Undo" button is clicked.
 * @param {function} closeToast - Function for closing the toast.
 **/

const CustomToast = ({ message, type, undoAction, closeToast }: ToastProps) => {
  const [undoVisible, setUndoVisible] = useState(true);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle data-testid="CheckCircleIcon" />;
      case 'error':
        return <IoCloseCircleOutline data-testid="IoCloseCircleOutlineIcon" />;
      case 'warning':
        return <IoAlertCircleOutline data-testid="IoAlertCircleOutlineIcon" />;
      case 'info':
      default:
        return <IoIosInformationCircleOutline data-testid="IoInformationCircleIcon" />;
    }
  };

  const handleUndoClick = () => {
    setUndoVisible(false); // Trigger the height reduction
    if (undoAction) {
      undoAction();
    }
    closeToast?.();
  };

  return (
    <div className="flex items-center gap-3">
      {getIcon()} <p className="flex-1 text-white">{message}</p>
      {undoAction && (
        <button
          onClick={handleUndoClick}
          className={`undo-button  ${undoVisible ? 'visible' : 'hidden'} px-3 py-1 rounded-md bg-customRed hover:bg-transparent border-2 border-customRed hover:border-customRed hover:text-customRed transition-colors duration-100`}
          style={{ fontFamily: 'MedievalSharp, sans-serif' }}
          data-testid="undo-button"
        >
          <span className="flex items-center gap-2">
            <FaUndoAlt className="w-4 h-4" />
            Undo
          </span>
        </button>
      )}
    </div>
  );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastId = useRef<string | null>(null);

  const showToast = (props: ToastProps) => {
    if (toastId.current && toast.isActive(toastId.current)) {
      toast.dismiss(toastId.current);
    }

    toastId.current = toast(({ closeToast }) => <CustomToast {...props} closeToast={closeToast} />, {
      position: 'bottom-right',
      autoClose: props.duration,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    }) as string;
  };

  return (
    <ToastContext.Provider value={{ showToast, toastId }}>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        style={{
          width: 'auto',
          margin: '0 auto',
        }}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
