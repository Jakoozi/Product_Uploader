import React, { Component } from "react";
import Layout from "../Layout/Layout";
import Swal from "sweetalert2";
import EditableTagGroup from "../../JsFolder/AntDesign";
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;


export default class Upload extends Component {
  state = {
    data: {
      name: ""
    },
    imageurl: "",
    btn: "",
    display: true,
    tags:[]
  };
  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    let data = { ...this.state.data };
    data[name] = value;
    console.log(data);

    this.setState({ data });
    console.log(this.state, `Data is logged`)
  };

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

  responseSender = (response) =>{
    console.log(response, `RESPONSESENDER'S response is consoled`, response.status_code, `RESPONSE STATUS CODE IS CONSOLED`);
    if(response.status_code == 200)
    {
      console.log(response.Message, `RESONSE Successful Message is consoled`)
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
  onSubmit = async (e) => {
    e.preventDefault();
    let tag = new EditableTagGroup();
    // let tagvalue = await tag.inputReturner();
    // console.log(tagvalue, `Tag Value Is Consoled`)
   
    
    // this.setState({ display: false});

    let { imageurl } = this.state;
    let { name } = this.state.data;
    let data1 = {
      name: name,
      imageUrl: imageurl,
      productTag: tag.inputReturner()
    }
    console.log(data1, `Data value is consoled`)

    // if (name && imageurl)  {
    //   let data = JSON.stringify(data1);
    //   let url =`https://gateway.xend.tk/product/api/Product_Catalog/RegisterProduct`;



    //   fetch(url,{
    //     method: 'post',
    //     body: data,
    //     headers:{
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json, "This is the json response");
    //     this.responseSender(json);
    //   })  
    //   .catch(error => {
    //     console.log(error)
    //     Swal.fire(
    //       {
    //         type: 'error',
    //         title:'Sorry',
    //         text: `Something Went Wrong!`
    //       })
    //       this.setState({ display: true});
    //   })
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
    //     this.setState({ display: true});
    // }
   
  }
  showWidget = () => {
    this.setState({display: false });

    let widget = window.cloudinary.createUploadWidget({
      cloudName: "jakoozi",
      uploadPreset: "jakoozipreset",
      maxImageFileSize: 50700,
      multiple: false
    },
      (error, result) => { this.checkUploadResult(result) }
    );
    widget.open();
  }
  checkUploadResult = (result) => {
    if (result.event === "success") {
      this.urlSetMethod(result.info.secure_url);
    }
    this.setState({ display: true});
  }
  urlSetMethod = (imageurl) => {
    this.setState({ imageurl });
  }
  uploadPageUi = () =>{
    const { name, imageurl } = this.state;
    let btn = this.state.btn;

      return(
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
                style={{ height: "200px", width: "300px", marginLeft: "15vh" }}
              >
              </img>
              <button
                className="btn btn-light btn-block btn-primary"
                style={{ marginBottom: "5vh", marginTop: "5vh" }}
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
                <br />
              <div className="form-group">
                  <label htmlfor="name"><h5>Product Tag :</h5></label>
                  <EditableTagGroup addTags={this.addTags} tags={this.state.tags} />
              </div>
              </div>
              <br />
              <p>
                <button
                  type="submit"
                  className="btn btn-light btn-block btn-success"
                >
                  <h5>Submit Product</h5>
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
              size={100} 
              color={"#2A68D4"}
              loading={true}
          />
    </div>
    )
 }



  
  render() {
    

    return (
      <Layout>
        {this.state.display ? this.uploadPageUi() : this.spinLoader()}
      </Layout>
    );
  }
}
