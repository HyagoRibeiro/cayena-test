import React from 'react';
import Button from '../Button';
import TableSkeleton from '../TableSkeleton';

interface TableColumn {
  header: string;
  accessor: string;
  isActionColumn?: boolean;
}

export interface TableRow {
  [key: string]: string | number;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  onRowClick?: (rowData: TableRow) => void;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, onRowClick, loading }) => {

  const handleRowClick = (rowData: TableRow) => () => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  if(loading) {
    return <TableSkeleton />
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}
           onClick={handleRowClick(row)}
           >
            {columns.map((column) => (
              <td key={column.accessor}>
                {column.isActionColumn ? (
                    <Button onClick={handleRowClick(row)}>Edit</Button>
                ) : (
                    row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
