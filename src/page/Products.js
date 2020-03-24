import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      id_product: "",
      name: "",
      available_quality: "",
      price: "",
      description: "",
      images: null,
      action: "",
      find: "",
      message: ""
    };

    if (!localStorage.getItem("Token")) {
      window.location = "/login";
    }
  }

  bindImages = (e) => {
    this.setState({images: e.target.files[0]})
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Add = () => {
    // shows modal
    $("#modal_products").modal("show");
    // empties form data
    this.setState({
      action: "insert",
      id_product: "",
      name: "",
      available_quality: "",
      price: "",
      description: "",
      images: null
      });
  };

  Edit = item => {
    // shows modal
    $("#modal_products").modal("show");
    // fills in form data
    this.setState({
      action: "update",
      id_product: item.id_product,
      name: item.name,
      available_quality: item.available_quality,
      price: item.price,
      description: item.description,
      images: item.images
    });
  };

  get_products = () => {
    $("#loading").toast("show");
    let url = "http://localhost/toko_online/public/products";
    axios
      .get(url)
      .then(response => {
        this.setState({ products: response.data.products });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  };

  Drop = id_product => {
    if (window.confirm("Are you sure you want to drop this data?")) {
      $("#loading").toast("show");
      let url = "http://localhost/toko_online/public/products/drop/" + id_product;
      axios
        .delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.get_products();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount = () => {
    this.get_products();
  };

  Save = event => {
    event.preventDefault();
    // shows loading process
    $("#loading").toast("show");
    // closes modal form
    $("#modal_products").modal("hide");
    let url = "http://localhost/toko_online/public/products/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id_product);
    form.append("name", this.state.name);
    form.append("available_quality", this.state.available_quality);
    form.append("price", this.state.price);
    form.append("description", this.state.description);
    form.append("images", this.state.images, this.state.images.name);
    
    axios
      .post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_products();
      })
      .catch(error => {
        console.log(error);
      });
  };

  search = event => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost/toko_online/public/products";
      let form = new FormData();
      form.append("find", this.state.find);
      axios
        .post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ products: response.data.products });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card mt-2">
          {/* card header */}
          <div className="card-header bg-dark">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data Products</h4>
              </div>

              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="find"
                  onChange={this.bind}
                  value={this.state.find}
                  onKeyUp={this.search}
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          {/* card content */}
          <div className="card-body">
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            <Toast id="loading" autohide="false" title="Informasi">
              <span className="fa fa-spin fa-spinner"></span> Loading
            </Toast>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Available Quality</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Images</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(item => {
                  return (
                    <tr key={item.id_product}>
                      <td>{item.id_product}</td>
                      <td>{item.name}</td>
                      <td>{item.available_quality}</td>
                      <td>Rp. {item.price}</td>
                      <td>{item.description}</td>
                      <td><img src={'http://localhost/toko_online/public/images/' + item.images}
                          alt={item.images} width="200px" height="200px"/></td>
                      <td>
                        <button
                          className="m-1 btn btn-sm btn-info"
                          onClick={() => this.Edit(item)}
                        >
                          <span className="fa fa-pencil"> EDIT</span>
                        </button>
                        <button
                          className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id)}
                        >
                          <span className="fa fa-ban"> DELETE</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* add button */}
            <button className="btn btn-success my-2" onClick={this.Add}>
              <span className="fa fa-plus-circle"></span> Tambah Data
            </button>

            {/* user modal form */}
            <Modal
              id="modal_products"
              title="Form Products"
              bg_header="success"
              text-header="white"
            >
              <form onSubmit={this.Save}>
                Id
                <input
                  type="text"
                  className="form-control"
                  name="id_product"
                  value={this.state.id_product}
                  onChange={this.bind}
                  required
                />
                Name
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.bind}
                  required
                />
                Available Quality
                <input
                  type="text"
                  className="form-control"
                  name="available_quality"
                  value={this.state.available_quality}
                  onChange={this.bind}
                  required
                />
                Price
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={this.state.price}
                  onChange={this.bind}
                  required
                />
                Description
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.bind}
                  required
                />
                Images
                <input
                  type="file"
                  className="form-control"
                  name="images"
                  onChange={this.bindImages}
                  required
                />
                <button className="btn btn-info pull-right m-2">
                  <span className="fa fa-check"></span> Simpan
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;

