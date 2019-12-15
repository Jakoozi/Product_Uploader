import React, { Component } from "react";
import Layout from "../Layout/Layout";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Swal from "sweetalert2";
import moment from 'moment';
import ProductAPI from '../../JsFolder/ProductAPI';
import { async } from "q";

export default class Upload extends Component {
  state = {
     data:{
        name: ""
      }, 
      imageurl:"",
   //0 here is = false, while 1 = true
    btn:"",
  };
//i ant to check something
  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    let data = { ...this.state.data };
    data[name] = value;
    console.log(data);

    this.setState({ data });
    console.log(this.state, `Data is logged`)
  };

  booleanSwicth = (boolswitch) =>{
    if(boolswitch === "1"){
      return true;
    }
    else if(boolswitch === "0"){
      return false;
    }
  }
  onSubmit = async(e) => {
    
    e.preventDefault();
    let { imageurl } = this.state;
    let { name } = this.state.data;
    let data1 = {
      name: name,
      imageUrl: imageurl
    }
    console.log(data1, `data1 is conslelogged`)

  var data = JSON.stringify({
        "name": "Test2",
        "imageUrl": "https://res.cloudinary.com/jakoozi/image/upload/v1576237290/AppFolder/bk3kzjclb5jhsohllzhs.png"
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "https://gateway.xend.tk/product/api/Product_Catalog/RegisterProduct");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.20.1");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("Postman-Token", "21004a83-ea0f-4adb-bce4-063ecb5642bf,ac78c6bb-8c23-43fd-af74-70b71ec8ae12");
      xhr.setRequestHeader("Host", "gateway.xend.tk");
      xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
      xhr.setRequestHeader("Content-Length", "132");
      xhr.setRequestHeader("Connection", "keep-alive");
      xhr.setRequestHeader("cache-control", "no-cache");
      
      xhr.send(data);



    // if(name && imageurl)
    // {
    //   let ProductObject = new ProductAPI();
    //   let payload = await ProductObject.CreateProduct(data1);   
    //   console.log({payload})
    // }
    //  else
    // {
    //     Swal.fire(
    //       {
    //         type: 'warning',
    //         title:'Please!',
    //         text: 'Fill In The Form Correctly'
    //       }
    //     )
    // }
 
    
    // if (name && imageurl)  {

    //   e.preventDefault();
    //   let data = JSON.stringify(data1);
    //   let url =`https://gateway.xend.tk/product/api/Product_Catalog/RegisterProduct`;

      
    // }

      // fetch(url,{
      //   method: 'post',
      //   body: data,
      //   headers:{
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then(response => response.json())
      // .then(json => {
      //   console.log(json, "This is the json response");
      //   Swal.fire(
      //     {
      //       type: 'success',
      //       title:'Successful',
      //       text: `Your Product Has Been Created Successfully`
      //     })
      // })
      // .catch(error => {
      //   console.log(error)
      //   Swal.fire(
      //     {
      //       type: 'error',
      //       title:'Sorry',
      //       text: `Something Went Wrong!`
      //     })
      // })
    // }    
    // else
    // {
    //     Swal.fire(
    //       {
    //         type: 'warning',
    //         title:'Please!',
    //         text: 'Fill In The Form Correctly'
    //       }
    //     )
    // }
    // this.setState({btn:"0"});
    // console.log(this.state.btn, `button is console logged second time`)
    
  };

  showWidget = () =>{
    // let btn = true;
    // this.setState({btn:btn});       

    // console.log(this.state.btn, `button disabled is consle logged`);
    let widget = window.cloudinary.createUploadWidget({
        cloudName: "jakoozi",
        uploadPreset: "jakoozipreset",
        maxImageFileSize: 50700},
        (error, result) => { this.checkUploadResult(result) }
    );
    widget.open();
  } 

  storeImageUrl = url => {
    if (typeof Storage !== "undefined") {
      // Code for localStorage
      window.localStorage.setItem("imageurl", JSON.stringify(url));
      console.log(url, "local storage is console logged here");
    }
  };

  urlSetMethod =(imageurl) =>{
    // let btn = true;
    // this.setState({btn:btn});
    // console.log(this.state.btn, `button disabled is consle logged`);
    console.log(`URL is console logged here`,imageurl);

    this.setState({imageurl});
    console.log(`States URL is; console logged here`, this.state.imageurl)

    this.storeImageUrl(imageurl);
  }

  checkUploadResult = (result) =>{
    if (result.event === "success") {
       
   
        this.urlSetMethod(result.info.secure_url);

      }
  }

  render() {
    const { name, imageurl  } = this.state;
    let btn = this.state.btn;
   

    return (
      <Layout>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
           
            <form onSubmit={this.onSubmit}>
                <h3
                  className="form-header"
                  style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                >
                  Create A Product
                </h3>
                <img src={imageurl} 
                  class="rounded" alt="Product Image"
                  style={{ height: "200px", width: "300px", marginLeft:"15vh"}}
                >
                </img>
                <button
                  className="btn btn-light btn-block btn-primary" 
                  style={{ marginBottom: "5vh", marginTop: "5vh" }} 
                  type="button" 
                  onClick={this.showWidget}>
                    Upload Image
                </button>
                <div className="form-group">
                  <label htmlfor="name"><h5>Image URL:</h5></label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    name="imageurl"
                    className="form-control form-control-lg"
                    placeholder="url..."
                    value={imageurl}
                    disabled
                  />
                </div>

              <div className="form-group">
                <label htmlfor="name"><h5>Product Name:</h5></label>
                <input
                  onChange={this.handleInputChange}
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter.."
                  value={name}
                />
              </div>
                <br />
              <p>
                <button
                  type="submit"
                  disabled={(btnpara = btn) => {this.booleanSwicth(btnpara)}}
                  className="btn btn-light btn-block btn-success"
                >
                  Submit Product
                </button>
              </p>
            </form>
               
          </div>
          <div className="col-md-3"></div>
        </div>
      </Layout>
    );
  }
}
