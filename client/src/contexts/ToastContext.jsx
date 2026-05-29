import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => remove(id), 3500);
  }, [remove]);

  const icons = { success: CheckCircle, error: XCircle, info: Info };
  const colors = {
    success: "bg-wine text-cream",
    error: "bg-brown text-cream",
    info: "bg-beige text-brown dark:text-cream",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map(({ id, message, type }) => {
          const Icon = icons[type] || Info;
          return (
            <div
              key={id}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl animate-fade-in min-w-[280px] ${colors[type]}`}
            >
              <Icon size={20} />
              <span className="flex-1 text-sm font-medium">{message}</span>
              <button onClick={() => remove(id)} className="opacity-70 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
