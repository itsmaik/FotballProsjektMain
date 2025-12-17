import { useRef, useState } from "react";

export type FeedbackMsg = { text: string; variant: "success" | "error" };

export function useFeedback(timeoutMs = 2500) {
  const [msg, setMsg] = useState<FeedbackMsg | null>(null);
  const timerRef = useRef<number | null>(null);

  const clear = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setMsg(null);
  };

  const show = (text: string, variant: FeedbackMsg["variant"]) => {
    clear();
    setMsg({ text, variant });
    timerRef.current = window.setTimeout(() => setMsg(null), timeoutMs);
  };

  const success = (text: string) => show(text, "success");
  const error = (text: string) => show(text, "error");

  return { msg, setMsg, clear, show, success, error };
}
