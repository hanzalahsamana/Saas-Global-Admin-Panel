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
}) {
  const inputRef = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);
  useOutsideClick(inputRef, () => setIsInputActive(false));

  return (
    <div className="relative min-w-full md:min-w-min w-max" ref={inputRef}>
      <div className={`flex items-center h-[36px] gap-x-2 w-full`}>
        <input
          autoComplete="off"
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className={`bg-white h-[36px] px-4 w-[75%] outline-none focus:ring-1 focus:ring-accentC rounded md:w-[300px]  placeholder:text-liteTextC text-sm border border-borderC ${className}`}
          onClick={() => setIsInputActive(true)}
        />
        <div className="min-w-[25%] md:min-w-min h-full">
          {isAction && (
            <Button
              disabled={isDisabled}
              action={handleSubmit}
              className="h-full !w-full"
              label="Search"
              //   data-tooltip-target="tooltip-light"
              //   data-tooltip-style="light"
              //   data-tooltip-placement="top"
            />
          )}
          {/* {isDisabled && (
          <Tooltip dataTooltipTarget={"tooltip-light"}>{tooltipText}</Tooltip>
        )} */}
        </div>
      </div>
      {isInputActive && (
        <div className="absolute w-full top-12 z-10">
          <SearchSuggestions
            data={suggestData}
            loading={loading}
            setIsInputActive={setIsInputActive}
            setSearchValue={setSearchValue}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
