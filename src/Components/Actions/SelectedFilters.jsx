import { AiOutlineClose } from "react-icons/ai";

export default function SelectedFilters({
  selectedFilters = {},
  handleRemove,
  handleClearAll,
}) {
  if (Object.keys(selectedFilters)?.length === 0) return null;

  return (
    <div className="flex items-center h-10 justify-between bg-backgroundC px-4 py-2 rounded">
      <div className="flex items-center flex-wrap gap-4">
        <span className="font-semibold text-[16px] text-textTC border-r-2 border-borderC pr-4">
          Filters
        </span>
        {Object.keys(selectedFilters).map((filter, index) => {
          if (filter === "limit" || filter === "page") return null;
          const value = selectedFilters[filter];
          return (
            <div
              key={index}
              className="flex items-center gap-x-2 bg-white border border-borderC px-3 h-[28px] rounded-full"
            >
              <p className="text-black text-sm leading-tight capitalize">
                {value}
              </p>
              <AiOutlineClose
                size={10}
                className="text-red-400 cursor-pointer"
                onClick={() => handleRemove(filter)}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={handleClearAll}
        className="ml-4 text-sm text-accentC cursor-pointer hover:underline whitespace-nowrap"
      >
        Clear All
      </button>
    </div>
  );
}
