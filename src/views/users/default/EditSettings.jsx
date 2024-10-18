import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import axios from "axios";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import Loading from "components/loading/Loading";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import Upload from "views/admin/profile/components/Upload";
import AdminDataService from "services/admin.service"

export default function EditSettings({ isOpen, onOpen, onClose, currData, getLogos }) {
  const [logoData, setLogoData] = useState(currData);
  const [ admins, setAdmins ] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLogoData((prevData) => currData);
    getAdmins();
  }, [isOpen]);

  const getAdmins = () => {
    AdminDataService.getAdmins().then((res) => {
      if (res.data && res.data.status === "200") {
        setAdmins((prevData) => res.data.data);
      }
    });
  }

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", logoData.title);
    formData.append("sideHeader", logoData.sideHeader);
    formData.append("sideContent", logoData.sideContent);
    formData.append("bannerHeader", logoData.bannerHeader);
    formData.append("bannerDescription", logoData.bannerDescription);
    formData.append("id", logoData._id);
    formData.append("images", logoData.image_url);
    formData.append("adminId", logoData.adminId);
    const res = await axios.put(
      `${process.env.REACT_APP_HTTPCOMMON}/logo/update-logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          auth: `${localStorage.getItem("auth")}`,
        },
        withCredentials: true,
      }
    );
    if (res.data && res.data.status === "200") {
      toast.success("Logo updated successfully!");
      setLoading(false);
      // setTitle("");
      getLogos();
      onClose();
    } else {
      toast.error(
        res.data.message || "Something went wrong! Please try again later."
      );
      setLoading(false);
    }
    try {
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if(logoData.image_url === "") return toast("Product images are required");
    if(logoData.title === "") return toast("Title is required");
    if(logoData.sideHeader === "") return toast("Side header is required");
    if(logoData.sideContent === "") return toast("Side content is required");
    if(logoData.bannerHeader === "") return toast("Banner header is required");
    if(logoData.bannerDescription === "") return toast("Banner description is required");
    if(logoData.adminId === "") return toast("Owner is required");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("title", logoData.title);
    formData.append("sideHeader", logoData.sideHeader);
    formData.append("sideContent", logoData.sideContent);
    formData.append("bannerHeader", logoData.bannerHeader);
    formData.append("bannerDescription", logoData.bannerDescription);
    formData.append("images", logoData.image_url);
    formData.append("adminId", logoData.adminId);
    
    const res = await axios.post(
      `${process.env.REACT_APP_HTTPCOMMON}/logo/upload-logo`,
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
      toast.success("Restaurant added successfully!");
      setLoading(false);
      getLogos();
      onClose();
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

  return createPortal(
  <>
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} className="!z-[1010]">
      <ModalOverlay className="bg-[#000] !opacity-30" />
      <ModalContent className="!z-[1002] !m-auto h-full w-full">
        <ModalBody>
          {loading ? (
              <Loading message={`Updating settings`} />
            ) : (
          <div className="!z-[1004] mx-auto flex max-w-[850px] md:max-h-[850px] overflow-y-scroll flex-col rounded-md bg-white px-[30px] pt-[35px] pb-[40px] dark:!bg-navy-700 my-5">
            <h1 className="mb-[20px] text-2xl font-bold">Update Logo Settings</h1>
            <div className="mb-[20px] w-full">
              <div className="w-full p-2">
                <p className="mb-2 text-xl font-bold">
                  Logo Picture
                </p>
                <Upload 
                onChange={(files) => setLogoData((prevData) => ({
                  ...prevData, image_url: files[0]
                }))} 
                images={logoData?.image_url ? [logoData.image_url] : []} />
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-full p-2">
                <InputField
                  label="Logo title"
                  placeholder="@logo_title"
                  type="text"
                  value={logoData?.title}
                  onChange={(e) => setLogoData((prevData) => ({
                    ...prevData, title: e.target.value
                  }))}
                />
              </div>
            </div>
            
            <div className="mb-[5px] w-full">
              <div className="w-full p-2">
                <label
                  for="countries"
                  className="mb-2 block text-sm font-semibold text-navy-700 ml-3 dark:text-white"
                >
                  Select Owner/Manager
                </label>
                <select
                  value={logoData?.adminId}
                  onChange={(e) => setLogoData((prevData) => ({
                    ...prevData, adminId: e.target.value
                  }))}
                  id="countries"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                <option value={""} selected disabled>Choose owner</option>
                  {
                    admins?.map((admin, index) => (
                      <option key={index} value={admin._id}>{admin.first_name} {admin.last_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="mb-2 mt-5 w-full">
              <h1 className="mb-2 text-xl font-bold">Side Content Settings</h1>
              <div className="w-full p-2">
                <InputField
                  label="Header"
                  placeholder="@enter_header"
                  type="text"
                  value={logoData?.sideHeader}
                  onChange={(e) => setLogoData((prevData) => ({
                    ...prevData, sideHeader: e.target.value
                  }))}
                />
              </div>
              <div className="w-full p-2">
                <TextField
                  label="Content"
                  placeholder="@enter_content"
                  type="textarea"
                  rows="3"
                  value={logoData?.sideContent}
                  onChange={(e) => setLogoData((prevData) => ({
                    ...prevData, sideContent: e.target.value
                  }))}
                />
              </div>
            </div>

            <div className="mb-2 mt-5 w-full">
              <h1 className="mb-2 text-xl font-bold">Banner Settings</h1>
              <div className="w-full p-2">
                <InputField
                  label="Banner Header"
                  placeholder="@enter_banner_header"
                  type="text"
                  value={logoData?.bannerHeader}
                  onChange={(e) => setLogoData((prevData) => ({
                    ...prevData, bannerHeader: e.target.value
                  }))}
                />
              </div>
              <div className="w-full p-2">
                <TextField
                  label="Banner Description"
                  placeholder="@enter_banner_description"
                  type="textarea"
                  rows="3"
                  value={logoData?.bannerDescription}
                  onChange={(e) => setLogoData((prevData) => ({
                    ...prevData, bannerDescription: e.target.value
                  }))}
                />
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
                onClick={currData?._id ? handleUpdate : handleAdd}
                className="linear rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
              >
                {currData?._id ? "Update" : "Add"} Settings
              </button>
            </div>
          </div>
          )
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  </>,document.getElementById('chakra-modal')
  );
}