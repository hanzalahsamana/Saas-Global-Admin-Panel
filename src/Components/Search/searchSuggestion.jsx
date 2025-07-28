import React from "react";
import Loader from "../Loader/loader";

function SearchSuggestions({
  loading,
  data,
  setSearchValue,
  setIsInputActive,
  handleSubmit,
  selectedData,
}) {
  return (
    <>
      <div
        className={`w-[100%] bg-[#FFFFFF] py-2 shadow-lite rounded-md border border-borderC`}
      >
        {loading ? (
          <div className="flex justify-center p-2">
            <Loader />
          </div>
        ) : data?.length === 0 ? (
          <div className="p-2 flex justify-center">
            <p>Data Not Found</p>
          </div>
        ) : (
          <div className="text-darkTextC text-sm font-medium max-h-[150px] px-2 overflow-auto custom-scrollbar">
            {data?.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer py-2 px-3 mb-1 text-textC rounded-md transition-all duration-300 ${
                  selectedData && selectedData?.includes(item)
                    ? "bg-hoverC border border-accentC"
                    : "border border-borderC hover:bg-backgroundC"
                }`}
                onClick={() => {
                  setSearchValue && !handleSubmit && setSearchValue(item);
                  setIsInputActive && !selectedData && setIsInputActive(false);
                  handleSubmit && handleSubmit(item);
                }}
              >
                <div className="flex gap-x-2">
                  <p className="font-bold m-0 text-sm">{index + 1}.</p>
                  <p className="m-0 text-sm whitespace-nowrap">{item}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchSuggestions;
