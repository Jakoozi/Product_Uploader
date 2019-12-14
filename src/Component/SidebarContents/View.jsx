import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { userInfo } from 'os';
import moment from 'moment';
import _ from 'lodash';
import chunk from 'lodash/chunk';

export default class View extends Component {

         state= {
            data:[

            ],
            loaded:false,
            filtered:false,
            item:7
    }

    componentDidMount(){
        let id = Number(window.localStorage.getItem("userid"));
        let url = `http://localhost:5000/api/todo/getByUserId/${id}`;
    
            fetch(url)
            .then(response => response.json())
            .then(json => this.addDataToState(json)) 
            .catch(error => { 
                console.log(error)
                Swal.fire(
                    {
                      type: 'error',
                      title:'Opps!!',
                      text: 'Tasks cant load please Check your internet Connection'
                    }
                  )
            } );
           
    }

    addDataToState = (data) => {
        _.reverse(data);
        this.setState({data,loaded:true});
    }


    handleClick = (e,id) => {
        //This is the delete button
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Task again!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          })
          .then((result) => {
            if (result.value) {
                let data = this.state.data;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'delete'
                })
                .then(response => response.json())
                .then(json => {
                        console.log(json)
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Task has been deleted.',
                            type: 'success'
                        }) 
                        let dataUpdate = data.filter(task => task.id !== id);
                        this.setState({data:dataUpdate});
                    }
                ) 
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'This Task Cant Be Delete Please Check Your Internet Connection'
                        }
                      )
                } );
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Task is safe :)',
                    'error'
                  )
            }
          }
        )
                    
                    
            
    }
   
    statusReturnerMethod = (status) =>{
        switch (status) {
            case 1:
              status = `Scheduled`;
              break;
            case 2:
              status = `Unscheduled`;
              break;
            case 3:
              status = `Pending`;
              break;
            case 4:
              status = `Ongoing`;
              break;
            case 5:
                status = `Completed`;
                break;
            case 6:
                status = `Skipped`;
                break;
          }
          return status;
    }
    categoryReturnMethod = (category) =>{
        switch (category) {
            case 1:
              category = `School`;
              break;
            case 2:
              category = `Liesure`;
              break;
            case 3:
              category = `Work`;
              break;
          }
          return category;
    }
    timeFormater = (date) =>{
        let formatedDate = date;
        return <Moment format="ddd MMM Do, YYYY HH:mm">{formatedDate}</Moment>
    }

    render() {
        let all;
        let data = this.state.data;
        let loaded = this.state.loaded;
        // let now = moment('2019-11-26T10:00:00');
        // console.log(now, 'moment is console looged')
        // this.timeFormater("2019-11-26T10:00:00");
        if(loaded === true)
        {
            all = data.map(data => {
                
                return (

                
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1"><h5>{data.name}</h5></td>
                                        <td><h5>{this.statusReturnerMethod(data.statusReturner)}</h5></td>
                                        <td><h5>{this.categoryReturnMethod(data.category)}</h5></td>
                                        <td><h5>{this.timeFormater(data.startTime)}</h5></td>                 
                                        <td><h5>{this.timeFormater(data.endTime)}</h5></td>
                                        <td onClick={(e,id = data.id) => this.handleClick(e,id)}>
                                                <a class="badge badge-danger" href="#">Delete<i class="os-icon os-icon-ui-15"></i></a>
                                        </td>
                                   </tr>
                                </tbody>
                                
                );
            });
            console.log(all);
        }
        else
        {
            all = <h3>Loading...</h3>
        }


        return (
            <div>
                <Layout>
                    <div class="content-w">
                        <div class="content-i">   
                            <div class="content-box">
                                <div class="element-wrapper">
                                <h4 class="element-header">All Tasks</h4>
                                    {/* <div class="table-responsive"> */}
                                        {/* <div id="dataTable1_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4"> */}
                                            {/* <div class="row"> */}
                                                {/* <div class="col-sm-12"> */}
                                                {/* id="dataTable1   this is the table id" */}
                                                    {/* <table  width="100%" class="table table-striped table-lightfont dataTable" role="grid" aria-describedby="dataTable1_info"  style={{width: '100%'}}> */}
                                                    <table className="table table-padded">
                                                        <thead>
                                                                    <tr role="row">
                                                                        <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                                            Task
                                                                        </th>
                                                                        <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                                            Status
                                                                        </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending"  style={{width: '280px'}}>
                                                                                Category
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                                                Start Date
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                                                End Date
                                                                            </th>
                                                                            <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                                                Delete Task
                                                                            </th>
                                                                    </tr>
                                                        </thead>
                                                        <tfoot>
                                                            <tr>
                                                                <th rowspan="1" colspan="1">Task</th>
                                                                <th rowspan="1" colspan="1">Status</th>
                                                                <th rowspan="1" colspan="1">Category</th>
                                                                <th rowspan="1" colspan="1">Start Date</th>
                                                                <th rowspan="1" colspan="1">End Date</th>
                                                                <th rowspan="1" colspan="1">Delete Task</th>

                                                            </tr>
                                                        </tfoot>
                                                        {all}
                                                    </table>
                                                </div>         
                                           {/* </div> */}
                                         {/* </div> */}
                                    {/* </div> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}
    
