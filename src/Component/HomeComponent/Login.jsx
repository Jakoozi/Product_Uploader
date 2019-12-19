import React, { Component } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import { PacmanLoader	 } from 'react-spinners';
import Swal from "sweetalert2";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class Login extends Component {

    state = {
        data: {
          email: "",
          password: ""
        },
        login: false,
        loading: true,
        display: true
      };

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = this.state.data;
        data[name] = value;
    
        this.setState({ data });
        console.log(this.state);
    };
    loginFormUi = () =>{
        const { email, password } = this.state.data;
    
          return(
            <div className="container-fluid">
                <div class="row">
                    <div class="col-md-12"></div>
                </div>
                <div className="row" style={{paddingTop: '110px'}}>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <div className="element-wrapper">
                            <h4 className="element-header">
                                Login In To Members Area:
                            </h4>
                            <div className="element-box">
                                <form role="form" onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <label for="email"><h5>Email address:</h5></label>
                                            <input type="email"
                                            class="form-control form-control-lg"
                                            name='email'
                                            value={email}
                                            onChange={this.handleInputChange}
                                            id="email" />
                                        </div>
                                        <div class="form-group">
                                            <label for="pwd"><h5>Password:</h5></label>
                                            <input type="password"
                                            onChange={this.handleInputChange}
                                            name='password'
                                            value={password}
                                            class="form-control form-control-lg"
                                            id="pwd" />
                                        </div>
                                        <button type="submit"
                                        className="btn btn-primary btn-block">
                                            Login
                                        </button>
                                        {/* <div class="tipWrap"><p class="tip">Don't have an account? <Link to="/Register" class="">Sign up here</Link></p></div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
          );
    }
    spinLoader = () =>{
        return(
          <div className="sweet-loading" style={{  paddingTop : `20vh`, paddingRight : `30vh` }}>
              <PacmanLoader	
                  css={override}
                  sizeUnit={"px"}
                  size={100} 
                  color={"#2A68D4"}
                  loading={this.state.loading}
              />
        </div>
        )
    }
    //the user id stored here will be used on the first page after display to show the users info
    storeUserId = jsonresponse => {
        if (typeof Storage !== "undefined") {
          // Code for localStorage
          window.localStorage.setItem("userid", JSON.stringify(jsonresponse));
          console.log(jsonresponse, "json response is console logged here");
          //this routes to the dashboard
          return this.setState({ login: true });
        }
    };
    onSubmit = e => {
        e.preventDefault();
        this.setState({display: false });
    
        
        const { email, password } = this.state.data;
        if (email && password) {
          const data = JSON.stringify(this.state.data);
          let url = `http://localhost:5000/api/admin/login`;
    
          fetch(url, {
            method: "post",
            body: data,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(json => {
              //checking for json's value from my database
              if (Number.isInteger(json)) {
                this.storeUserId(json);
              } else if (json == false) {
                this.setState({ display: true});
                Swal.fire({
                  type: `warning`,
                  title: `Sorry!!`,
                  text: `Password is Incorrect.`
                 
                });
              } else if (json == true) {
                this.setState({ display: true});
                Swal.fire({
                  type: `warning`,
                  title: `Sorry!!`,
                  text: `User Does not Exist.`
                });
                
              }
            })
            .catch(error => {
                this.setState({ display: true});
                console.log(error, "error is consoled");
                Swal.fire({
                    type: "error",
                    title: "Opps!!",
                    text: "Something Whent Wrong Please Check Your Internet Connection."
                });
            });
        } else {
            this.setState({ display: true});
            Swal.fire({
                type: "warning",
                title: "Please!",
                text: "Please Fill The Form Completely"
            });
        }
        
      };
    render() {

        const { email, password } = this.state.data;

        return(
            <div className='with-content-panel'>
                <div className='all-wrapper menu-side with-side-panel'>
                    <div className='layout-w'>
                        <div className='content-w '>
                            <div
                                className='with-content-panel'
                                style={{ minHeight: '95vh' }}
                            >
                                {/* <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/Register" >Register</Link></li>
                                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/" >About</Link></li>
                                </ul> */}
                                {this.state.display ? this.loginFormUi() : this.spinLoader()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}