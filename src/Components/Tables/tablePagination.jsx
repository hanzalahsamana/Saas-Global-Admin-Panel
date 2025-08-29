import Button from "../Actions/Button";
import { VscChevronRight } from "react-icons/vsc";
import { VscChevronLeft } from "react-icons/vsc";

const TablePagination = ({
  currentPage,
  setCurrentPage,
  classes,
  loading,
  data,
  dataLimit,
  setDataLimit,
  handleSubmit,
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isDisabledPrevious = currentPage <= 1;
  const totalPages = data?.pagination?.totalPages;
  const isDisabledNext = currentPage >= totalPages;

  const getPaginationItems = () => {
    const pages = [];
    const siblings = 2;
    const showLeftDots = currentPage > siblings + 2;
    const showRightDots = currentPage < totalPages - (siblings + 1);

    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (totalPages <= 10) {
      return range(1, totalPages);
    }

    if (!showLeftDots && showRightDots) {
      return [...range(1, 3 + siblings), "...", totalPages];
    } else if (showLeftDots && !showRightDots) {
      return [1, "...", ...range(totalPages - (2 + siblings), totalPages)];
    } else if (showLeftDots && showRightDots) {
      return [
        1,
        "...",
        ...range(currentPage - siblings, currentPage + siblings),
        "...",
        totalPages,
      ];
    }
  };

  const paginationItems = getPaginationItems();

  const handleDataLimit = (value) => {
    if (!value) {
      setDataLimit("");
      return;
    }
    if (Number(value) >= 1 && value) {
      setDataLimit(value);
    } else {
      return;
    }
  };

  return (
    <>
      {!loading && data?.data?.length > 0 && (
        <div className="w-full py-1 px-2 mt-4 md:mt-6 flex items-center  md:items-end flex-col-reverse gap-y-2 md:gap-y-0 md:flex-row">
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 text-[16px] text-darkTextC">
              {/* <span className="">Set Limit:</span> */}
              <span className="">Showing</span>
              <span>{`${data?.pagination?.skip + 1} - ${
                data?.pagination?.limit
              }`}</span>
              <span>{`out of ${data?.pagination?.total || 0}`}</span>
              <input
                min={1}
                type="number"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                    return;
                  } else {
                    return;
                  }
                }}
                value={dataLimit ?? ""}
                onChange={(e) => handleDataLimit(e.target.value)}
                className="w-14 h-[32px] text-center border focus:border-accentC border-gray-300 rounded-md focus:outline-none bg-white input-no-spinner"
              />
            </div>
          </div>

          <div className={`${classes} flex-1 flex justify-center`}>
            {totalPages > 0 && (
              <ol className="flex gap-1 text-xs font-medium m-0">
                {/* Prev Button */}
                <li>
                  <Button
                    action={() =>
                      !isDisabledPrevious && handlePageChange(currentPage - 1)
                    }
                    disabled={isDisabledPrevious}
                    label={<VscChevronLeft />}
                    className="!p-0 !size-8"
                  />
                </li>

                {/* Page Items */}
                {paginationItems?.map((item, index) =>
                  item === "..." ? (
                    <li
                      key={`dots-${index}`}
                      className="size-8 flex items-center justify-center text-gray-400"
                    >
                      ...
                    </li>
                  ) : (
                    <li key={item}>
                      <p
                        onClick={() => handlePageChange(item)}
                        className={`${
                          currentPage === item
                            ? "bg-primaryC text-white"
                            : "bg-white text-darkTextC"
                        } cursor-pointer size-8 rounded border border-borderC flex justify-center items-center`}
                      >
                        {item}
                      </p>
                    </li>
                  )
                )}

                {/* Next Button */}
                <li>
                  <Button
                    action={() =>
                      !isDisabledNext && handlePageChange(currentPage + 1)
                    }
                    disabled={isDisabledNext}
                    label={<VscChevronRight />}
                    className="!p-0 !size-8"
                  />
                </li>
              </ol>
            )}
          </div>

          <div className="flex-1" />
        </div>
      )}
    </>
  );
};

export default TablePagination;
