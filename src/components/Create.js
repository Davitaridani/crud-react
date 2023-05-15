import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { urlApi } from "../utils/api";

const Create = () => {
  const [nama, setNama] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [hargaBeli, setHargaBeli] = useState("");
  const [stok, setStok] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const bodyFormData = { nama, hargaJual, hargaBeli, stok };

    axios
      .post(`${urlApi}products`, JSON.stringify(bodyFormData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8" className="form-add">
          <h3>Add Data</h3>
          <form onSubmit={handleInputChange}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                placeholder="Nama Product"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="jual" className="form-label">
                Harga Jual
              </label>
              <input
                type="number"
                className="form-control"
                id="jual"
                required
                placeholder="Harga Jual"
                value={hargaJual}
                onChange={(e) => setHargaJual(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="beli" className="form-label">
                Harga Beli
              </label>
              <input
                type="number"
                className="form-control"
                id="beli"
                placeholder="Harga Beli"
                required
                value={hargaBeli}
                onChange={(e) => setHargaBeli(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stok" className="form-label">
                Stok
              </label>
              <input
                type="number"
                className="form-control"
                id="stok"
                placeholder="Stok"
                required
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>

            <div className="items-btn d-flex gap-2">
              <button type="submit" className="btn btn-sm text-white">
                Save
              </button>
              <Link to="/" className="btn btn-sm text-white">
                Back
              </Link>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
