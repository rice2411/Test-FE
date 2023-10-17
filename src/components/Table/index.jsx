import { useEffect, useRef, useState } from "react";

import Pagination from "../../shared/small_components/table/pagination";
import { PAGINATE } from "../../constant";
import Filter from "./Filter";

export default function Table({
  data,
  isLoading,
  setIsLoading,
  fetchData,
  params,
  pagination,
  category,
  setCategory,
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const menuRef = useRef(null);

  const handleOpenMenu = () => {
    setIsOpenMenu((prevState) => !prevState);
  };
  const handleOpenFilterModal = () => {
    setIsOpenMenu(false);
    setIsOpenFilter(true);
  };
  const handleCloseFilterModal = () => {
    setIsOpenFilter(false);
  };
  const handleCloseMenu = (e) => {
    if (menuRef.current && isOpenMenu && !menuRef.current.contains(e.target)) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseMenu);
  }, []);
  return (
    <>
      <div>
        <button
          onClick={() => {
            handleOpenMenu();
          }}
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className={`${
            category?.value ? "border-green-500" : " dark:border-gray-600"
          } inline-flex items-center text-gray-500 bg-white border  focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:border-gray-600 `}
          type="button"
        >
          <span className="sr-only">Action button</span>
          Action
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {/* Dropdown menu */}
        {isOpenMenu && (
          <div
            ref={menuRef}
            id="dropdownAction"
            className="z-50 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <div
                  onClick={() => {
                    handleOpenFilterModal();
                  }}
                  className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Filter
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative"></div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4" colSpan={5}>
                    ...Loading
                  </td>
                </tr>
              </>
            ) : (
              <>
                {data.length ? (
                  data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        {PAGINATE.limit * (pagination?.page - 1) + index + 1}
                      </td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`https://picsum.photos/40/40?random=${
                            index + 1
                          }`}
                          alt="Jese image"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {item.name}
                          </div>
                          <div className="font-normal text-gray-500">
                            Make by minhrice.dev@gmail.com
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        {item.category || "Category"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                          Available
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline ">
                          Devolopment...
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4" colSpan={5}>
                      No data
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-3">
        {pagination?.totalPages > 1 && !isLoading && (
          <Pagination
            fetchData={fetchData}
            paginate={pagination}
            setIsLoading={setIsLoading}
            params={params}
          />
        )}
      </div>
      <Filter
        isOpen={isOpenFilter}
        handleClose={handleCloseFilterModal}
        setCategory={setCategory}
        category={category}
      />
    </>
  );
}
