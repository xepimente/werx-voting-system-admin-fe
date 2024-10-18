// import MiniCalendar from "components/calendar/MiniCalendar";
// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
// import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";

// import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
// import CheckTable from "views/admin/default/components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
// import TaskCard from "views/admin/default/components/TaskCard";
// import tableDataCheck from "./variables/tableDataCheck.json";
// import tableDataComplex from "./variables/tableDataComplex.json";
import AdminDataService from "../../../services/admin.service";
import VotersDataService from "../../../services/voters.service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ColumnsTable from "../tables/components/ColumnsTable";
import Banner from "../profile/components/Banner";
import TopCreatorTable from "../marketplace/components/TableTopCreators";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import {tableColumnsTopCreators} from "views/admin/marketplace/variables/tableColumnsTopCreators.js";
import { data } from "autoprefixer";
import ViewContestants from "views/users/default/ViewContestants";

const Dashboard = () => {
  const [ leaderboards, setLeaderboards ] = useState(null);
  const [ restaurants, setRestaurants ] = useState([]);
  
  useEffect(()=> {
    getLogos();
  },[])

  function getPositionSuffix(position) {
    const suffixes = ["st", "nd", "rd"];
    const remainder10 = position % 10;
    const remainder100 = position % 100;
  
    if (remainder10 >= 1 && remainder10 <= 3 && !(remainder100 >= 11 && remainder100 <= 13)) {
      return suffixes[remainder10 - 1];
    } else {
      return "th";
    }
  }

  const getLogos = async () => {
    try {
      // setLoading(true); // Set loading to true while fetching data
      const res = await AdminDataService.getLogos();
      if (res.data && res.data.status === "200") {
        // setLogos((prevData) => res.data.data);
        setLeaderboards((prevData) => res.data.data.map((logo, logoIndex) => {
          logo.restaurants.sort((a, b) => b.votes - a.votes);
          const sortedRestaurants = logo.restaurants?.map((restaurant, restaurantIndex) => {
            const position = restaurantIndex + 1;
            return {
              ...restaurant,
              bannerHeader: logo.bannerHeader,
              contestImage: logo.image_url,
              position: `${position}${getPositionSuffix(position)}`
            }
          });
          return {
            ...logo,
            restaurants: sortedRestaurants
          }
        }));
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
    } finally {
      // setLoading(false); // Set loading to false after data retrieval
    }
  };

// const getCountVoters = async () => {
//     try {
//       const res = await VotersDataService.getCountVoters();
//       if (res.data && res.data.status === "200") {
//         setVoters(res.data.data);
//       } else {
//         toast.error("Something went wrong! Please try again later.");
//       }
//     } catch (err) {
//       toast.error("Something went wrong! Please try again later.");
//     }
// }

// const getCountRestaurants = async () => {
//     try {
//       const res = await AdminDataService.getCountRestaurants();
//       if (res.data && res.data.status === "200") {
//         setRestaurants(res.data.data);
//       } else {
//         toast.error("Something went wrong! Please try again later.");
//       }
//     } catch (err) {
//       toast.error("Something went wrong! Please try again later.");
//     }
// }
  const columns = [
    {
      Header: "NAME",
      accessor: "restaurant_name",
    },
    {
      Header: "CONTEST",
      accessor: "bannerHeader",
    },
    {
      Header: "VOTES",
      accessor: "votes",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
  ];

  const viewContestantColumns = [
    {
      Header: "NAME",
      accessor: "restaurant_name",
    },
    {
      Header: "DESCRIPTION",
      accessor: "drink_description",
    },
    {
      Header: "POSITION",
      accessor: "position",
    },
  ];

  return (
    <>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
            {/* <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Active Contests
            </h4> */}
          </div>
          {leaderboards === null ? ( // Render loading indicator while loading
            <div className="flex h-[300px] w-full items-center justify-center">
              <p className="text-lg text-gray-500">Loading...</p>
            </div>
            ) : leaderboards?.length >= 0 ? (<TopCreatorTable 
            tableData={leaderboards.map((data) => data.restaurants[0])} 
            columnsData={columns}
            headerText="Leaderboard"
            dataClick={(data) => {
              const restaurantList = leaderboards.find((logoData) => logoData._id === data.logoId).restaurants;
              restaurantList.sort((a, b) => b.votes - a.votes);
              setRestaurants((prevData) => restaurantList)
            }}
            voteClick={(data) => null}
          />) : (
            null
          )}
          <div className="mb-5" />
        </div>
      </div>
      {restaurants?.length > 0 && 
        <ViewContestants
          isOpen={restaurants}
          // data={defaults}
          onClose={(data) => {
            setRestaurants((prevData) => null);
          }}
          columns={viewContestantColumns}
          setData={(data) => null}
        />
      }
    {/* <div> */}
      {/* Card widget */}

      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Combined Reviews"}
          subtitle={`${voters ? voters : "0"}`}
        />
        <Widget
          icon={<IoDocuments className="h-7 w-7" />}
          title={"Total Restaurant"}
          subtitle={`${restaurants ? restaurants : "0"}`}
        />
      </div> */}

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2"> */}
        {/* Check Table */}
        {/* <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
          <ColumnsTable
          columnsData={columns}
          tableData={allData.length > 0 && allData || []}
          />
        </div> */}

        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1"> */}
          {/* <DailyTraffic /> */}
          {/* <PieChartCard allData={allData.length > 0 && allData || []} /> */}
        {/* </div> */}

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        
      {/* </div> */}
    {/* </div> */}
    </>
  );
};

export default Dashboard;
