import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { urlApi } from "../utils/api";
import { BsTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { BiPlus, BiSearchAlt2 } from "react-icons/bi";

const Table = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 5;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = search.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(search.length / recordsPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const getAllProducts = async () => {
    await axios
      .get(`${urlApi}products`)
      .then((res) => {
        setProducts(res.data);
        setSearch(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  // const handleRemove = async (id) => {
  //   await axios
  //     .delete(`http://localhost:3002/products/${id}`)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setProducts(
  //           records.filter((item) => {
  //             return item.id !== id;
  //           })
  //         );
  //       } else {
  //         return;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure ?")) {
      axios
        .delete(`http://localhost:3002/products/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setProducts(
              records.filter((item) => {
                return item.id !== id;
              })
            );
          }
          alert("success");
          window.location.reload();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(
      products.filter((item) =>
        item.nama.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getAllProducts();
  }, []);

  if (isLoading) return <h3 className="text-loading">Loading...</h3>;
  else if (records && !isError)
    return (
      <Container>
        <Row className="justify-content-center align-items-center ">
          <Col md="10" className="items-table">
            <div className="d-flex justify-content-between mb-2">
              <Link
                to="/create"
                className=" btn-sm btn btn-add d-flex align-items-center"
              >
                <span>
                  <BiPlus />
                </span>
                Add
              </Link>

              <div class="input-group w-25">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  aria-label="Input group example"
                  aria-describedby="btnGroupAddon"
                  onChange={handleSearch}
                />
                <div class="input-group-text">
                  <BiSearchAlt2 />
                </div>
              </div>
            </div>
            <table className="table table-bordered table-striped table-responsive">
              <thead className="text-white">
                <tr>
                  <td className="text-center">No</td>
                  <td>Foto</td>
                  <td>Nama Produk</td>
                  <td className="text-end">Harga Jual</td>
                  <td className="text-end">Harga Beli</td>
                  <td className="text-center">Stok</td>
                  <td className="text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {records &&
                  records.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        {/* <img
                          src={imgProduct}
                          alt="product"
                          className="img-fluid"
                        /> */}
                        Foto
                      </td>
                      <td>{item.nama}</td>
                      <td className="text-end">Rp. {item.hargaJual}</td>
                      <td className="text-end">Rp. {item.hargaBeli}</td>
                      <td className="text-center">{item.stok}</td>
                      <td className="d-flex justify-content-center align-items-center gap-2 item-btns">
                        <Link
                          to={`/update/${item.id}`}
                          className="btn btn-sm btn-update"
                        >
                          <BsPencilSquare />
                        </Link>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="btn-sm btn "
                        >
                          <BsTrash3Fill />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <a className="page-link btn-prev" onClick={prevPage}>
                    Prev
                  </a>
                </li>
                {numbers.map((item, index) => (
                  <li
                    className={`page-item ${
                      currentPage === item ? `active` : ""
                    }`}
                    key={index}
                  >
                    <a
                      className="page-link"
                      onClick={() => changeCurrentPage(item)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    );
  else {
    return <h1>Something Went Wrong</h1>;
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default Table;
