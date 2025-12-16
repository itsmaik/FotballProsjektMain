type FeedbackVariant = "success" | "error";

type FeedbackProps = {
  message: string | null;
  variant?: FeedbackVariant;
  title?: string;
  onClose?: () => void;
  className?: string;
};

export default function Feedback({
  message,
  variant = "error",
  title,
  onClose,
  className,
}: FeedbackProps) {
  if (!message) return null;

  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";

  const closeStyles =
    variant === "success" ? "text-emerald-800" : "text-red-800";

  return (
    <div
      className={`w-full rounded-lg border px-4 py-3 flex items-start justify-between gap-4 ${styles} ${
        className ?? ""
      }`}
      role="alert"
      aria-live="polite"
    >
      <div>
        {title ? <p className="font-semibold">{title}</p> : null}
        <p className="text-sm">{message}</p>
      </div>

      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className={`text-sm font-semibold hover:opacity-80 ${closeStyles}`}
          aria-label="Close message"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
