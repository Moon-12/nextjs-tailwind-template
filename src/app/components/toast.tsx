import { useEffect } from "react";

// Define the props interface
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  // Auto-close the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Tailwind CSS classes based on toast type
  const typeStyles: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-xs w-full p-4 rounded-lg shadow-lg text-white ${typeStyles[type]} animate-slide-in`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
