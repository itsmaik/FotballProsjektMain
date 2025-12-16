import { useState, type ChangeEvent } from "react";
import { useAthletes } from "../context/AthletesContext";
import ImageService from "../services/ImageService";
import type { IAthlete } from "../interfaces/IAthlete";

export default function AddNewAthlete() {
  const { addAthlete } = useAthletes();

  const [statusMessage, setStatusMessage] = useState<string | null>(
    "Legg til spillere!"
  );

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const imgChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setImage(files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !gender.trim() || price <= 0 || !image) {
      setStatusMessage("Du må fylle ut alle felter + velge bilde!");
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

      await addAthlete(newAthlete);

      setStatusMessage(`${newAthlete.name} er lagret!`);
      setName("");
      setGender("");
      setPrice(0);
      setImage(null);
    } catch (err) {
      console.error(err);
      setStatusMessage("Kunne ikke lagre spilleren.");
    } finally {
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 max-w-3xl mx-auto">
      <h3 className="font-bold text-center mb-4">Legg til ny spiller!</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Navn
            </label>
            <input
              className="input"
              placeholder="F.eks. Erling Haaland"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Kjøpspris
            </label>
            <input
              type="number"
              className="input"
              value={price}
              min={0}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Kjønn
            </label>
            <input
              className="input"
              placeholder="M / K"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
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
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Lagre
        </button>

        {statusMessage ? (
          <p className="text-center text-sm text-slate-600">{statusMessage}</p>
        ) : null}
      </form>
    </div>
  );
}
