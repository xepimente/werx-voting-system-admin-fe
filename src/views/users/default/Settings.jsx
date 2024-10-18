import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDataService from "../../../services/admin.service";
import ColumnsTable from "views/admin/tables/components/ColumnsTable";
import EditSettings from "./EditSettings";
import { useDisclosure } from "@chakra-ui/hooks";
import Banner1 from "views/admin/marketplace/components/Banner";
import NftCard from "components/card/NftCard";
import Loading from "components/loading/Loading";
import HistoryItem from "views/admin/marketplace/components/HistoryCard";
import TopCreatorTable from "views/admin/marketplace/components/TableTopCreators";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import ViewContestants from "./ViewContestants";
import AddRestaurant from "components/restaurant/AddRestaurant";
import EditRestaurant from "components/restaurant/EditRestaurant";
import ViewVotersByRestaurant from "components/voters/ViewVotersByRestaurant";
import Banner from "views/admin/marketplace/components/Banner.jsx";
import DeleteModal from "components/restaurant/DeleteModal";

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ loading, setLoading ] = useState(false);
  const [ logos, setLogos ] = useState([]);
  const [ logoData, setLogoData ] = useState(null);
  const [ defaults, setDefaults ] = useState(null);
  const [ restaurants, setRestaurants ] = useState(null);
  const [ restaurant, setRestaurant ] = useState(null);
  const [ onSave, setOnSave ] = useState(null);
  const [ voters, setVoters ] = useState(null);
  const [ onDelete, setOnDelete ] = useState(null);

  const logoModel = {
    bannerDescription: "",
    bannerHeader: "",
    image_url: "",
    sideContent: "",
    sideHeader: "",
    title: "",
  }

  console.log(onDelete);

  const contestantColumns = [
    {
      Header: "NAME",
      accessor: "restaurant_name",
    },
    {
      Header: "DESCRIPTION",
      accessor: "drink_description",
    },
    {
      Header: "VOTES",
      accessor: "votes",
    },
    {
      Header: "ACTION",
    },
  ];

  useEffect(() => {
    getLogos();
  }, [onSave]);

  useEffect(() => {
    if (onSave?.logoId || onSave?.restaurant_name) {
      setRestaurants((prevData) => logos?.find((data) => data._id === onSave["logoId"]).restaurants);
    }
  }, [logos]);

  const getLogos = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const res = await AdminDataService.getLogos();
      if (res.data && res.data.status === "200") {
        setLogos((prevData) => res.data.data);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after data retrieval
    }
  };

  const handleDeleteLogo = async (id) => {
    try {
        const res = await AdminDataService.deleteLogo({ id: id });
        if (res.data && res.data.status === "200") {
          setOnSave((prevData) => ({ bannerHeader: onDelete.bannerHeader }));
          setOnDelete((prevData) => null);
        } else {
          toast.error("Failed to delete restaurant. Please try again later.");
        }
    } catch (err) {
      toast.error("Failed to delete restaurant. Please try again later.");
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
        const res = await AdminDataService.deleteRestaurant({ id: id });
        if (res.data && res.data.status === "200") {
          setOnSave((prevData) => onDelete);
          setOnDelete((prevData) => null);
        } else {
          toast.error("Failed to delete restaurant. Please try again later.");
        }
    } catch (err) {
      toast.error("Failed to delete restaurant. Please try again later.");
    }
  };

  return (
    <>
    {/* <div className="mt-3 space-y-4">
      <div className="float-right mb-4 w-full">
        <button
          onClick={onOpen}
          className="float-right w-full rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10 md:w-1/4"
        >
          Add New Logo Settings
        </button>
      </div>
      {loading ? ( // Render loading indicator while loading
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      ) : logos.length > 0 ? (
        <ColumnsTable
          columnsData={columns}
          tableData={logos}
          // handleDelete={handleDelete}
          // handleView={(data) => {
          //   getVotersByRestaurant({ restaurantId: data });
          //   setIsView(true);
          // }}
          handleEdit={handleEdit} 
          setCurrData={setCurrData}
        />
      ) : (
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">No Logos found</p>
        </div>
      )}
    </div> */}
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">

        <Banner />

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Active Contests
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <button
                onClick={onOpen}
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              >
                Add Contest
              </button>
            </li>
          </ul>
        </div>

        {/* NFTs trending card */}
        {loading ? ( // Render loading indicator while loading
          <div className="flex h-[300px] w-full items-center justify-center">
            <p className="text-lg text-gray-500">Loading...</p>
          </div>
        ) : (
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {logos && logos.map((logo, index) => (
            <NftCard
              key={logo.bannerHeader}
              title={logo.bannerHeader}
              author={logo.admin[0].first_name + " " + logo.admin[0].last_name}
              image={logo.image_url}
              buttonText="Contestants"
              handleEdit={() => {
                setLogoData((prevData) => logo)
              }}
              votes={logo.restaurants.reduce((n, {votes}) => n + votes, 0)}
              buttonClick={() => {
                setRestaurants((prevData) => logo.restaurants);
                setDefaults((prevData) => (
                  { logoId: logo._id, adminId: logo.adminId }
                ));
              }}
              onClickDelete={() => setOnDelete((prevData) => ({
                ...logo
              }))}
            />
          ))}
        </div>)}

        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt3}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt2}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt4}
          /> */}
        </div>

        {/* Recenlty Added setion */}
        <div className="my-5 flex items-center justify-between px-[26px]">
          {/* <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Recently Completed
          </h4> */}
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="0.91"
            image={NFt4}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="0.7"
            image={NFt5}
          />
          <NftCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="2.91"
            image={NFt6}
          /> */}
        </div>
      </div>
      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={logos}
          columnsData={contestColumns}
          headerText="Contest List"
          buttonText="Create"
          buttonClick={onOpen}
        />
      </div> */}
        
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        {/* <TopCreatorTable tableData={tableDataTopCreators} />
        <div className="mb-5" /> */}
        <HistoryItem
        />
      </div>
    </div>
    <EditSettings
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        currData={logoModel}
        getLogos={getLogos}
    />

    {restaurants?.length >= 0 && <ViewContestants
      isOpen={restaurants}
      // data={defaults}
      onClose={(data) => {
        setRestaurants((prevData) => data ? data : null);
        setDefaults((prevData) => null);
      }}
      setData={(data) => {
        setRestaurant((prevData) => data);
      }}
      voteClick={(data) => {
        setVoters((prevData) => ({ restaurantId: data }));
      }}
      buttonText="Create"
      columns={contestantColumns}
      onDeleteClick={(data) => setOnDelete((prevData) => data)}
    />}

    {restaurant?.isCreate && <AddRestaurant
      isOpen={restaurant}
      // onOpen={onOpen}
      onClose={(data) => {
        if (data?.logoId) {
          setOnSave((prevData) => data);
        }
        setRestaurant((prevData) => null);
      }}
      defaults={defaults}
    />}

    {restaurant?._id && <EditRestaurant
      isOpen={restaurant}
      // onOpen={onOpen}
      onClose={(data) => {
        if (data?.logoId) {
          setOnSave((prevData) => data);
        }
        setRestaurant((prevData) => null);
      }}
      currData={restaurant}
    />}

    { logoData && <EditSettings
      isOpen={logoData}
      onOpen=""
      onClose={()=> {
        setLogoData((prevData) => null);
      }}
      currData={logoData}
      getLogos={getLogos}
      />}

    {voters && <ViewVotersByRestaurant
      isOpen={voters}
      data={voters}
      onClose={() => {
        setVoters((prevData) => null);
      }}
    />}

    {onDelete && <DeleteModal
      isOpen={onDelete}
      onClose={() => {
        setOnDelete((prevData) => null);
      }}
      buttonClick={(data) => {
        if (data?.bannerHeader) {
          handleDeleteLogo(data._id);
        }
        if (data?.restaurant_name) {
          handleDeleteRestaurant(data._id);
        }
      }}
    />}
    </>
  );
};

export default Settings;