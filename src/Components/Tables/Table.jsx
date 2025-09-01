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
}) => {
  const formatHeading = (text) => {
    return text.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="grow">
      <div
        className={`w-full overflow-auto rounded-sm border border-borderC bg-white`}
      >
        <table className="min-w-full text-sm text-left ">
          <thead className="bg-primaryC text-xs font-semibold uppercase text-secondaryC">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 whitespace-nowrap">
                  {formatHeading(col)}
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
                      {columns.map((col, colIdx) => {
                        const value = row[col];
                        const Renderer = renderers[col];
                        return (
                          <td
                            key={colIdx}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            {Renderer ? (
                              <Renderer value={value} row={row} />
                            ) : value || value === 0 ? (
                              col === "createdAt" ||
                              col === "subsStart" ||
                              col === "subsEnd" ? (
                                value.split("T")[0]
                              ) : (
                                value
                              )
                            ) : (
                              "-"
                            )}
                          </td>
                        );
                      })}
                      {actions.length > 0 && (
                        <td className="px-4 py-2 flex gap-2 whitespace-nowrap">
                          {rowActions.map((action, aIdx) => {
                            // if (!action.label) return;
                            console.log("action", action);
                            return action ? (
                              <Button
                                key={aIdx}
                                action={() => action.onClick(row)}
                                variant="outline"
                                className="!text-xs !py-2 !rounded-sm"
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
                      colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
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
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
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
