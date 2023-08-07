import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Table from './index';

test('deve renderizar a tabela corretamente', () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'name' },
    { header: 'Idade', accessor: 'age' },
  ];

  const data = [
    { id: 1, name: 'João', age: 30 },
    { id: 2, name: 'Maria', age: 25 },
  ];

  const { getByText } = render(<Table columns={columns} data={data} />);

  columns.forEach((column) => {
    const headerElement = getByText(column.header);
    expect(headerElement).toBeInTheDocument();
  });

  data.forEach((row) => {
    Object.values(row).forEach((value) => {
      const cellElement = getByText(String(value));
      expect(cellElement).toBeInTheDocument();
    });
  });
});

test('deve chamar a função onRowClick quando uma linha da tabela é clicada', () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Idade', accessor: 'age' },
    { header: 'Action', accessor: 'action', isActionColumn: true },
  ];

  const data = [
    { id: 1, name: 'João', age: 30 },
    { id: 2, name: 'Maria', age: 25 },
  ];

  const mockOnRowClick = jest.fn();

  const { getAllByText } = render(
    <Table columns={columns} data={data} onRowClick={mockOnRowClick} />
  );

  const editButton = getAllByText('Edit');
  fireEvent.click(editButton[0]);

  expect(mockOnRowClick).toHaveBeenCalledWith(data[0]);
});
