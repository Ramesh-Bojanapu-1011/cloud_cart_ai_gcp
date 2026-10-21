import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ToastContextValue = {
  showToast: (message: string, duration?: number) => void;
  dismissToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissToast = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setMessage("");
  }, []);

  const showToast = useCallback(
    (nextMessage: string, duration = 2600) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setMessage(nextMessage);
      timeoutRef.current = setTimeout(dismissToast, duration);
    },
    [dismissToast],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <Showtoast message={message} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function Showtoast({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div
      className="fixed right-5.5 bottom-5.5 z-40 flex items-center gap-2.25 rounded border border-[#dce7da] bg-white px-4 py-3 text-[11px] text-[#495c4a] shadow-lg"
      role="status"
      aria-live="polite"
    >
      <span className="grid size-4.25 place-items-center rounded-full bg-[#e9f2e8] text-[10px] text-[#4e8059]">
        ✓
      </span>
      {message}
    </div>
  );
}
