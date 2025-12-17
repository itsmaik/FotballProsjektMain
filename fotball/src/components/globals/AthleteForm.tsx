import Feedback from "./Feedback";
import { useEffect, useState, type FormEvent } from "react";

export type AthleteFormValues = {
  name: string;
  gender: string;
  price: number;
};

type AthleteFormProps = {
  title?: string;
  initialValues?: AthleteFormValues;
  submitLabel?: string;
  onSubmit: (values: AthleteFormValues) => Promise<void> | void;
  onCancel?: () => void;
  statusMessage?: string | null;
  isSubmitting?: boolean;
  feedbackVariant?: "success" | "error";
};

const defaultValues: AthleteFormValues = {
  name: "",
  gender: "",
  price: 0,
};

export default function AthleteForm({
  title,
  initialValues = defaultValues,
  submitLabel = "Save",
  onSubmit,
  onCancel,
  statusMessage,
  isSubmitting = false,
  feedbackVariant = "success",
}: AthleteFormProps) {
  const [values, setValues] = useState<AthleteFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4 text-center">
      {title && <h3 className="font-bold mb-3">{title}</h3>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Navn
            </label>
            <input
              type="text"
              className="input"
              value={values.name}
              onChange={(e) =>
                setValues((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="F.eks. Erling Haaland"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              type="number"
              className="input"
              value={values.price}
              onChange={(e) =>
                setValues((p) => ({ ...p, price: Number(e.target.value) }))
              }
              min={0}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Gender
            </label>
            <select
              className="input"
              value={values.gender}
              onChange={(e) =>
                setValues((p) => ({ ...p, gender: e.target.value }))
              }
              required
            >
              <option value="" disabled>
                Choose Gender
              </option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm
              hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Lagrer..." : submitLabel}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-900"
            >
              Cancel
            </button>
          )}

          <Feedback message={statusMessage ?? null} variant={feedbackVariant} />
        </div>
      </form>
    </div>
  );
}
