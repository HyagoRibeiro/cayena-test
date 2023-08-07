import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../Button";
import GenericInput from "../GenericInput";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import Menu from "../Menu";

function SupplierDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    phoneNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhoneNumber: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const { theme } = useTheme();

  const getSuppliers = async (supplierId: string) => {
    const { data } = await api.get(`/suppliers/${supplierId}`);
    setSupplierData(data.publicId);
    setFormData({
      name: data.name || "",
      cnpj: data.cnpj || "",
      phoneNumber: data.phoneNumber || "",
      ownerName: data.ownerName || "",
      ownerEmail: data.ownerEmail || "",
      ownerPhoneNumber: data.ownerPhoneNumber || "",
      address: data.address || "",
      number: data.number || "",
      complement: data.complement || "",
      neighborhood: data.neighborhood || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await api.put("https://test-case.cayena.io/suppliers", {
        publicId: supplierData || "",
        ...formData,
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  const backToList = () => () => {
    navigate("/list-suppliers");
  };

  useEffect(() => {
    getSuppliers(id || "");
  }, [id]);

  return (
    <>
      <Menu />
      <div className={`supplier-detail ${theme}-theme`}>
        <div onClick={backToList()} className="btn-back">
          {"< Voltar"}
        </div>
        <form className={`form ${theme}-theme`} onSubmit={handleSubmit}>
          <div className="supplier-detail__header">
            <h1>Supplier Details</h1>
            <Button type="submit" text="Submit" />
          </div>
          <div className="form__block">
            <div className="form__field">
              <GenericInput
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="name"
                label="Name"
                name="name"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="cnpj"
                name="cnpj"
                type="text"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="CNPJ"
                label="CNPJ"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                label="Phone Number"
              />
            </div>
          </div>

          <div className="form__block">
            <h2>Owner</h2>
            <div className="form__field">
              <GenericInput
                id="ownerName"
                name="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="Name"
                label="Name"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="ownerEmail"
                name="ownerEmail"
                type="text"
                value={formData.ownerEmail}
                onChange={handleInputChange}
                placeholder="Email"
                label="Email"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="ownerPhoneNumber"
                name="ownerPhoneNumber"
                type="text"
                value={formData.ownerPhoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                label="Phone Number"
              />
            </div>
          </div>

          <div className="form__block form__block--address">
            <h2>Address</h2>
            <div className="form__field form-block__address">
              <GenericInput
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                label="Address"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="number"
                name="number"
                type="text"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Number"
                label="Number"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="complement"
                name="complement"
                type="text"
                value={formData.complement}
                onChange={handleInputChange}
                placeholder="Complement"
                label="Complement"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="neighborhood"
                name="neighborhood"
                type="text"
                value={formData.neighborhood}
                onChange={handleInputChange}
                placeholder="Neighborhood"
                label="Neighborhood"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                label="City"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                label="State"
              />
            </div>
            <div className="form__field">
              <GenericInput
                id="zipCode"
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Zip Code"
                label="Zip Code"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SupplierDetailPage;
