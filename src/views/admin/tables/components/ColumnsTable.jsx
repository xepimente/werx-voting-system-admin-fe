import Card from "components/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";

const ColumnsTable = (props) => {
  const { columnsData, tableData, handleEdit, handleDelete, handleView, setCurrData, headerColumnsTable } =
    props;

  const handleIsEdit = (data) => {
    handleEdit();
    setCurrData(data);
  };

  // Extracting column headers dynamically from columnsData
  const columns = useMemo(
    () =>
      columnsData.map((column) => ({
        Header: column.Header,
        accessor: column.accessor,
      })),
    [columnsData]
  );

  const data = useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Function to format the restaurant names
  const formatRestaurants = (restaurantList) => {
    if (!restaurantList || restaurantList.length === 0) return "";
    // Take the first three restaurants
    const truncatedList = restaurantList.slice(0, 3);
    // Join the first three restaurants with commas
    let formattedList = truncatedList.join(", ");
    // If there are more restaurants, add an ellipsis
    if (restaurantList.length > 3) {
      formattedList += " ...";
    }
    return formattedList;
  };

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      {headerColumnsTable && <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {headerColumnsTable.header}
        </div>
        <button
          onClick={headerColumnsTable?.onOpen}
          className={`flex items-center text-xl hover:cursor-pointer "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10" linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsPlusSquare className="h-6 w-6" />
        </button>
      </header>}
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        className="pt-[14px] pb-[20px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {/* Render edit and delete buttons in the ACTION column */}
                        {cell.column.Header === "ACTION" ? (
                          <div className="flex space-x-2">
                            <button onClick={() => handleView(row.original._id)}>
                              <FiEye className="text-brand-500" />
                            </button>
                            <button onClick={() => handleIsEdit(row.original)}>
                              <FiEdit className="text-brand-500" />
                            </button>
                            <button
                              onClick={() => handleDelete(row.original._id)}
                            >
                              <FaRegTrashAlt className="text-red-500" />
                            </button>
                          </div>
                        ) : cell.column.Header === "CONTEST" ? (
                          <p className="text-sm font-bold text-navy-700 dark:text-white break-all">
                          {formatRestaurants(cell.value)}
                          </p>
                        ) : cell.column.Header === "RATING" ? (
                            <div className="flex space-x-2">
                              {/* <p className="text-sm font-bold text-navy-700 dark:text-white break-all">{cell.value.rate}</p> */}
                              {/* {cell.render("Cell")} */}
                              {/* <FiStar className="text-brand-500" /> */}
                              {[...Array(parseInt(cell.value.rate))].map((e, i) => <FaStar className="text-brand-500" key={i} />)}
                            </div>
                        ) : (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.render("Cell")}
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span>
              Page{" "}
              <strong className="font-medium">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span className="ml-2">
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  nextPage(page);
                }}
                className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-blue-500"
              />
            </span>{" "}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`rounded-md bg-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-300 ${
                !canPreviousPage ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`rounded-md bg-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-300 ${
                !canNextPage ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Next
            </button>{" "}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ColumnsTable;
