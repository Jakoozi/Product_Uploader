import React, { Component } from "react";
import Layout from "../Layout/Layout";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Swal from "sweetalert2";
import moment from 'moment';
import { Link } from "react-router-dom";
import ProductAPI from "../../JsFolder/ProductAPI";


export default class Edit extends Component {
    state = {
        data:{
            name: ""
          }, 
        initialdata:{
            imageUrl:"",
            name:"",
            productId:"",
            staffId:"",
            createdAtTimeStamp:"",
            updatedAtTimeStamp:""
        },
        imageurl:"",
        urlsetter:false,
        btn:"",
    };

    componentDidMount(){

        let url = `https://gateway.xend.tk/product/api/Product_Catalog/GetAllProductsAsync`;
    
            fetch(url)
            .then(response => response.json())
            .then(json => this.addDataToState(json)) 
            .catch(error => { 
                console.log(error)
                Swal.fire(
                    {
                      type: 'error',
                      title:'Opps!!',
                      text: 'Sorry! Something Went Wrong'
                    }
                  )
            } );
           
      }
      addDataToState = (datarecived) => {
        let products = datarecived.data.records;
        products.shift();
        console.log(products, `single product is consoled`)
        this.setState({initialdata:products})
    
      }

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;
        console.log(data);
    
        this.setState({ data });
        console.log(this.state, `Data is logged`)
    };
    showWidget = () =>{     
        console.log(this.state.btn, `button disabled is consle logged`);
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
          window.localStorage.setItem("imageurl", JSON.stringify(url));
          console.log(url, "local storage is console logged here");
        }
    };
    urlSetMethod =(imageurl) =>{
        console.log(`URL is console logged here`,imageurl);
    
        // this.setState({imageurl});
        this.setState({urlsetter:true});
        console.log(`States URL is; console logged here`, this.state.urlsetter)
    
        this.storeImageUrl(imageurl);
    }
    checkUploadResult = (result) =>{
        if (result.event === "success") {

            this.urlSetMethod(result.info.secure_url);
    
          }
    }
    imageUrlSetter =() =>{
        // window.localStorage.getItem("image")

        if(this.state.urlsetter == false){
            let url = "https://res.cloudinary.com/jakoozi/image/upload/v1576237290/AppFolder/bk3kzjclb5jhsohllzhs.png";
            console.log(url, `if url is console logged`);
            window.localStorage.setItem("imageurl", JSON.stringify(url));
        }
        else{
      
            let url = window.localStorage.getItem("imageurl");
            console.log(url, `else url is console logged`);
            window.localStorage.setItem("imageurl", JSON.stringify(url));
        }
    }
   
   render(){

    this.imageUrlSetter();
    // const { imageurl  } = this.state;
    let imageurl = window.localStorage.getItem("imageurl")
    const { name } = this.state.data;
    let btn = this.state.btn;
  

    console.log(this.state.initialdata, `initial data is console logged`)
    // {this.state.display ? this.loginFormUi() : this.spinLoader()}

       return(
        <div>
            <Layout>
                <div className="row">
                <div className="col-md-3"></div>
        
                <div className="col-md-6">
                
                    <form onSubmit={this.onSubmit}>
                        <h4
                        className="form-header"
                        style={{ paddingTop: "15vh", textAlign: "center" }}
                        >
                        Edit A Product
                        </h4>
                        <img src={imageurl}
                            class="rounded" alt="Product Image"
                            style={{ height: "200px", width: "300px", marginLeft:"15vh"}}>
                        </img>
                        <button
                            className="btn btn-light btn-block btn-primary" 
                            style={{ marginBottom: "5vh", marginTop: "10vh" }} 
                            type="button" 
                            onClick={this.showWidget}>
                                Upload Image
                        </button>
                        <div className="form-group">
                        <label htmlfor="name">Image URL</label>
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
                        <label htmlfor="name">Product Name</label>
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
        </div>
       );
   }
}
