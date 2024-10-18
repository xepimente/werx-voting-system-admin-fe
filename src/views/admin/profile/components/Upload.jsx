import { MdFileUpload, MdClose } from "react-icons/md";
import Card from "components/card";
import React, { useEffect, useRef, useState } from "react";

const Upload = ({ onChange, images }) => {
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [onChangeIstrue, setOnchangeIstrue] = useState(false);

  useEffect(()=> {
    if(images && images.length > 0){
      setSelectedImages(images);
    }
  },[])


  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(files);
    setOnchangeIstrue(true);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="h-full w-full rounded-[20px] bg-white bg-clip-border font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
     <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
      { selectedImages.length > 0 ? 

        <div className="flex flex-wrap p-2 mt-10">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={!onChangeIstrue ? image : URL.createObjectURL(image)}
                alt={`Selected Image ${index + 1}`}
                className="w-24 h-24 mr-2 mb-2 rounded-md object-cover"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-white rounded-full p-1 text-gray-600 hover:text-red-500"
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
        :
        <>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple // Allow multiple file selection
          accept=".jpg,.jpeg,.png" // Only accept JPEG and PNG files
        />
        <button
          className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
          onClick={handleClick}
        >
          <MdFileUpload className="text-[30px] text-brand-500 dark:text-white" />
          <h4 className="text-xs font-bold text-brand-500 dark:text-white">
            Upload Files
          </h4>
          <p className="mt-2 text-xs font-medium text-gray-600">
            PNG and JPG files are allowed
          </p>
        </button>
        {/* Render selected images */}
        
        </>
      }
      </div>
    </Card>
  );
};

export default Upload;
