import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Table, { TableRow } from "../Table";
import { api } from "../../services/api";
import Menu from "../Menu";

function ListSuppliersPage() {
  const { theme } = useTheme();
  const [listSuppliers, setListSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSuppliers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/suppliers");
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
      <div className={`list-suppliers-page ${theme}-theme`}>
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
