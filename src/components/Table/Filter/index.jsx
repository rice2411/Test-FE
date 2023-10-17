import React, { useEffect, useState } from "react";
import Select from "react-select";
import CategoryService from "../../../service/category";

const Filter = ({ isOpen, handleClose, category, setCategory }) => {
  const [data, setData] = useState([]);
  const [currentCate, setCurrentCate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = () => {
    setCategory(currentCate);
    handleClose();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await CategoryService.getAll();
      const { data } = response;
      if (data) {
        const formatedData = [];
        data.categories.map((item) => {
          if (item.category) {
            const newItem = {
              value: item.category,
              label: item.category,
            };
            formatedData.push(newItem);
          }
        });
        setData(formatedData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchData();
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          data-modal-backdrop="static"
          className="flex justify-center items-center backdrop-blur-sm fixed  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full  ">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b  rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filter by Category
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-6 space-y-6">
                <Select
                  defaultValue={category}
                  isClearable={true}
                  isLoading={isLoading}
                  name="colors"
                  options={data}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => {
                    setCurrentCate(e);
                  }}
                />
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    handleApply();
                  }}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Apply
                </button>
                <button
                  data-modal-hide="defaultModal"
                  onClick={() => {
                    handleClose();
                  }}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
