import React from "react";
import Loader from "../Loader/Loader";

function SearchSuggestions({
  loading,
  data,
  setSearchValue,
  setIsInputActive,
}) {
  return (
    <>
      <div
        className={`w-[100%] bg-[#FFFFFF] py-2 shadow-lite rounded-lg border-b border-r border-l border-t border-(--borderC)`}
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
          <div className="text-darkTextC text-sm font-medium max-h-[150px] overflow-auto no-scrollbar">
            {data?.map((item, index) => (
              <div
                key={index}
                className=" cursor-pointer hover:bg-(--backgroundC) py-2 px-3  border-b border-(--borderC)"
                onClick={() => {
                  setSearchValue && setSearchValue(item);
                  setIsInputActive && setIsInputActive(false);
                }}
              >
                <div className="flex gap-x-2">
                  <p className="font-bold m-0 text-xs">{index + 1}.</p>
                  <p className="m-0 text-xs whitespace-nowrap">{item}</p>
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
