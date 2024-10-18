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

const AddRestaurant = ({ isOpen, onOpen, onClose, defaults }) => {
  const [ data, setData ] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [ logoId, setLogoId ] = useState("");
  const [ logos, setLogos ] = useState([]);
  const [images, setImages] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    getAdminData();
    getLogos();
  }, []);

  const getAdminData = () => {
    AdminDataService.getAdmins().then((res) => {
      if (res.data && res.data.status === "200") {
        setAdminData(res.data.data);
      }
    });
  };

  const getLogos = () => {
    AdminDataService.getLogos().then((res) => {
      if (res.data && res.data.status === "200") {
        setLogos(res.data.data);
      }
    });
  }

  const handleImageUpload = (files) => {
    setImages(files);
  };

  const handleAdd = async () => {
    if(data.images.length === 0) return toast("Product images are required");
    if(data.restaurant_name === "") return toast("Restaurant name is required");
    if(data.drinks === "") return toast("Product name is required");
    if(data.drink_description === "") return toast("Product description is required");
    if(defaults.adminId === "") return toast("Admin is required");
    if(defaults.logoId === "") return toast("Logo is required");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("restaurant_name", data.restaurant_name);
    formData.append("drinks", data.drinks);
    formData.append("drink_description", data.drink_description);
    formData.append("adminId", defaults.adminId);
    formData.append("logoId", defaults.logoId);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    const res = await axios.post(
      `${process.env.REACT_APP_HTTPCOMMON}/admin/add-restaurant`,
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
      toast.success("Contest added successfully!");
      setLoading(false);
      const qrCodeBlob = await fetch(res.data.qrCode).then((res) => res.blob());
      FileSaver.saveAs(qrCodeBlob, `${restaurantName}.png`);
      onClose({ logoId: defaults.logoId });
    } else {
      toast.error(`${res.data.message}`);
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
              <Loading message={`Creating Contest`} />
            ) : (
              <div className="!z-[1004] mx-auto mt-10 flex max-w-[850px] flex-col rounded-md bg-white px-[30px] pt-[35px] pb-[40px] dark:!bg-navy-700">
                <h1 className="mb-[20px] text-2xl font-bold">Add Contestant</h1>
                <div className="mb-[5px] flex w-full">
                  <div className="w-full p-2">
                    <InputField
                      label="Contestant name"
                      placeholder="@contest_name"
                      type="text"
                      value={data?.restaurant_name}
                      onChange={(e) => setData((prevData) => ({
                        ...prevData, restaurant_name: e.target.value
                      }))}
                    />
                  </div>
                  <div className="w-full p-2">
                    {/* <InputField
                      label="Contest"
                      placeholder="@contest"
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    /> */}
                  </div>
                </div>
                <div className="mb-[5px] w-full">
                  <div className="w-full p-2">
                    <InputField
                      label="Contestant Description"
                      placeholder="@contest_description"
                      type="textarea"
                      rows="3"
                      value={data?.drink_description}
                      onChange={(e) => setData((prevData) => ({
                        ...prevData, drink_description: e.target.value
                      }))}
                    />
                  </div>
                </div>
                {/* <div className="mb-[5px] w-full">
                  <div className="w-full p-2">
                    <label
                      for="countries"
                      className="mb-2 ml-3 block text-sm font-semibold text-navy-700 dark:text-white"
                    >
                      Select Owner/Manager
                    </label>
                    <select
                      value={defaults.adminId}
                      onChange={(e) => setData((prevData) => ({
                        ...prevData, adminId: e.target.value
                      }))}
                      id="countries"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      disabled
                    >
                      <option value={""} selected disabled>
                        Choose owner
                      </option>
                      {adminData.map((admin, index) => (
                        <option key={index} value={admin._id}>
                          {admin.first_name} {admin.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-[5px] w-full">
                  <div className="w-full p-2">
                    <label
                      for="countries"
                      className="mb-2 ml-3 block text-sm font-semibold text-navy-700 dark:text-white"
                    >
                      Select Logo
                    </label>
                    <select
                      value={defaults.logoId}
                      onChange={(e) => setLogoId(e.target.value)}
                      id="countries"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      disabled
                    >
                      <option value={""} selected disabled>
                        Choose logo
                      </option>
                      {logos.map((logo, index) => (
                        <option key={index} value={logo._id}>
                          {logo.bannerHeader}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}
                <div className="mb-[20px] w-full">
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
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleAdd}
                    className="linear rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                  >
                    Create Contest
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddRestaurant;
