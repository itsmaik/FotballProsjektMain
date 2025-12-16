import axios from "axios";
import { path } from "../services/PathService";

const postNewImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await axios({
    url: path.imageUploadEndpoint,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  formData.delete("file");

  return response;
};

export default { postNewImage };
