import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Image from '../image/lapangan.jpg';
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      myProfil: [],
      profil: [],
      Users: [],
      id: "",
      Username: "",
      email: "",
      password: "",
      role: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth:"",
      image: null,
      no_hp: "",
      last_password: "",
      new_password: "",
      action: "",
      find: "",
      message: ""
    }

    // // jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({image: event.target.files[0]})
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_profil").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        username: item.username,
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        gender: item.gender,
        date_birth: item.date_birth,
        no_hp: item.no_hp,
        alamat: item.alamat
      });
    }
    
    getProfil = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id'))
        let url = "http://localhost/lapangan/public/myprofil/" + id;
        axios.get(url)
        .then(response => {
            this.setState({profil: response.data.profil});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/user"+id.user;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_user();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.getProfil();
      // alert('page profil');
    }

    Save = (event) => {
      event.preventDefault();
      // $("#loading").toast("show");      
      $("#modal_profil").modal("hide");
      let url = "http://localhost/lapangan/public/myprofil/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("first_name", this.state.first_name);
      form.append("last_name", this.state.last_name);
      form.append("gender", this.state.gender);
      form.append("date_birth", this.state.date_birth);
      form.append("no_hp", this.state.no_hp);
      form.append("alamat", this.state.alamat);
      // if (form.has("img_brg")){
      // form.append("img_brg", this.state.img_brg, this.state.img_brg.name);
      // }

      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data});
        $("#message").toast("show");
        this.getProfil();
      })
      .catch(error => {
        console.log(error);
      });
    }
    
    SavePwd = (event) => {
      event.preventDefault();
      // $("#loading").toast("show");      
      $("#modal_pwd").modal("hide");
      let url = "http://localhost/lapangan/public/myprofil/pwd";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("last_password", this.state.last_password);
      form.append("new_password", this.state.new_password);

      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        // this.setState({message: response.data});
        // $("#message").toast("show");
        this.getProfil();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/profiles";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({profiles: response.data.profiles});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <div className="container">
            <div className="card mt-2">
                <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                    <div className="#" style={{ maxWidth: "1000px" }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img className="rounded float-left" src={Image} style={{ height: "240px", width: "350px"}} />
                            </div>
                            <div style={{ paddingTop: "0%" , paddingLeft: "2%" }}>
                            <div className="card-body">
                                <h4 className="card-title" style={{ fontWeight: "700" }}>Data Profile</h4>
                                <table className="table table-borderless">
                                {this.state.profil.map((item) => { 
                        return(
                          <tbody>
                            <tr>
                              <td>
                              <tr>
                                <td>Username</td>
                                <td>: {item.username}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td>: {item.email}</td>
                              </tr>
                              <tr>
                                <td>Password</td>
                                <td>: {item.password}</td>
                              </tr>
                              <tr>
                                <td>Role</td>
                                <td>: {item.role}</td>
                              </tr>
                              </td>
                              <td>
                              <tr>
                                <td>First Name</td>
                                <td>: {item.first_name}</td>
                              </tr>
                              <tr>
                                <td>Last Name</td>
                                <td>: {item.last_name}</td>
                              </tr>
                              <tr>
                                <td>Gender</td>
                                <td>: {item.gender}</td>
                              </tr>
                              <tr>
                                <td>TTL</td>
                                <td>: {item.date_birth}</td>
                              </tr>
                              </td>
                            </tr>
                            <button className="m-1 btn btn-sm btn-outline-warning" onClick={() =>this.Edit(item)}>
                                <span className="fa fa-edit">Edit</span>
                            </button>
                      </tbody>
                        )
                      })}
                                </table>
                            </div>
                            </div>
                            
                            <Modal id="modal_profil" title="Form Profile" bg_header="secondary" text_header="white">
                <form onSubmit={this.Save}>
                  Username
                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.bind} required />
                  Email
                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.bind} required />
                  First Name
                    <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={this.bind} required />
                  Last Name
                    <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={this.bind} required />

                  <div className="form-group">
                    <label htmlFor="role">Jenis Kelamin</label>
                    <select className="form-control" name="gender" value={this.state.gender} onChange={this.bind} required>
                      <option value="L">Laki laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  
                  Tanggal Lahir
                    <input type="date" className="form-control" name="date_birth" value={this.state.date_birth} onChange={this.bind} required />
                  Nomor HP
                  <input type="int" className="form-control" name="no_hp" value={this.state.no_hp} onChange={this.bind}  />
                  Alamat
                    <input type="text" className="form-control" name="alamat" value={this.state.alamat} onChange={this.bind}  />
                  
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