import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal";
import { FiStar } from "react-icons/fi";
import ColumnsTable from "views/admin/tables/components/ColumnsTable";
import VotersDataService from "services/voters.service"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ViewVotersByRestaurant({ isOpen, onClose, data }) {
  const [ voters, setVoters ] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    getVotersByRestaurant(data);
  },[]);

  const getVotersByRestaurant = async (data) => {
    try {
      setIsLoading(true); // Set loading to true while fetching data
      const res = await VotersDataService.getVotersByRestaurant(data);
      if (res.data && res.data.status === "200") {
        setVoters(res.data.data);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false after data retrieval
    }
  };

  const columns = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "PHONE NUMBER",
      accessor: "phone_number",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "RATING",
      accessor: "restaurants",
    }
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="!z-[1010]">
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="!z-[1002] !m-auto w-full">
          <ModalBody>
            {isLoading ? ( // Render loading indicator while loading
              <div className="flex h-[300px] w-full items-center justify-center">
                <p className="text-lg text-gray-500">Loading...</p>
              </div>
            ) : (
            <div className="!z-[1004] mx-auto mt-48 flex max-w-[850px] flex-col rounded-md bg-white px-[30px] pt-[35px] pb-[40px] dark:!bg-navy-700 md:mt-5">
              <h1 className="mb-[20px] text-2xl font-bold">View Contest Voters</h1>
              <ColumnsTable
                columnsData={columns}
                tableData={voters}
              />
              <div className="flex gap-2 pt-5">
                <button
                  onClick={onClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  Close
                </button>
              </div>
            </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}