import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Lapangan extends Component {
  constructor() {
    super();
    this.state = {
      lapangan: [],
      id: "",
      nama: "",
      harga: "",
      gambar: null,
      action: "",
      find: "",
      message: ""
    };

    if (!localStorage.getItem("Token")) {
      window.location = "/login";
    }
  }

  bindGambar = (e) => {
    this.setState({gambar: e.target.files[0]})
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Add = () => {
    // shows modal
    $("#modal_lapangan").modal("show");
    // empties form data
    this.setState({
      action: "insert",
      id: "",
      nama: "",
      harga: "",
      gambar: null
      });
  };

  Edit = item => {
    // shows modal
    $("#modal_lapangan").modal("show");
    // fills in form data
    this.setState({
      action: "update",
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      gambar: item.gambar
    });
  };

  get_lapangan = () => {
    $("#loading").toast("show");
    let url = "http://localhost/lapangan/public/lapangan";
    axios
      .get(url)
      .then(response => {
        this.setState({ lapangan: response.data.lapangan });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  };

  Drop = id => {
    if (window.confirm("Are you sure you want to drop this data?")) {
      $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/lapangan/drop/" + id;
      axios
        .delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.get_lapangan();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount = () => {
    this.get_lapangan();
  };

  Save = event => {
    event.preventDefault();
    // shows loading process
    $("#loading").toast("show");
    // closes modal form
    $("#modal_lapangan").modal("hide");
    let url = "http://localhost/lapangan/public/lapangan/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("nama", this.state.nama);
    form.append("harga", this.state.harga);
    form.append("gambar", this.state.gambar);
    
    axios
      .post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_lapangan();
      })
      .catch(error => {
        console.log(error);
      });
  };

  search = event => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/lapangan/find";
      let form = new FormData();
      form.append("find", this.state.find);
      axios
        .post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ lapangan: response.data.lapangan });
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
                <h4 className="text-white"></h4>
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
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Gambar</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {this.state.lapangan.map(item => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.nama}</td>
                      <td>Rp. {item.harga}</td>
                      <td><img src={'http://localhost/lapangan/public/images/' + item.gambar}
                          alt={item.gambar} width="200px" height="200px"/></td>
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
              id="modal_lapangan"
              title="Form Lapangan"
              bg_header="success"
              text-header="white"
            >
              <form onSubmit={this.Save}>
                Nama
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  value={this.state.nama}
                  onChange={this.bind}
                  required
                />
                Harga
                <input
                  type="text"
                  className="form-control"
                  name="harga"
                  value={this.state.harga}
                  onChange={this.bind}
                  required
                />
                Gambar
                <input
                  type="file"
                  className="form-control"
                  name="gambar"
                  onChange={this.bindGambar}
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

export default Lapangan;

