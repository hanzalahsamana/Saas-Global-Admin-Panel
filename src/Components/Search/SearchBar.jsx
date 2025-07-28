import useOutsideClick from "@/Utils/hooks/useOutSideClick";
import React, { useRef, useState } from "react";
import Button from "../Actions/Button";
import SearchSuggestions from "./searchSuggestion";

function SearchBar({
  handleSearch,
  searchValue = "",
  isDisabled,
  handleSubmit,
  tooltipText,
  placeholder,
  isAction = true,
  suggestData = [],
  loading = false,
  setSearchValue,
  className = "",
  selectedData,
}) {
  const inputRef = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);
  useOutsideClick(inputRef, () => setIsInputActive(false));

  return (
    <div className="relative min-w-full md:min-w-min" ref={inputRef}>
      <div className={`flex items-center gap-x-2 w-full`}>
        <input
          autoComplete="off"
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className={`bg-white h-[36px] px-4 w-[75%] placeholder:text-sm outline-none focus:ring-1 focus:ring-accentC rounded md:w-[300px]  placeholder:text-liteTextC text-sm border border-borderC ${className}`}
          onClick={() => setIsInputActive(true)}
        />
        {isAction && (
          <div className="min-w-[25%] md:min-w-min h-full">
            <Button
              disabled={isDisabled}
              action={handleSubmit}
              className="h-full !w-full"
              label="Search"
            />
          </div>
        )}
      </div>
      {isInputActive && (
        <div className="absolute w-full top-12 z-10">
          <SearchSuggestions
            data={suggestData}
            loading={loading}
            setIsInputActive={setIsInputActive}
            setSearchValue={setSearchValue}
            handleSubmit={!isAction ? handleSubmit : null}
            selectedData={selectedData}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
