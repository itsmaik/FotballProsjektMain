import { useState, type ChangeEvent } from "react";
import { useAthletes } from "../context/AthletesContext";
import ImageService from "../services/ImageService";
import type { IAthlete } from "../interfaces/IAthlete";
import Feedback from "./globals/Feedback";
import { useFeedback } from "./hooks/useFeedback";

export default function AddNewAthlete() {
  const { addAthlete } = useAthletes();

  const { msg, clear, success, error } = useFeedback(4000);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);

  const imgChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setImage(files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !gender.trim() ||
      price === "" ||
      price <= 0 ||
      !image
    ) {
      error("All form inputs must be filled out + choose image!");
      return;
    }

    try {
      await ImageService.postNewImage(image);

      const newAthlete: IAthlete = {
        name: name.trim(),
        gender: gender.trim(),
        price: Number(price),
        image: image.name,
        purchaseStatus: false,
      };

      const ok = await addAthlete(newAthlete);

      if (ok) {
        success(`${newAthlete.name} er lagret! ✅`);
        setName("");
        setGender("");
        setPrice("");
        setImage(null);
      } else {
        error("Could not add new player");
      }
    } catch (err) {
      console.error(err);
      error("Could not add new player");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 max-w-3xl mx-auto">
      <h3 className="font-bold text-center mb-4">Add new player</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              className="input"
              placeholder="Ex. Erling Haaland"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Ex. 2000"
              value={price}
              min={0}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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

          {/* Image */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Bilde
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 hover:bg-slate-100">
              <span>{image ? image.name : "Velg fil…"}</span>
              <span className="rounded-lg bg-white px-2 py-1 text-xs text-slate-500 shadow-sm">
                PNG/JPG
              </span>

              <input
                onChange={imgChangeHandler}
                type="file"
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Save
        </button>

        <Feedback
          message={msg?.text ?? null}
          variant={msg?.variant}
          onClose={clear}
        />
      </form>
    </div>
  );
}
