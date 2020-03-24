import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from 'react-router-dom';
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import hantu from '../image/hantu.jpg';
class Profil extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            alamat: [],
            id_pengiriman: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
            id_user: "",
            nama_user: "",
            email: "",
            password: "",
            role: "",
            no_ktp: "",
            nama_lengkap: "",
            jenis_kelamin: "",
            tanggal_lahir: "",
            no_hp: "",
            action: "",
            find: "",
            message: ""
        }
        if (!localStorage.getItem("Token")) {
            window.location = "/login";
          }
    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    
    Edit = (item) => {
        // membuka modal
        $("#modal_user").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_user: item.id_user,
            nama_user: item.nama_user,
            nama_lengkap: item.nama_lengkap,
            no_ktp: item.no_ktp,
            jenis_kelamin: item.jenis_kelamin,
            tanggal_lahir: item.tanggal_lahir,
            no_hp: item.no_hp
        });
    }

    Edit_alamat = (item) => {
        // membuka modal
        $("#modal_alamat").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id_pengiriman: item.id_pengiriman,
            id_user: item.id_user,
            nama_penerima: item.nama_penerima,
            kode_pos: item.kode_pos,
            kecamatan: item.kecamatan,
            kota: item.kota,
            jalan: item.jalan,
            rt: item.rt,
            rw: item.rw,
        });
    }

    Add_alamat = () => {
        $("#modal_alamat").modal("show");

        this.setState({
            action: "insert",
            id_pengiriman: "",
            id_user: "",
            nama_penerima: "",
            kode_pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
        });
    }

    get_user = () => {
        let id_user = JSON.parse(localStorage.getItem('id_user'))
        let url = "http://localhost/toko_online/public/user/"+id_user;
        axios.get(url)
        .then(response => {
            this.setState({
                user: response.data.user,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    get_alamat = () => {
        let id = JSON.parse(localStorage.getItem('id_user'))
        let url = "http://localhost/toko_online/public/alamat/"+id;
        axios.get(url)
        .then(response => {
            this.setState({
                alamat: response.data.alamat,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    componentDidMount = () => {
        this.get_user();
        this.get_alamat();
    }

    Save = (event) => {
        console.log(this.state.id_user)
        event.preventDefault();
        $("#modal_user").modal("hide");
        let url = "http://localhost/toko_online/public/user/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        form.append("nama_user", this.state.nama_user);
        form.append("nama_lengkap", this.state.nama_lengkap);
        form.append("no_ktp", this.state.no_ktp);
        form.append("jenis_kelamin", this.state.jenis_kelamin);
        form.append("tanggal_lahir", this.state.tanggal_lahir);
        form.append("no_hp", this.state.no_hp);
        axios.post(url, form)
        .then(response => {
            this.setState({
                message: response.data.message});
            $("#message").toast("show");
            this.get_user();
        })
        .catch(error => {
            console.log(error);
        });
    }

    Save_alamat = (event) => {
        let id = JSON.parse(localStorage.getItem('id_user'))
        event.preventDefault();
        $("#modal_alamat").modal("hide");
        let url = "http://localhost/toko_online/public/alamat/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_pengiriman", this.state.id_pengiriman);
        form.append("id_user", this.state.id_user);
        form.append("nama_penerima", this.state.nama_penerima);
        form.append("kode_pos", this.state.kode_pos);
        form.append("kecamatan", this.state.kecamatan);
        form.append("kota", this.state.kota);
        form.append("jalan", this.state.jalan);
        form.append("rt", this.state.rt);
        form.append("rw", this.state.rw);
        axios.post(url, form)
        .then(response => {
            this.setState({
                message: response.data.message});
            $("#message").toast("show");
            this.get_alamat();
        })
        .catch(error => {
            console.log(error);
        });
    }

    Drop_alamat = (id_pengiriman) => {
        if (window.confirm("Are you sure you want to drop this data?")) {
          $("#loading").toast("show");
          let url = "http://localhost/toko_online/public/alamat/drop/" + id_pengiriman;
          axios
            .delete(url)
            .then(response => {
              $("#loading").toast("hide");
              this.setState({ message: response.data.message });
              $("#message").toast("show");
              this.get_alamat();
            })
            .catch(error => {
              console.log(error);
            });
        }
      };

    render(){
        const { user, alamat } = this.state;
        console.log(user)
        console.log(alamat)
        return (
            <div className="container">
            <div className="card mt-2">
                <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                    <div className="#" style={{ maxWidth: "1000px" }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img className="rounded float-left" src={hantu} style={{ height: "240px", width: "350px"}} />
                                    <input aria-hidden="true" type="file" className="fa fa-upload" name="image"
                                        onChange={this.bindImage} required />
                            </div>
                            <div style={{ paddingTop: "2%" , paddingLeft: "0%" }}>
                            <div className="card-body">
                                <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                                <table className="table table-borderless">
                                    {user.map((item,index) => {
                                        return (
                                            <ul class="list-group" key={index}>
                                                <li class="list-group-item">Username : {item.nama_user}</li>
                                                <li class="list-group-item">Email : {item.email}</li>
                                                <li class="list-group-item">Nama Lengkap : {item.nama_lengkap}</li>
                                                <li class="list-group-item">No KTP : {item.no_ktp}</li>
                                                <li class="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
                                                <li class="list-group-item">Tanggal Lahir : {item.tanggal_lahir}</li>
                                                <li class="list-group-item">No Hp : +62{item.no_hp}</li>
                                            <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                                                <span className="fa fa-edit"></span>Edit
                                            </button>
                                            </ul>
                                        );
                                    })}
                                    <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat</h4>
                                    {/* <button className="btn btn-success my-2" onClick={this.Add_alamat}>
                                        <span className="fa fa-plus-circle"></span> Tambah Alamat
                                    </button> */}
                                    {alamat.map((item) => {
                                        return (
                                            <ul class="list-group">
                                                <li class="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                                                <li class="list-group-item">Kode Pos : {item.kode_pos}</li>
                                                <li class="list-group-item">Kecamatan : {item.kecamatan}</li>
                                                <li class="list-group-item">Kota : {item.kota}</li>
                                                <li class="list-group-item">Jalan : {item.jalan}</li>
                                                <li class="list-group-item">RT : {item.rw}</li>
                                                <li class="list-group-item">RW : +62{item.rw}</li>
                                            <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit_alamat(item)}>
                                                <span className="fa fa-edit"></span>Edit
                                            </button>
                                            <button className="m-1 btn btn-sm btn_outline-danger"
                                                onClick={() => this.Drop_alamat(item.id_pengiriman)}>   
                                                <span className="fa fa-trash"></span>
                                            </button>
                                            </ul>
                                        );
                                    })} 

                                </table>
                            </div>
                            </div>
                            
                            <Modal id="modal_user" title="Form User" bg_header="success"
                                text_header="white">
                                <form onSubmit={this.Save}>
                                    Username
                                    <input type="text" className="form-control" name="nama_user"
                                    value={this.state.nama_user} onChange={this.bind} required />
                                    Nama Lengkap
                                    <input type="text" className="form-control" name="nama_lengkap"
                                    value={this.state.nama_lengkap} onChange={this.bind} required />
                                    No KTP
                                    <input type="text" className="form-control" name="no_ktp"
                                    value={this.state.no_ktp} onChange={this.bind} required />
                                    Jenis Kelamin
                                    <input type="text" className="form-control" name="jenis_kelamin"
                                    value={this.state.jenis_kelamin} onChange={this.bind} required />
                                    Tanggal Lahir
                                    <input type="date" className="form-control" name="tanggal_lahir"
                                    value={this.state.tanggal_lahir} onChange={this.bind} required />
                                    No HP
                                    <input type="text" className="form-control" name="no_hp"
                                    value={this.state.no_hp} onChange={this.bind} required />
                                    <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                    </button>
                                </form>
                            </Modal>
                            <Modal id="modal_alamat" title="Form Alamat" bg_header="success"
                                text_header="white">
                                <form onSubmit={this.Save_alamat}>
                                    Nama Penerima
                                    <input type="text" className="form-control" name="nama_penerima"
                                    value={this.state.nama_penerima} onChange={this.bind} required />
                                    Kode Pos
                                    <input type="text" className="form-control" name="kode_pos"
                                    value={this.state.kode_pos} onChange={this.bind} required />
                                    Kecamatan
                                    <input type="text" className="form-control" name="kecamatan"
                                    value={this.state.kecamatan} onChange={this.bind} required />
                                    Kota
                                    <input type="text" className="form-control" name="kota"
                                    value={this.state.kota} onChange={this.bind} required />
                                    Jalan
                                    <input type="text" className="form-control" name="jalan"
                                    value={this.state.jalan} onChange={this.bind} required />
                                    RT
                                    <input type="text" className="form-control" name="rt"
                                    value={this.state.rt} onChange={this.bind} required />
                                    RW
                                    <input type="text" className="form-control" name="rw"
                                    value={this.state.rw} onChange={this.bind} required />
                                    <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                    </button>
                                </form>
                            </Modal>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}
export default Profil;