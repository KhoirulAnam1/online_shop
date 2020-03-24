import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            id_order: "",
            id_user: "",
            id_pengiriman: 0,
            total: "",
            bukti_bayar: null,
            status: "dipesan",
        }
        //jika tidak terdapat data token pada lokal storage
         if(!localStorage.getItem("Token")){
            // direct ke halaman login
           window.location = "/login";
       }
    }
    Accept = (item) => {
        this.setState({
            action: "update",
            status: item.status
        });
    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data

    get_orders= () => {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/orders";
        axios.get(url)
        .then(response => {
            this.setState({orders: response.data.order});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/eproduk/public/products/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_products();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_orders();

    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_products").modal("hide");
        let url = "http://localhost/eproduk/public/products/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("stock", this.state.stock);
        form.append("price",this.state.price);
        form.append("description", this.state.description);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_products();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/eproduk/public/products";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({products: response.data.products});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render() {
        return (
          <div className="container">
              <div className="card mt-2">
                  {/* header card */}
                  <div className="card-header bg-danger">
                      <div className="row">
                          <div className="col-sm-8">
                              <h4 className="text-white">Data Order</h4>
                          </div>

                      </div>

                  </div>
                  {/* content card */}
                  <div className="card-body">
                      <Toast id="message" autohide="true" title="Informasi">
                          {this.state.message}
                      </Toast>
                      <Toast id="loading" autohide="false" title="Informasi">
                          <span className="fa fa-spin faspinner"></span> Sedang Memuat
      </Toast>
                      <table className="table">
                          <thead>
                              <tr>
                                  <th>ID Alamat</th>
                                  <th>ID User</th>
                                  <th>Total</th>
                                  <th>Bukti</th>
                                  <th>Status</th>
                                  <th>Opsi</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.orders.map((item,index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{item.id_user}</td>
                                          <td>{item.id_pengiriman}</td>
                                          <td>{item.total}</td>
                                          <td>{item.bukti_bayar}</td>
                                          <td>{item.status}</td>
                                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Accept(item)}>
                                            <span>Tolak</span>
                                          </button>
                                          <button className="m-1 btn btn-sm btn-danger"
                                              onClick={() => this.Drop(item.id)}>
                                              <span>Terima</span>
                                          </button>
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>

                      {/* tombol tambah */}



                      {/* form modal siswa*/}

                  </div>
              </div>


          </div>


   );
 }
}
export default Orders