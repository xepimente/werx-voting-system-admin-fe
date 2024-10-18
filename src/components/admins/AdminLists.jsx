import React, { useEffect, useState } from "react";
import CheckTable from "views/admin/tables/components/CheckTable";
import ColumnsTable from "views/admin/tables/components/ColumnsTable";
import { useDisclosure } from "@chakra-ui/hooks";
import AdminDataService from "../../services/admin.service";
import { toast } from "react-toastify";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";

const AdminLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currData, setCurrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      setIsLoading(true); // Set loading to true while fetching data
      const res = await AdminDataService.getAdmins();
      if (res.data && res.data.status === "200") {
        setAllData(res.data.data);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false after data retrieval
    }
  };

  const handleEdit = async (data) => {
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this admin?"
      );
      if (confirmDelete) {
        let options = {
          id: id,
        };
        const res = await AdminDataService.deleteAdmin(options);
        if (res.data && res.data.status === "200") {
          getAdmins();
          toast.success("Admin deleted successfully!");
        } else {
          toast.error("Failed to delete admin. Please try again later.");
        }
      }
    } catch (err) {
      toast.error("Failed to delete admin. Please try again later.");
    }
  };

  const columns = [
    {
      Header: "NAME",
      accessor: "first_name",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "CONTEST",
      accessor: "restaurant",
    },
    {
      Header: "ACTION",
      accessor: "position",
    },
  ];

  return (
    <div className="mt-3 space-y-4">
      <div className="float-right mb-4 w-full">
        <button
          onClick={onOpen}
          className="float-right w-full rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10 md:w-1/4"
        >
          Add Admin
        </button>
      </div>
      {isLoading ? ( // Render loading indicator while loading
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      ) : allData.length > 0 ? (
        <ColumnsTable
          columnsData={columns}
          tableData={allData}
          handleEdit={handleEdit}
          setCurrData={setCurrData}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">No Admins found</p>
        </div>
      )}
      <AddAdmin
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        getAdmins={getAdmins}
        handleDelete={handleDelete}
      />
      {currData && (
        <EditAdmin
          isOpen={isEdit}
          onOpen=""
          onClose={() => setIsEdit(false)}
          getAdmins={getAdmins}
          currData={currData}
        />
      )}
    </div>
  );
};

export default AdminLists;
