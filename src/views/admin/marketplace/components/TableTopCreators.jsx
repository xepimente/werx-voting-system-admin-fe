import Card from "components/card";
import Progress from "components/progress";
import React, { useMemo } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit, FiEye } from "react-icons/fi";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TopCreatorTable(props) {
  const { columnsData, tableData, headerText, buttonText, buttonClick, dataClick, voteClick, onDeleteClick } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  return (
    <Card extra={"h-[600px] w-full"}>
      {/* Top Creator Header */}
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 py-2 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          {headerText}
        </h4>
        {buttonText ? (<button 
        onClick={buttonClick ? buttonClick : null}
        className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          {buttonText}
        </button>) : null}
      </div>

      {/* Top Creator Heading */}
      <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full min-w-[500px] overflow-x-scroll"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                  >
                    <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="px-4">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Name") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className="h-[30px] w-[30px] rounded-full">
                            <img
                              src={cell.value[1]}
                              className="h-full w-full rounded-full"
                              alt=""
                            />
                          </div>
                          <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {cell.value[0]}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "NAME" || cell.column.Header === "CONTEST") {
                        data = (
                          <div className="flex items-center gap-2">
                            <div className="h-[30px] w-[30px] rounded-full">
                              <img
                                src={cell.column.Header === "NAME" ? row.original.images[0] : row.original.contestImage}
                                className="h-full w-full rounded-full"
                                alt=""
                              />
                            </div>
                            {dataClick ? (
                              <button 
                                onClick={() => dataClick(row.original)}
                                className="text-sm font-medium text-navy-700 dark:text-white"
                              >
                                {cell.value}
                              </button>
                            ) : (
                              <p className="text-sm font-medium text-navy-700 dark:text-white">
                                {cell.value}
                              </p>
                            )}
                          </div>
                        );
                    } else if (cell.column.Header === "VOTES") {
                        data = (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => voteClick(row.original._id)}
                              className="text-sm font-medium text-navy-700 dark:text-white"
                            >
                              {cell.value} votes
                            </button>
                          </div>
                        );
                    } else if (cell.column.Header === "POSITION") {
                      data = cell.value === "1st" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-[40px] w-[40px] rounded-full">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/179/179249.png"
                              className="h-full w-full rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      ) : cell.value === "2nd" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-[40px] w-[40px] rounded-full">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/179/179251.png"
                              className="h-full w-full rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      ) : cell.value === "3rd" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-[40px] w-[40px] rounded-full">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/179/179250.png"
                              className="h-full w-full rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 ml-2">
                          <p className="text-md font-medium text-gray-600 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Artworks") {
                      data = (
                        <p className="text-md font-medium text-gray-600 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "Rating") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className="h-[40px] w-[40px] rounded-full">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/179/179249.png"
                              className="h-full w-full rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    } else if (cell.column.Header === "Action") {
                      data = (
                        <div className="flex items-center gap-2">
                          <button>
                              <FiEye className="text-brand-500" />
                            </button>
                            <button>
                              <FiEdit className="text-brand-500" />
                            </button>
                            <button>
                              <FaRegTrashAlt className="text-red-500" />
                            </button>
                        </div>
                      );
                    } else if (cell.column.Header === "ACTION") {
                      data = (
                        <div className="flex items-center gap-2">
                          <button className="ml-4" onClick={() => onDeleteClick(row.original)}>
                            <FaRegTrashAlt className="text-red-500" />
                          </button>
                        </div>
                      );
                    } else {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <td
                        className="py-3 text-sm"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default TopCreatorTable;
