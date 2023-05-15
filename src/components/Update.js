import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    nama: "",
    hargaJual: "",
    hargaBeli: "",
    stok: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/products/${id}`)
      .then((res) => {
        setValues({
          ...values,
          nama: res.data.nama,
          hargaJual: res.data.hargaJual,
          hargaBeli: res.data.hargaBeli,
          stok: res.data.stok,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFormUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3002/products/${id}`, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8" className="form-update">
          <h3 className="mb-3">Update Data</h3>
          <form onSubmit={handleFormUpdate}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Id
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                disabled
                value={values.id}
                onChange={(e) => setValues({ ...values, id: e.target.value })}
                placeholder="Nama Product"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={values.nama}
                onChange={(e) => setValues({ ...values, nama: e.target.value })}
                placeholder="Nama Product"
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
                value={values.hargaJual}
                onChange={(e) =>
                  setValues({ ...values, hargaJual: e.target.value })
                }
                placeholder="Harga Jual"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="beli" className="form-label">
                Harga Beli
              </label>
              <input
                type="number"
                className="form-control"
                value={values.hargaBeli}
                onChange={(e) =>
                  setValues({ ...values, hargaBeli: e.target.value })
                }
                placeholder="Harga Beli"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stok" className="form-label">
                Stok
              </label>
              <input
                type="number"
                className="form-control"
                value={values.stok}
                onChange={(e) => setValues({ ...values, stok: e.target.value })}
                placeholder="Harga Beli"
                required
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

export default Update;
