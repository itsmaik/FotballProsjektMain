import AthleteService from "../services/AthleteService";
import ImageService from "../services/ImageService";
import { useRef, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../interfaces/IAthlete";

const AddNewAthlete = () => {
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
      const AthleteResponse = await AthleteService.addNewAthlete(newAthlete);

      if (AthleteResponse.success) {
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
    <section>
      <h3>Legg til ny spiller!</h3>
      <div>
        <label>Navn </label>
        <input ref={nameInput} className="input" type="text" />
      </div>
      <div>
        <label>Kjøpspris</label>
        <input ref={priceInput} className="input" type="number" />
      </div>
      <div>
        <label>Kjønn</label>
        <input ref={genderInput} className="input" type="text" />
      </div>
      <div>
        <label>
          Image
          <input onChange={imgChangeHandler} type="file" />
        </label>
      </div>
      <button onClick={postNewAthlete} className="button">
        Lagre
      </button>
      <p>{statusMessage}</p>
    </section>
  );
};
export default AddNewAthlete;
//Im doing a test
