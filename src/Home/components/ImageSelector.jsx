/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";

const ImageSelector = (props) => {
  const { setFile, pictureUrl } = props;
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }

      const url = URL.createObjectURL(file);
      console.log("url: ", url);
      setImageUrl(url);
      setFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const hasPhotoUrl = pictureUrl;

  return (
    <div className="img-selector-wrapper">
      <input
        accept="image/*"
        type="file"
        id="img-file"
        onChange={handleFileChange}
      />
      <label htmlFor="img-file">
        {imageUrl || hasPhotoUrl ? (
          <img src={imageUrl ? imageUrl : pictureUrl} alt="Uploaded" />
        ) : (
          <MdOutlineCameraAlt />
        )}
      </label>
    </div>
  );
};

export default ImageSelector;
