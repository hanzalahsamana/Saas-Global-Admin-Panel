"use client";
import React from "react";
import Button from "../Actions/Button";
import Loader from "../Loader/loader";

const Table = ({
  columns = [],
  data = [],
  actions = [],
  renderers = {},
  loading = false,
  isCheckbox = false,
  handleCheckbox,
  selectedData = [],
  handleCheckboxSelectAll,
}) => {
  const formatHeading = (text) => {
    return text.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="grow">
      <div
        className={`w-full overflow-auto custom-scrollbar  rounded-sm border border-borderC bg-white`}
      >
        <table className="min-w-full text-sm text-left ">
          <thead className="bg-primaryC text-xs font-semibold uppercase text-secondaryC">
            <tr>
              {isCheckbox && (
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    id="select-all"
                    type="checkbox"
                    className="text-primaryC bg-primaryC !border-red-500 focus:outline-none w-4 h-4 rounded-md"
                    onChange={(e) => handleCheckboxSelectAll(e)}
                    checked={
                      data.length > 0 &&
                      Array.isArray(selectedData) &&
                      data.every((item) =>
                        selectedData.some((sel) => sel._id === item._id)
                      )
                    }
                  />
                </td>
              )}
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 whitespace-nowrap">
                  {col?.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 whitespace-nowrap">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="">
            {!loading ? (
              <>
                {data.map((row, rowIdx) => {
                  const rowActions =
                    typeof actions === "function" ? actions(row) : actions;
                  return (
                    <tr
                      key={rowIdx}
                      className={`${
                        rowIdx !== data.length - 1 && "border-b border-borderC"
                      }  cursor-pointer transition-all duration-500 hover:bg-backgroundC text-textC `}
                    >
                      {isCheckbox && (
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            id="select-all"
                            type="checkbox"
                            className="text-hoverC bg-secondaryC border-borderC focus:outline-none w-4 h-4 rounded-md"
                            onChange={(e) => handleCheckbox(e, row)}
                            checked={
                              Array.isArray(selectedData) &&
                              selectedData.some((item) => item._id === row._id)
                            }
                          />
                        </td>
                      )}

                      {columns.map((col, colIdx) => {
                        const value = row[col?.key];
                        const Renderer = renderers[col?.key];

                        return (
                          <td
                            key={colIdx}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            {Renderer ? (
                              <Renderer value={value} row={row} />
                            ) : value || value === 0 ? (
                              col?.type === "date" ? (
                                value.split("T")[0]
                              ) : col?.type === "image" ? (
                                <img
                                  src={value}
                                  alt={col?.key}
                                  onClick={() => {
                                    window.open(value, "_blank");
                                  }}
                                  className="h-10 w-10 object-cover rounded-md border"
                                />
                              ) : (
                                <span title={value}>
                                  {String(value).length > 20
                                    ? String(value).slice(0, 20) + "..."
                                    : value}
                                </span>
                              )
                            ) : (
                              "-"
                            )}
                          </td>
                        );
                      })}

                      {actions.length > 0 && (
                        <td className="px-4 py-2 whitespace-nowrap">
                          {rowActions.map((action, aIdx) => {
                            return action ? (
                              <Button
                                key={aIdx}
                                action={() =>
                                  action.onClick({
                                    ...row,
                                    label: action?.label,
                                  })
                                }
                                variant="outline"
                                className="!text-xs !py-2 !rounded-sm !mr-2"
                                label={action.label}
                                disabled={action?.disabled}
                              />
                            ) : (
                              <p key={aIdx}>-</p>
                            );
                          })}
                        </td>
                      )}
                    </tr>
                  );
                })}
                {data.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length + (actions.length > 0 ? 3 : 0)}
                      className="text-center text-gray-400 py-6"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 3 : 0)}
                  className="text-center text-gray-400 py-6"
                >
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
