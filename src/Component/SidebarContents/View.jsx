import React, { Component } from "react";
import Layout from "../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import Delete from '../../JsFolder/DeleteProduct';


export default class Upload extends Component {
  state = {
    data:[

  ],
    loaded:false, 
     delete : new Delete()

  };

  componentDidMount(){

    let url = `https://gateway.xend.tk/product/api/Product_Catalog/GetAllProductsAsync?page=1&pageSize=2000`;

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
      _.reverse(datarecived);
      let products = datarecived.data.records;
      _.reverse(products);
      this.setState({data:products, loaded:true})
  }
  //here the entire product is passed and stored to the browser
  handleEditClick = (product) =>{
    window.localStorage.setItem("product", JSON.stringify(product));
  }
  handleDeletteClick = ( productId) =>{

    let deleteproduct = this.state.delete;
    deleteproduct.onDelete( productId, this.stateUpdater);
  }
  stateUpdater = (deletedProductId) =>{
    let data = this.state.data;
    let dataUpdate = data.filter(product => product.productId !== deletedProductId);
  
    this.setState({data:dataUpdate});
  }
  timeFormater = (date) =>{
    let formatedDate = date;
    return <Moment format="ddd Do MMM, YYYY HH:mm">{formatedDate}</Moment>
  }


  render() {
  
    
    let data = this.state.data;
    let loaded = this.state.loaded;
    let all;

    console.log(data, `render data is consoled`)

    if(loaded === true){
      all = data.map((data, index) =>{
        return(
          <tbody key={data.productId}>
            <tr role="row" className="odd">
              <td>
                <img src={data.imageUrl} alt="product thumbnail" style={{ height: "80px", width: "80px"}}/>
              </td>
              <td><h5>{data.name}</h5></td>
              <td><h5>{this.timeFormater(data.createdAtTimeStamp)}</h5></td>
              <td><h5>{this.timeFormater(data.updatedAtTimeStamp)}</h5></td>
              <td onClick={() => this.handleEditClick(data)}>
                <div class="badge badge-warning">
                  <Link to="/Edit" className="nav-link"> 
                    <h6>Edit Product</h6>
                    <i class="os-icon os-icon-edit-1"></i>
                  </Link>
                </div>
              </td>
              <td onClick={() => this.handleDeletteClick(data.productId)}>
                <div class="btn btn-danger">
                    <h6>Delete Product</h6>
                    <i class="os-icon os-icon-ui-15"></i>
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
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                                              <h6>Delete Product</h6>
                                                                            </th>
                                                                    </tr>
                                                        </thead>
                                                        <tfoot>
                                                            <tr>
                                                                <th rowspan="1" colspan="1">Image Thumbnail</th>
                                                                <th rowspan="1" colspan="1">Product Name</th>
                                                                <th rowspan="1" colspan="1">Created Date</th>
                                                                <th rowspan="1" colspan="1">Updated Date</th>
                                                                <th rowspan="1" colspan="1">Edit Product</th>
                                                                <th rowspan="1" colspan="1">Delete Product</th>

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
