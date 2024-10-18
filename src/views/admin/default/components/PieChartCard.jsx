import PieChart from "components/charts/PieChart";
import Card from "components/card";

const PieChartCard = ({ allData }) => {
  // Initialize restaurantData with default values
  const restaurantData = Array.isArray(allData) ? allData.map(data => ({
    label: data.restaurant_name || 'Unknown',
    value: data.votes || 0,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
  })) : [];

  // Set default values to avoid issues with empty data
  const pieChartData = restaurantData.length > 0 ? restaurantData.map(data => data.value) : [0];
  const pieChartLabels = restaurantData.length > 0 ? restaurantData.map(data => data.label) : ['No Data'];
  const pieChartColors = restaurantData.length > 0 ? restaurantData.map(data => data.color) : ['#cccccc'];

  const pieChartOptions = {
    labels: pieChartLabels,
    colors: pieChartColors,
    chart: {
      type: "donut",
      width: "100%", // Ensure chart width is set
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: pieChartColors,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };


  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Your Pie Chart
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {/* Ensure PieChart receives valid props */}
        {pieChartData .length > 0 && <PieChart options={pieChartOptions} series={pieChartData} />}
      </div>

      {/* Legends */}
      <div className="flex flex-wrap justify-center">
        {restaurantData.length > 0 ? (
          restaurantData.map((data, index) => (
            <div key={index} className="flex flex-col items-center justify-center mr-8">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
              <p className="mt-1 text-sm font-normal text-gray-600">{data.label}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Card>
  );
};

export default PieChartCard;
