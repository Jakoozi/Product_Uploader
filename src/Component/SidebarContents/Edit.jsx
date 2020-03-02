import React, { Component } from "react";
import Layout from "../Layout/Layout";
import Swal from "sweetalert2";
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';
import EditableTagGroup from "../../JsFolder/AntDesign";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;


export default class Edit extends Component {
    state = {
        data:{
            name: ""
          }, 
        initialdata:{
        },
        imageurl:"",
        display: true,
        tags:[]
    };

    componentWillMount(){
        let id = JSON.parse(window.localStorage.getItem("productId"));
        let url = `https://gateway.xend.tk/product/api/Product_Catalog/GetProductAsync?productId=${id}`;

        fetch(url)
        .then(response => response.json())
        .then(json => this.addDataToState(json.data)) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  type: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );

        
    }
    addDataToState = (product) =>{
        console.log(product);
        let url = product.imageUrl;
        let data = { name: product.name };
        let tags = product.productTags
        console.log(tags, `Tags is consoled`)
        this.setState({initialdata:product, imageurl:url, data, tags})
       
    }
    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;
    
        this.setState({ data });
        console.log(this.state, `Data is logged`)
    };
    showWidget = () =>{     
        this.setState({ display: false});

        let widget = window.cloudinary.createUploadWidget({
             // cloudName: "jakoozi",
              // uploadPreset: "jakoozipreset",
              // maxImageFileSize: 50700,
              // multiple: false
              //cloudinary://249525816861115:N8DBN9-KQYrDZwlUV9460X7-riU@xend-catalog/

              // CLOUDINARY_CLOUD_NAME: "xend-catalog",
              // CLOUDINARY_API_KEY: 249525816861115,
              // CLOUDINARY_API_SECRET: N8DBN9-KQYrDZwlUV9460X7_riU,
              // maxImageFileSize: 50700,
              // multiple: false

              cloudName: "xend-catalog",
              uploadPreset: "xend-catalog",
              maxImageFileSize: 50700,
              multiple: false,
              maxImageWidth: 400,
              maxImageHeight: 400,
              validateMaxWidthHeight: true,
              cloudinary: `//249525816861115:N8DBN9-KQYrDZwlUV9460X7-riU@xend-catalog/`
          },
            (error, result) => { this.checkUploadResult(result) }
        );
        widget.open();
    } 
    checkUploadResult = (result) =>{
        if (result.event === "success") {
            this.urlSetMethod(result.info.secure_url);
          }
          this.setState({ display: true});
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
              title:'Successful',
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
        this.setState({ display: true});
    
    
      }
    addTags = (tagToAdd) => {
        let { tags } = this.state;
        if (tagToAdd && tags.indexOf(tagToAdd) === -1) {
          tags = [...tags, tagToAdd];
        }
        console.log(tags);
        this.setState({
          tags
        });
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };
    onSubmit = (e) => { 
        e.preventDefault();
        this.setState({ display: false});

        let { imageurl } = this.state;
        let { name } = this.state.data;
        let {tags} = this.state;
        let { productId, staffId} = this.state.initialdata;

        //The only things that should be changed are the NAME, IMAGEuRL AND tAG.
        let data1 = {
                productId: productId ,
                staffId: staffId,
                name: name ,
                imageUrl: imageurl,
                productTags: tags
        }
        console.log(data1)
       
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
              console.log(error, `error is consoled`)
              Swal.fire(
                {
                  type: 'error',
                  title:'Sorry',
                  text: `Something Went Wrong!`
                })
                this.setState({ display: true});
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
              this.setState({ display: true});
          }
    }
    editPageUi = () =>{
        
        const imageurl = this.state.imageurl;
        const { name } = this.state.data;

        return(
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
                            // style={{ height: "200px", width: "300px", marginLeft:"15vh"}}>
                            style={{ height: "400px", width: "400px", marginLeft:"15vh"}}>
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
                        <div className="form-group">
                            <label htmlfor="name"><h5>Product Tag :</h5></label>
                            {/* <br/>
                            <label>
                                <h6>previous Tags:</h6>
                                <br/>
                                <p>{this.state.initialdata.ProductTag}</p>
                            </label> */}
                            <EditableTagGroup 
                            handleClose={this.handleClose}
                            addTags={this.addTags} 
                            tags={this.state.tags} />
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
        );
    }
    spinLoader = () =>{
        return(
          <div className="sweet-loading" style={{  paddingTop : `30vh`, paddingLeft : `50vh` }}>
              <BeatLoader	
                  css={override}
                  sizeUnit={"px"}
                  size={80} 
                  color={"#2A68D4"}
                  loading={true}
              />
        </div>
        )
    }
    
 
   render(){
    
    console.log(this.state, `STATE is consoled`)

       return(
        <div>
            <Layout>
                {this.state.display ? this.editPageUi() : this.spinLoader()}
            </Layout>
        </div>
       );
   }
}

    // <form action="http://light.pinsupreme.com/index.html" class="dropzone dz-clickable" id="my-awesome-dropzone">
    //     <div class="dz-message">
    //         <div>
    //             <h4>Drop files here or click to upload.</h4>
    //             <div class="text-muted">(This is just a demo dropzone. Selected files are not actually uploaded)</div>
    //         </div>
    //     </div>
    // </form>