import React, { useEffect, useState } from "react";
import ColumnsTable from "views/admin/tables/components/ColumnsTable";
import { useDisclosure } from "@chakra-ui/hooks";
import AddRestaurant from "./AddRestaurant";
import AdminDataService from "../../services/admin.service";
import VotersDataService from "../../services/voters.service";

import { toast } from "react-toastify";
import EditRestaurant from "./EditRestaurant";
import ViewVotersByRestaurant from "components/voters/ViewVotersByRestaurant";
import { AiFillPlusCircle } from "react-icons/ai";

const RestaurantLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit ] = useState(false);
  const [isView, setIsView ] = useState(false);
  const [ voters, setVoters ] = useState([]);
  const [currData, setCurrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    getRestauRants();
  }, []);

  const handleEdit = async (data) => {
    setIsEdit(true);
  }

  const getVotersByRestaurant = async (data) => {
    try {
      // setIsLoading(true); // Set loading to true while fetching data
      const res = await VotersDataService.getVotersByRestaurant(data);
      if (res.data && res.data.status === "200") {
        setVoters(res.data.data);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      // setIsLoading(false); // Set loading to false after data retrieval
    }
  };

  // getVotersByRestaurant({
  //   restaurantId: "66ad51fcb237959e68213d0e"
  // });

  const getRestauRants = async () => {
    try {
      setIsLoading(true); // Set loading to true while fetching data
      const res = await AdminDataService.getAllRestaurant();
      if (res.data && res.data.status === "200") {
        setAllData(res.data.data);
        // getVotersByRestaurant({restaurantId: res.data.data[0]["_id"]});
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false after data retrieval
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
      if (confirmDelete) {
        let options = {
          id: id,
        };
        const res = await AdminDataService.deleteRestaurant(options);
        if (res.data && res.data.status === "200") {
          getRestauRants();
          toast.success("Restaurant deleted successfully!");
        } else {
          toast.error("Failed to delete restaurant. Please try again later.");
        }
      }
    } catch (err) {
      toast.error("Failed to delete restaurant. Please try again later.");
    }
  };

  const columns = [
    {
      Header: "NAME",
      accessor: "drinks",
    },
    {
      Header: "OWNER",
      accessor: "owner",
    },
    // {
    //   Header: "CONTESTANT",
    //   accessor: "restaurant_name",
    // },
    {
      Header: "ACTION",
    },
  ];

  return (
    <div 
    // className="mt-3 space-y-4"
    className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2"
    >
      {/* <div className="float-right mb-4 w-full">
        <button
          onClick={onOpen}
          className="float-right w-full rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10 md:w-1/4"
        >
          Create Contest
        </button>
      </div> */}
      {isLoading ? ( // Render loading indicator while loading
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      ) : allData.length > 0 ? (
        <div>
          <ColumnsTable
            columnsData={columns}
            tableData={allData}
            handleDelete={handleDelete}
            handleView={(data) => {
              getVotersByRestaurant({ restaurantId: data });
              setIsView(true);
            }}
            handleEdit={handleEdit} 
            setCurrData={setCurrData}
            headerColumnsTable={
              {
                header: "List of Contests",
                onOpen: () => onOpen()
              }
            }
          />
        </div>
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">No Restaurants found</p>
        </div>
      )}
      <AddRestaurant
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        getRestauRants={getRestauRants}
      />
      { currData && <EditRestaurant
        isOpen={isEdit}
        onOpen=""
        onClose={()=> setIsEdit(false)}
        getRestauRants={getRestauRants}
        currData={currData}
       />}
      { voters && <ViewVotersByRestaurant
        isOpen={isView}
        onClose={() => setIsView(false)}
        voters={voters}
      />}
    </div>
  );
};

export default RestaurantLists;
