import React, { Component } from 'react'
import Layout from '../Layout/Layout';
import Moment from 'react-moment'
import Swal from 'sweetalert2';
import _ from 'lodash';
import chunk from 'lodash/chunk';



export default class Notification extends Component {

    state={
        data:[

        ],
        pending:[

        ],
        completed:[

        ],
        skipped:[

        ],
        loaded:false
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
                      title:'Sorry!!',
                      text: 'Tasks cant be loaded please Check your internet Connection'
                    }
                  )
            } );
           
    }

    addDataToState = (data) => {
        let pendingtasks = [];
        let completedtasks = [];
        let skippedtasks = []


        _.reverse(data)
        this.setState({data});

        this.state.data.map(task => 
            {
                if(task.statusReturner == 3)
                {
                    pendingtasks.push(task);
                }
                else if(task.statusReturner == 5)
                {
                    completedtasks.push(task);
                }
                else if(task.statusReturner == 6)
                {
                    skippedtasks.push(task);
                }
                
            }
        )
        let pendingNotificationSetter = pendingtasks.length;
        window.localStorage.setItem('pendingtasks', pendingNotificationSetter.toString());

        this.setState({pending:pendingtasks, completed:completedtasks, skipped:skippedtasks, loaded:true});
    }

    handleskipClick = (e,id) => {
        //Not tested
        
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
                let skipped = this.state.skipped;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'delete'
                })
                .then(response => response.json())
                .then(json => {
                        // console.log(json);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Task has been deleted.',
                            type: 'success'
                        }) 
                        let skipUpdate = skipped.filter(task => task.id !== id);
                        this.setState({skipped:skipUpdate});
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
                    'Cancelled!!',
                    'Your Task is safe ',
                    'error'
                  )
            }
          }
          )  
    }

    handlecompleteClick = (e,id) => {
        
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
                let complete = this.state.completed;
                let url = `http://localhost:5000/api/todo/${id}`;
        
                fetch(url,{
                    method: 'delete'
                })
                .then(response => response.json())
                .then(json => {
                        // console.log(json);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Task has been deleted.',
                            type: 'success'
                        }) 
                        let completeUpdate = complete.filter(task => task.id !== id);
                        this.setState({completed:completeUpdate});
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
                    'Your Task is safe ',
                    'error'
                  )
            }
          }
        )
    }
    //this is the button that accepts requests
    handleAcceptedClick(e,id){
        Swal.fire({
            title:` Are you sure?`,
            text: 'You Want To Accept This Task!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Accept!',
            cancelButtonText: 'No, keep it!'
          })
          .then((result) => {
            if (result.value) {
                let url = `http://localhost:5000/api/todo/accepttask/${id}`;
        
                fetch(url,{
                    method: 'Put'
                })
                .then(response => response.json())
                .then(json => {
                        // console.log(json, `This is the json respone`);
                        Swal.fire({
                            title: 'Accepted!',
                            text: 'Your Task is Currently Ongoing.',
                            type: 'success'
                        }) 
                        this.addDataToState(json);
                    }
                ) 
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'This Task Cant Be Acceptedd Please Check Your Internet Connection'
                        }
                      )
                } );
                
               

            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Task is still Pending ',
                    'info'
                  )
            }
          }
        )
    }
//this button declines requests
    handleDeclinedClick = (e,id) =>{
        Swal.fire({
            title:` Are you sure?`,
            text: 'You Want To Accept This Task!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Accept!',
            cancelButtonText: 'No, keep it!'
          })
          .then((result) => {
            if (result.value) {
                let url = `http://localhost:5000/api/todo/declinetask/${id}`;
        
                fetch(url,{
                    method: 'Put'
                })
                .then(response => response.json())
                .then(json => {
                        // console.log(json, `This is the json respone`);
                        Swal.fire({
                            title: 'Declined!',
                            text: 'Your Task Has Been Declined Successfully.',
                            type: 'success'
                        }) 
                        this.addDataToState(json);
                    }
                )
                .catch(error => { 
                    console.log(error)
                    Swal.fire(
                        {
                          type: `error`,
                          title:`Opps!!`,
                          text: `This Task Can't Be Acceptedd Please Check Your Internet Connection`
                        }
                      )
                } )
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Task is still Pending ',
                    'info'
                  )
            }
        });
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
        //   console.log(category, 'category is console logged ')
          return category;
    }
    timeFormater = (date) =>{
        let formatedDate = date;
        return <Moment format="ddd MMM Do, YYYY HH:mm">{formatedDate}</Moment>

    }


    render() {
        let loaded = this.state.loaded;
        let pend;
        let complete;
        let skip;
        let pending = this.state.pending;
        let completed = this.state.completed;
        let skipped = this.state.skipped;

        if(loaded === true)
        {
            
            pend = pending.map(pending => {
                return (
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1"><h5>{pending.name}</h5></td>
                                        <td><h5>{this.categoryReturnMethod(pending.category)}</h5></td>
                                        <td><h5>{this.timeFormater(pending.startTime)}</h5></td>                 
                                        <td><h5>{this.timeFormater(pending.endTime)}</h5></td>
                                        <td>
                                            <a class="badge badge-success" href="#" onClick={(e,id = pending.id) => this.handleAcceptedClick(e,id)}>
                                                Accept
                                            </a>
                                            <a class="badge badge-warning" href="#"  onClick={(e,id = pending.id) => this.handleDeclinedClick(e,id)}>
                                                Decline
                                            </a>
                                         </td>
                                   </tr>
                                </tbody>
                );
            });
            // console.log(pend);
        }
        else
        {
            pend = <h6>Loading...</h6>
        }

        if(loaded === true)
        {
            complete = completed.map(completed => {
                return (
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td class="sorting_1"><h5>{completed.name}</h5></td>
                                        <td><h5>{this.categoryReturnMethod(completed.category)}</h5></td>
                                        <td><h5>{this.timeFormater(completed.startTime)}</h5></td>
                                        <td><h5>{this.timeFormater(completed.endTime)}</h5></td>
                                        <td onClick={(e,id = completed.id) => this.handlecompleteClick(e,id)}>
                                            <a class="badge badge-danger" href="#">
                                                Delete
                                                <i class="os-icon os-icon-ui-15"></i>
                                            </a>
                                         </td>
                                   </tr>
                                </tbody>    
                );
            });
            // console.log(complete);
        }
        else
        {
            complete = <h6>Loading...<i className="fa fa=cogs"></i></h6>
        }

        if(loaded === true)
        {
            skip = skipped.map(skip => {
                return (
                
                                <tbody>
                                    <tr role="row" class="odd">
                                        <td><h5>{skip.name}</h5></td>
                                        <td><h5>{this.categoryReturnMethod(skip.category)}</h5></td>
                                        <td><h5>{this.timeFormater(skip.startTime)}</h5></td>        
                                        <td><h5>{this.timeFormater(skip.endTime)}</h5></td>
                                        <td onClick={(e,id = skip.id) => this.handleskipClick(e,id)}>
                                            <a class="badge badge-danger" href="#">
                                                Delete
                                                <i class="os-icon os-icon-ui-15"></i>
                                            </a>
                                        </td>
                                   </tr>
                                </tbody>
                                
                );
            });
            // console.log(skip);
        }
        else
        {
            skip = <h6>Loading...</h6>
        }
        
        // <td onClick={(e,id = data.id) => this.handleClick(e,id)}>
        //     <a class="task-btn-delete" ><span>Delete</span><i class="os-icon os-icon-ui-15"></i></a>
        // </td>
        return (
            <div>
                <Layout>
                    <div className="content-w">
                        <div className="content-i">
                            <div className="content-box">
                                <div class="element-wrapper">
                                    <h4 class="element-header">This Are Your Pending Tasks</h4>
                                    <table class="table table-padded">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Start Time</th>
                                                <th class="text-center">End Time</th>
                                                <th>Accept/Dcline Tasks</th>
                                            </tr>
                                        </thead>
                                        {pend}
                                    </table>
                                </div>
                                <div class="element-wrapper">
                                    <h4 class="element-header">This Are Your Completed Tasks</h4>
                                    <table class="table table-padded">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Start Time</th>
                                                <th class="text-center">End Time</th>
                                                <th>Accept/Dcline Tasks</th>
                                            </tr>
                                        </thead>
                                        {complete}
                                    </table>
                                </div>
                                <div class="element-wrapper">
                                    <h4 class="element-header">This Are Your Skipped Tasks</h4>
                                    <table class="table table-padded">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Start Time</th>
                                                <th class="text-center">End Time</th>
                                                <th>Accept/Dcline Tasks</th>
                                            </tr>
                                        </thead>
                                        {skip}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                
            </div>
        )
    }
}
