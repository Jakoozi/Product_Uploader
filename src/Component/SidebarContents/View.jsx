import React, { Component } from "react";
import Layout from "../Layout/Layout";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";

export default class Upload extends Component {
  state = {
    data:[

  ],
    loaded:false,  
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
    this.setState({data:products, loaded:true})

  }
  handleEditClick = (productid) =>{
    window.localStorage.setItem("productId", (productid));
  
    console.log(productid, `productid is consolelogged`)

}
timeFormater = (date) =>{
  let formatedDate = date;
  return <Moment format="ddd Do MMM, YYYY HH:mm">{formatedDate}</Moment>
}


  render() {

    let data = this.state.data;
    let loaded = this.state.loaded;
    let all;

    if (this.state.login == true) {
      this.props.history.push("/Edit");
      console.log(this.state.login, "second Login is console logged here");
    }

    console.log(data, `render data is consoled`)

    if(loaded === true){
      all = data.map(data =>{
        return(
          <tbody>
            <tr role="row" className="odd">
              {/* <td><h5>{data.imageUrl}</h5></td> */}
              <td>
                <img src={data.imageUrl} alt="product thumbnail" style={{ height: "80px", width: "80px"}}/>
              </td>
              <td><h5>{data.name}</h5></td>
              <td><h5>{this.timeFormater(data.createdAtTimeStamp)}</h5></td>
              <td><h5>{this.timeFormater(data.updatedAtTimeStamp)}</h5></td>
              <td onClick={() => this.handleEditClick(data.productId)}>
                <div class="badge badge-danger">
                  <Link to="/Edit" className="nav-link"> 
                    Edit
                    <i class="os-icon os-icon-ui-15"></i>
                  </Link>
                </div>
                
                 
              
              </td>
            </tr>
          </tbody>
        );
      });
    }
    else{
      all = "Loading.."
    }

    return (
      <div>
                <Layout>
                    <div class="content-w">
                        <div class="content-i">   
                            <div class="content-box">
                                <div class="element-wrapper">
                                <h4 class="element-header">All Products</h4>
                                                    <table className="table table-padded">
                                                        <thead>
                                                                    <tr role="row">
                                                                        <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                                            <h6>Image Thumbnail</h6>
                                                                        </th>
                                                                        <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                                            <h6>Product Name</h6>
                                                                        </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending"  style={{width: '280px'}}>
                                                                              <h6>Created Date</h6>
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                                              <h6>Updated Date</h6>
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                                              <h6>Edit Product</h6>
                                                                            </th>
                                                                    </tr>
                                                        </thead>
                                                        <tfoot>
                                                            <tr>
                                                                <th rowspan="1" colspan="1">Image Thumbnail</th>
                                                                <th rowspan="1" colspan="1">Produuct Name</th>
                                                                <th rowspan="1" colspan="1">Created Date</th>
                                                                <th rowspan="1" colspan="1">Updated Date</th>
  
                                                                <th rowspan="1" colspan="1">Edit Product</th>

                                                            </tr>
                                                        </tfoot>
                                                        {all}
                                                    </table>
                                                </div>         
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
    );
  }
}
