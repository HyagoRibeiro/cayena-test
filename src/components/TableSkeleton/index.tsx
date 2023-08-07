import React from "react";

const TableSkeleton: React.FC = () => {
  const numberOfLines = Array.from(Array(10).keys());
  return (
    <div className="table-skeleton">
      {numberOfLines.map((item) => {
        return (
          <div key={item} className="table-skeleton__row" />
        );
      })}
    </div>
  );
};

export default TableSkeleton;
