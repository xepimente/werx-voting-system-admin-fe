import React, { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import InputField from "components/fields/InputField";
import Upload from "views/admin/profile/components/Upload";
import { toast } from "react-toastify";
import AdminDataService from "../../services/admin.service";
import FileSaver from "file-saver";
import { Select, useEditable } from "@chakra-ui/react";
import axios from "axios";
import Loading from "components/loading/Loading";

const EditRestaurant = ({ isOpen, onOpen, onClose, getRestauRants, currData, onClickDelete }) => {
  const [ data, setData ] = useState(currData);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("restaurant_name", data.restaurant_name);
    formData.append("drinks", data.drinks);
    formData.append("drink_description", data.drink_description);
    formData.append("adminId", data.adminId);
    formData.append("logoId", data.logoId);
    formData.append("id", data._id);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    const res = await axios.put(
      `${process.env.REACT_APP_HTTPCOMMON}/admin/update-restaurant`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth": `${localStorage.getItem("auth")}`,
        },
        withCredentials: true,
      }
    );
    if (res.data && res.data.status === "200") {
      toast.success("Restaurant updated successfully!");
      setLoading(false);
      onClose({ logoId: data.logoId });
    } else {
      toast.error("Something went wrong! Please try again later.");
      setLoading(false);
    }
    try {
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto w-full">
          <ModalBody>
          {loading ? (
              <Loading message={`Updating restaurant`} />
            ) : (
            <div className="!z-[1004] mx-auto mt-48 flex max-w-[850px] flex-col rounded-md bg-white px-[30px] pt-[35px] pb-[40px] dark:!bg-navy-700 md:mt-5">
              <h1 className="mb-[20px] text-2xl font-bold">Update Contestant</h1>
              <div className="mb-[5px] flex w-full">
                <div className="w-full p-2">
                  <InputField
                    label="Contestant Name"
                    placeholder="@restaurant_name"
                    type="text"
                    value={data.restaurant_name}
                    onChange={(e) => setData((prevData) => ({
                      ...prevData, restaurant_name: e.target.value
                    }))}
                  />
                </div>
                <div className="w-full p-2">
                </div>
              </div>
              <div className="mb-[5px] w-full">
                <div className="w-full p-2">
                  <InputField
                    label="Contestant Description"
                    placeholder="@product_description"
                    type="textarea"
                    rows="3"
                    value={data.drink_description}
                    onChange={(e) => setData((prevData) => ({
                      ...prevData, drink_description: e.target.value
                    }))}
                  />
                </div>
              </div>
              <div className="mb-[5px] w-full">
                <div className="w-full p-2">
                  <p className="ml-3 pb-1 text-sm font-semibold text-navy-700">
                    Contestant Pictures
                  </p>
                  <Upload onChange={(files) => setData((prevData) => ({
                    ...prevData, images: files
                  }))} 
                  images={data?.images ? data.images : []} />
                </div>
              </div>
              <div className="flex gap-2 mt-10">
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
                <button
                  onClick={handleUpdate}
                  className="linear rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Update Contestant
                </button>
              </div>
            </div>
            )
          }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditRestaurant;
