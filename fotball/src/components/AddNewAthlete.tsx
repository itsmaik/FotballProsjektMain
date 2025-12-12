import AthleteService from "../services/AthleteService";
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
    // We need to create a form component to reuse on EDIT
    <>
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4 space-y-2 grid justify-center px-4 py-2 text-center">
        <h3>Legg til ny spiller!</h3>
        <div>
          <input
            ref={nameInput}
            className="input shadow-md border border-slate-300 text-center"
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            ref={priceInput}
            className="input shadow-md border border-slate-300 text-center"
            type="number"
            placeholder="Kjøpspris"
          />
        </div>
        <div>
          <input
            ref={genderInput}
            className="input shadow-md border border-slate-300 text-center"
            type="text"
            placeholder="Kjønn"
          />
        </div>
        <div>
          <label>
            Image
            <input
              onChange={imgChangeHandler}
              className="input shadow-md border border-slate-300 p-4 text-center"
              type="file"
            />
          </label>
        </div>
        <button
          onClick={postNewAthlete}
          className="button shadow-md border border-slate-300 text-center"
        >
          Lagre
        </button>
        <p>{statusMessage}</p>
      </div>
    </>
  );
};
export default AddNewAthlete;
//Im doing a test
