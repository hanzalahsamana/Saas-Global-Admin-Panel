"use client";
import React from "react";
import Button from "../Actions/Button";

const Table = ({ columns = [], data = [], actions = [], renderers = {} }) => {
  return (
    <div className="w-full overflow-auto rounded-xl border border-(--borderC) bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-(--primaryC) text-xs font-semibold uppercase text-(--secondaryC)">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 whitespace-nowrap">
                {col}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-3 whitespace-nowrap">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => {
            const rowActions =
              typeof actions === "function" ? actions(row) : actions;
            return (
              <tr
                key={rowIdx}
                className={`${
                  rowIdx !== data.length - 1 && "border-b border-(--borderC)"
                }  cursor-pointer transition-all duration-500 hover:bg-(--backgroundC)`}
              >
                {columns.map((col, colIdx) => {
                  const value = row[col];
                  const Renderer = renderers[col];
                  return (
                    <td key={colIdx} className="px-4 py-3 whitespace-nowrap">
                      {Renderer ? <Renderer value={value} row={row} /> : value}
                    </td>
                  );
                })}
                {actions.length > 0 && (
                  <td className="px-4 py-3 flex gap-2 whitespace-nowrap">
                    {rowActions.map((action, aIdx) => {
                      return (
                        <Button
                          key={aIdx}
                          action={() => action.onClick(row)}
                          variant="outline"
                          className="!text-xs !py-2 !rounded-sm"
                          label={action.label}
                        />
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
        </tbody>
      </table>
    </div>
  );
};

export default Table;
