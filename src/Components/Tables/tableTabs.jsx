import React from "react";

export function TableTabs({ tabs, activeTab, setActiveTab, activeTabLength }) {
  return (
    <div className="flex items-center gap-x-4 px-4">
      {tabs.map((item, index) => {
        return (
          <div
            key={index}
            className={`cursor-pointer py-2 px-4 flex items-center gap-2  ${
              activeTab === item?.value
                ? "text-darkTextC border-b-2  border-primaryC"
                : "text-darktextC"
            }`}
            onClick={() => setActiveTab(item?.value)}
          >
            <p key={index}>{item?.label}</p>
            <p className="w-[18px] h-[18px] flex justify-center items-center  text-xs rounded-full bg-backgroundC m-0">
              {activeTabLength[item?.value] ? activeTabLength[item?.value] : 0}
            </p>
          </div>
        );
      })}
    </div>
  );
}
