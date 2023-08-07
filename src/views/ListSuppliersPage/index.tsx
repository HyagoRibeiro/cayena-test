import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table, { TableRow } from "../../components/Table";
import Menu from "../../components/Menu";
import suppliersService from "../../services/suppliersService";

function ListSuppliersPage() {
  const [listSuppliers, setListSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSuppliers = async () => {
    try {
      setLoading(true);
      const response = await suppliersService.getAll();
      setListSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "CNPJ", accessor: "cnpj" },
    { header: "Phone Number", accessor: "phoneNumber" },
    { header: "Owner", accessor: "ownerName" },
    { header: "Edit", accessor: "", isActionColumn: true },
  ];

  const handleRowClick = (rowData: TableRow) => {
    navigate(`/supplier-detail/${rowData.publicId}`);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <>
      <Menu />
      <div className={"list-suppliers-page"}>
        <h1>List of Suppliers Page</h1>
        <Table
          columns={columns}
          data={listSuppliers}
          onRowClick={handleRowClick}
          loading={loading}
        />
      </div>
    </>
  );
}

export default ListSuppliersPage;
