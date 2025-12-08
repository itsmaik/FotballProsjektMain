import axios from "axios";

const imageUploadEndpoint = "http://localhost:5212/ImageUpload";

const postNewImage = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await axios({
    url: imageUploadEndpoint,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  formData.delete("file");

  return response;
};

export default { postNewImage };
