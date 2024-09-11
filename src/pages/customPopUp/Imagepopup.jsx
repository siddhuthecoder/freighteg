import React from "react";
import { MdOutlineDownloading } from "react-icons/md";

const Imagepopup = ({ imageUrl, onClose }) => {
  console.log("imageUrl", imageUrl);

  const handleDownload = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const urlBlob = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    const fileExtension = url.split(".").pop().toLowerCase();
    link.download = `downloaded_image.${fileExtension}`;
    link.click();
    URL.revokeObjectURL(urlBlob);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg w-96 h-96 max-w-full max-h-full overflow-y-auto">
        <div className="relative">
          <img src={imageUrl} alt="Popup Image" className="rounded-lg" />
          <div>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              onClick={() => handleDownload(imageUrl)}
              className="absolute top-14 right-2 bg-gray-200 text-gray-700 p-2 rounded-full flex items-center justify-center"
            >
              <MdOutlineDownloading className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imagepopup;
