import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import InputField from "components/fields/InputField";
import Upload from "views/admin/profile/components/Upload";
import { toast } from "react-toastify";
import AdminDataService from "../../services/admin.service";

const AddAdmin = ({ isOpen, onOpen, onClose, getAdmins}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  
  const handleAdd = async () => {
    let options = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password:password
    };
    const res = await AdminDataService.addAdmin(options);
    if (res.data && res.data.status === "200") {
      toast.success("Admin added successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      getAdmins();
      onClose();
    } else {
      toast.error(`${res.data.message}`);
    }
    try {
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto w-full md:top-[12vh]">
          <ModalBody>
            <div className="!z-[1004] mx-auto mt-48 flex max-w-[850px] flex-col rounded-md bg-white px-[30px] pt-[35px] pb-[40px] dark:!bg-navy-700 md:mt-5">
              <h1 className="mb-[20px] text-2xl font-bold">Add Admin</h1>
              <div className="mb-[5px] md:flex w-full">
                <div className="w-full p-2">
                  <InputField
                    label="First Name"
                    placeholder="@first_name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full p-2">
                  <InputField
                    label="Last Name"
                    placeholder="@last_name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-[5px] md:flex w-full">
                <div className="w-full p-2">
                  <InputField
                    label="Email"
                    placeholder="@email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full p-2">
                  <InputField
                    label="Password"
                    placeholder="@password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  onClick={handleAdd}
                  className="linear rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddAdmin;
