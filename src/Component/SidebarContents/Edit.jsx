import React, { Component } from "react";
import Layout from "../Layout/Layout";
import Swal from "sweetalert2";

export default class Edit extends Component {
    state = {
        data:{
            name: ""
          }, 
        initialdata:{
        },
        imageurl:"",
    };

    componentWillMount(){
        let product = JSON.parse(window.localStorage.getItem("product"));
        this.addDataToState(product);
    }
    addDataToState = (product) =>{
        let url = product.imageUrl;
        let data = { name: product.name };
        this.setState({initialdata:product, imageurl:url, data})
       
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
        
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "jakoozi",
            uploadPreset: "jakoozipreset",
            maxImageFileSize: 50700,
            multiple: false},
            (error, result) => { this.checkUploadResult(result) }
        );
        widget.open();
    } 
    checkUploadResult = (result) =>{
        if (result.event === "success") {
            this.urlSetMethod(result.info.secure_url);
          }
    }
    urlSetMethod =(imageurl) =>{
        this.setState({imageurl});

        console.log(`States URL is; console logged here`, this.state.imageurl)
    }
    responseSender = (response) =>{
        console.log(response, `RESPONSESENDER'S response is consoled`, response.status_code, `RESPONSE STATUS CODE IS CONSOLED`);
        if(response.status_code == 200)
        {
          console.log(response.message, `RESONSE Successful Message is consoled`)
          Swal.fire(
            {
              type: 'success',
              title:'Sorry',
              text: `${response.message}`
            })
        }
        else if(response.status_code == 400)
        {
          console.log(response.Message, `Response error message`)
          Swal.fire(
            {
              type: 'info',
              title:'Sorry',
              text:  `${response.Message}`
            })
        }
    
    
      }
    onSubmit = (e) => { 
        e.preventDefault();
        let { imageurl } = this.state;
        let { name } = this.state.data;
        let { productId, staffId, productTag } = this.state.initialdata;

        //The only things that should be changed are the NAME, IMAGEuRL AND tAG.
        let data1 = {
            staffId: staffId,
            productId: productId,
            productTag: productTag,
            name: name,
            imageUrl: imageurl
        }
       
        if (name && imageurl)  {

            e.preventDefault();
            let data = JSON.stringify(data1);
            console.log(data, `data is console logged`)
            let url = `https://gateway.xend.tk/product/api/Product_Catalog/UpdateProduct`;
      
      
      
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
              this.responseSender(json);
            })  
            .catch(error => {
              console.log(error)
              Swal.fire(
                {
                  type: 'error',
                  title:'Sorry',
                  text: `Something Went Wrong!`
                })
            })
          }    
          else
          {
              Swal.fire(
                {
                  type: 'warning',
                  title:'Please!',
                  text: 'Fill In The Form Correctly'
                }
              )
          }
    }
 
   render(){
    const imageurl = this.state.imageurl;
    const { name } = this.state.data;
    let btn = this.state.btn;
  

    console.log(this.state, `STATE is consoled`)

       return(
        <div>
            <Layout>
                <div className="row">
                <div className="col-md-3"></div>
        
                <div className="col-md-6">
                
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Edit A Product
                        </h3>
                        <img src={imageurl}
                            class="rounded" alt="Product Image"
                            style={{ height: "200px", width: "300px", marginLeft:"15vh"}}>
                        </img>
                        <button
                            className="btn btn-light btn-block btn-primary" 
                            style={{ marginBottom: "5vh", marginTop: "10vh" }} 
                            type="button" 
                            onClick={this.showWidget}>
                                <h5>Upload Image</h5>
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
                            className="btn btn-light btn-block btn-success"
                            >
                                <h5> Update Product</h5>
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
