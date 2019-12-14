import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { PacmanLoader	 } from 'react-spinners';


const override = css`
  display: block;
  margin: 0 auto;
 
`;

export default class RegisterPage extends Component {

    state = {
        data: {
            email: '',
            password: '',
            confirmpassword: '',
        },
        
        success: false,
        btndisabled: false,
        failed:true,
        login: false,
        loading: true,
        display: true
        
      }
//in charge of storing form input to the state
      handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data =  {...this.state.data};
          data[name] = value;
          console.log(data);
      
        this.setState({data});
      }

      //this method store the userid to the browser
      storeUserId = (jsonresponse) =>{
        let id = window.localStorage.setItem("userid", JSON.stringify(jsonresponse));
        console.log(jsonresponse, "jsonresponse is console logged here")
        return(this.setState({login: true}))
      
      }

      //this is the react spinner method
      spinLoader = () =>{
        return(
          <div className="sweet-loading" style={{  paddingTop : `20vh`, paddingRight : `30vh` }}>
              <PacmanLoader	
                  css={override}
                  sizeUnit={"px"}
                  size={100}
                  color={"#E85454"}
                  loading={this.state.loading}
              />
          </div>
        )
      }

      //this is my UI form method
      loginFormUi = () =>{

        const { email, password, confirmpassword } = this.state.data

        return(
          <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12"></div>
                </div>
                <div className="row" style={{paddingTop: '110px'}}>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <div className="element-wrapper">
                            <h6 className="element-header">
                                Register Below:
                            </h6>
                            <div className="element-box">
                                <form  onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <label htmlfor="email">Email address:</label>
                                            <input type="email"
                                            onChange={this.handleInputChange}
                                            class="form-control"
                                            value={email}
                                            name='email'
                                            onfocus="this.value=''"
                                            id="email" />
                                        </div>
                                        <div class="form-group">
                                            <label htmlfor="pwd">Password:</label>
                                            <input type="password"
                                            onChange={this.handleInputChange}
                                            class="form-control"
                                            value={password}
                                            name='password'
                                            id="pwd" />
                                        </div>
                                        <div class="form-group">
                                            <label htmlfor="cpwd">Confirm Password:</label>
                                            <input type="password"
                                            onChange={this.handleInputChange} 
                                            class="form-control"
                                            value={confirmpassword}
                                            name='confirmpassword'
                                            id="cpwd" />
                                        </div>
                                        <button 
                                          type="submit" 
                                          className="btn btn-danger"
                                        >
                                            Register
                                        </button>
                                        <div class="tipWrap"><p class="tip">Already Have an Account? <Link to="/" class="">Login here</Link></p></div>
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
      //this is my submit method
      onSubmit = e => {

          e.preventDefault();
          this.setState({display: false });

          let { email, password, confirmpassword } = this.state.data;
          let newData = {
            email: email,
            password: password
          }
        
          if (email && password && confirmpassword)                                  
          { 
            this.setState({btndisabled:true});
            console.log(this.state.btndisabled, "Btndisable is console logged");
            if(password === confirmpassword)
            {
              const data = JSON.stringify(newData);
              let url = 'http://localhost:5000/api/admin/registeruser';
      
              fetch(url,{
                method: 'post',
                body: data,
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(json => {
                console.log(json, "This is the json response");
                // here should be checking if the users object came back.
                //it should also store that object in the state so that the id will be used to fetch his data
                if(Number.isInteger(json))
                {
                  Swal.fire(
                    {
                      type: 'success',
                      title: 'Account Created!!!',
                      text: 'You Have Succefully Registered'
                    }
                  );
                  this.storeUserId(json);
                 
                }
                else{
                  this.setState({ display: true});
                  Swal.fire(
                    {
                      type: 'warning',
                      title: 'Sorry!!',
                      text: 'User Already Exists, Please Login into Yoour Account'
                    }
                  );
                }
               
              }) 
              .catch(error => {
                this.setState({ display: true});
                console.log(error)
                Swal.fire(
                  {
                    type: 'error',
                    title:'Sorry!!',
                    text: 'Please Something Whent Wrong, Check Your Internet Connection.'
                  }
                )
              });
              
            }
            else{
              this.setState({ display: true});
              Swal.fire(
                {
                  type: 'error',
                  title:'Sorry!',
                  text: 'Password and Confirmpassword do not Match, Please Make Sure it is The Same'
                }
              )
            }
          }
          else
          {
            this.setState({ display: true});
              Swal.fire(
                {
                  type: 'warning',
                  title:'Please!',
                  text: 'Fill In Your Correct Information'
                }
              )
          }
       
     }


    render() {

       
        if(this.state.login){
          this.props.history.push('/Dashboard')
        }

        return (
          <div className='with-content-panel'>
            <div className='all-wrapper menu-side with-side-panel'>
              <div className='layout-w'>
                <div className='content-w '>
                  <div 
                    className='with-content-panel'
                    style={{ minHeight: '97vh' }}
                  >
                      <ul className="breadcrumb">
                          <li className="breadcrumb-item"><Link to="/" >Login</Link></li>
                          <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                          <li className="breadcrumb-item"><Link to="/" >About</Link></li>    
                      </ul>
                      {this.state.display ? this.loginFormUi() : this.spinLoader()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

{/* <p class="tip">Already have an account? <a href="/login" class="">Login here</a>.</p> */}