import { useAthletes } from "../context/AthletesContext";
import ImageService from "../services/ImageService";
import { useRef, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../interfaces/IAthlete";

const AddNewAthlete = () => {
  const { addAthlete, isLoading } = useAthletes();

  const [statusMessage, setStatusMessage] =
    useState<string>("Legg til spillere!");
  const [image, setImage] = useState<File | null>(null);

  const nameInput = useRef<HTMLInputElement | null>(null);
  const priceInput = useRef<HTMLInputElement | null>(null);
  const genderInput = useRef<HTMLInputElement | null>(null);

  const imgChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null) {
      setImage(files[0]);
      console.log(files[0]);
    }
  };

  const postNewAthlete = async () => {
    if (
      priceInput.current &&
      priceInput.current?.value != "" &&
      nameInput.current &&
      nameInput.current.value.trim() != "" &&
      genderInput.current &&
      genderInput.current.value.trim() != "" &&
      image
    ) {
      const newAthlete: IAthlete = {
        name: nameInput.current.value,
        image: image.name,
        gender: genderInput.current.value,
        price: Number(priceInput.current.value),
        purchaseStatus: false,
      };
      const imgresponse = await ImageService.postNewImage(image);
      const AthleteResponse = await addAthlete(newAthlete);

      if (!isLoading) {
        setStatusMessage(newAthlete.name + " er lagret! ");

        nameInput.current.value = "";
        priceInput.current.value = "";
        genderInput.current.value = "";
      } else {
        setStatusMessage(newAthlete.name + " - er ikke lagret!");

        nameInput.current.value = "";
        priceInput.current.value = "";
        genderInput.current.value = "";
      }
    } else {
      setStatusMessage("Du må fylle ut alle felter!");
    }
    setTimeout(() => {
      setStatusMessage("");
    }, 5000);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Legg til ny spiller
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Fyll inn info og last opp et bilde.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Navn
            </label>
            <input
              ref={nameInput}
              type="text"
              placeholder="F.eks. Erling Haaland"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition
                      placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Kjøpspris
            </label>
            <input
              ref={priceInput}
              type="number"
              placeholder="F.eks. 2500000"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition
                      placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Kjønn
            </label>
            <input
              ref={genderInput}
              type="text"
              placeholder="M / K"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition
                      placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          {/* Image */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Bilde
            </label>

            <label
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600
                            hover:bg-slate-100"
            >
              <span>Velg fil…</span>
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
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={postNewAthlete}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm
                    hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 active:scale-[0.99]"
          >
            Lagre
          </button>

          {statusMessage ? (
            <p className="text-center text-sm text-slate-600">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default AddNewAthlete;
