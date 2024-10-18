import React, { useEffect, useState } from "react";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";

import { FaUser } from "react-icons/fa";
import Card from "components/card";

import AdminDataService from "services/admin.service.jsx";
import { toast } from "react-toastify";

const HistoryCard = () => {
  const [ restaurants, setRestaurants ] = useState(null);

  useEffect(() => {
    getLogos();
  }, []);

  const getLogos = async () => {
    try {
      // setLoading(true); // Set loading to true while fetching data
      const res = await AdminDataService.getDeletedLogos();
      if (res.data && res.data.status === "200") {
        setRestaurants((prevData) => res.data.data);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      // setLoading(false); // Set loading to false after data retrieval
    }
  };

  const HistoryData = [
    {
      image: Nft1,
      title: "Colorful Heaven",
      owner: "Mark Benjamin",
      price: 0.4,
      time: "30s",
    },
    {
      image: Nft2,
      title: "Abstract Colors",
      owner: "Esthera Jackson",
      price: 2.4,
      time: "50m",
    },
    {
      image: Nft3,
      title: "ETH AI Brain",
      owner: "Nick Wilson",
      price: 0.3,
      time: "20s",
    },
    {
      image: Nft4,
      title: "Swipe Circles",
      owner: " Peter Will",
      price: 0.4,
      time: "4h",
    },
    {
      image: Nft5,
      title: "Mesh Gradients",
      owner: "Will Smith",
      price: 0.4,
      time: "30s",
    },
    {
      image: Nft6,
      title: "3D Cubes Art",
      owner: " Manny Gates",
      price: 0.4,
      time: "2m",
    },
  ];

  return (
    <>
      {restaurants === null ? ( // Render loading indicator while loading
        <div className="flex h-[300px] w-full items-center justify-center">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      ) : restaurants?.length > 0 ? (
      <Card extra={"mt-3 !z-5 overflow-hidden"}>
        {/* HistoryCard Header */}
        <div className="flex items-center justify-between rounded-t-3xl p-3">
          <div className="text-lg font-bold text-navy-700 dark:text-white">
            History
          </div>
          <div className="rounded-[20px] px-4 py-2">
          </div>
        </div>

        {/* History CardData */}

        {restaurants.map((data, index) => (
          <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700" key={data._id}>
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  className="h-full w-full rounded-xl"
                  src={data.image_url}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-base font-bold text-navy-700 dark:text-white">
                  {" "}
                  {data.bannerHeader}
                </h5>
                <p className="mt-1 text-sm font-normal text-gray-600">
                  {" "}
                  {data.admin[0].first_name} {data.admin[0].last_name}{" "}
                </p>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
              <div>
                <FaUser />
              </div>
              <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                <p> {} </p>
                {data.restaurants?.length} <p className="ml-1">Contestants</p>
              </div>
              <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                {/* <p>{data.updatedAt.split("T")[0]}</p> */}
                {/* <p className="ml-1">ago</p> */}
              </div>
            </div>
          </div>
        ))}
      </Card>) : (
        <Card extra={"mt-3 !z-5 overflow-hidden"}>
          {/* HistoryCard Header */}
          <div className="flex items-center justify-between rounded-t-3xl p-3">
            <div className="text-lg font-bold text-navy-700 dark:text-white">
              History
            </div>
            <div className="rounded-[20px] px-4 py-2">
            </div>
          </div>

          {/* History CardData */}
          
          <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
            <div className="flex items-center gap-3">
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default HistoryCard;
