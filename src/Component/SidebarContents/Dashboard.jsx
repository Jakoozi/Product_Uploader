import React from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Moment from 'react-moment';



class Dashboard extends React.Component{

    state= {
        data:[

        ],

        scheduled:[

        ],
        unscheduled:[

        ],
        pending:[

        ],
        ongoing:[

        ],
        completed:[

        ],
        skipped:[

        ],


        schoolscheduled:[

        ],
        workscheduled:[

        ],
        chillingscheduled:[

        ],

        schoolunscheduled:[

        ],
        workunscheduled:[

        ],
        chillingunscheduled:[

        ],
       
        loaded:false,
        filtered:false,
        item:7
    }

    //this method Gets all the Tasks from the data base and sends it to the addDataToState method(IT IS WORKING)
    componentDidMount(){
        let id = Number(window.localStorage.getItem('userid'));
        let url = `http://localhost:5000/api/todo/getByUserId/${id}`;
        // this.notifyMethod();

            fetch(url)
            .then(response => response.json())
            .then(json => this.addDataToState(json)) 
            .catch(error => { 
                console.log(error)
                Swal.fire(
                    {
                      type: 'error',
                      title:'Sorry!',
                      text: 'Tasks cant load please Check your internet Connection'
                    }
                  )
            } );  
            
            
    }


    //this is the method that sets the state to display the tasks. (it is WORKING)
    addDataToState = (data) => {

        _.reverse(data);

        this.setState({data,loaded:true});
        // console.log(this.state.data, `this is the state in the addDataToState method`);

        let scheduled = [];
        let unscheduled = [];
        let pending = [];
        let ongoing = [];
        let completed = [];
        let skipped = [];
        let schoolunscheduled = [];
        let workunscheduled = [];
        let chillingunscheduled = [];
        let schoolscheduled = [];
        let workscheduled = [];
        let chillingscheduled = [];
        




        this.state.data.map((task) => {
            if(task.statusReturner === 1)
            {
                scheduled.push(task);
            }
            else if(task.statusReturner === 2)
            {
                unscheduled.push(task);
            }
            else if(task.statusReturner === 3)
            {
                pending.push(task);
               
            }
            else if(task.statusReturner === 4)
            {
                ongoing.push(task);
            }
            else if(task.statusReturner === 5)
            {
                completed.push(task);
            }
            else if(task.statusReturner === 6)
            {
                skipped.push(task);
            }
            
        });
    
        //this is to Map/Seperate all UNSCHEDULED tasks according to there category
        unscheduled.map((task) => {
            if(task.category === 1) 
            {
                schoolunscheduled.push(task);
               
            }
            else if(task.category === 2)
            {
                chillingunscheduled.push(task);
            }
            else if(task.category === 3)
            {
                workunscheduled.push(task);
            }
        });

        //this is to map ALL SCHEDULED tasks acording to there category
        scheduled.map((task) => {
            if(task.category === 1) 
            {
                schoolscheduled.push(task);
               
            }
            else if(task.category === 2)
            {
                chillingscheduled.push(task);
            }
            else if(task.category === 3)
            {
                workscheduled.push(task);
            }
        });
        //i set local storage to number of pending for the notification sake
        let pendingNotificationSetter = pending.length;
        window.localStorage.setItem('pendingtasks', pendingNotificationSetter.toString());
       
        let slicedpending = pending.slice(0,4);
        let slicedongoing = ongoing.slice(0,4);
        let slicedcompleted = completed.slice(0,4);
        let slicedskipped = skipped.slice(0,4);
        let slicedschoolunscheduled = schoolunscheduled.slice(0,4);
        let slicedchillingunscheduled = chillingunscheduled.slice(0,4);
        let slicedworkunscheduled = workunscheduled.slice(0,4);
        let slicedschoolscheduled = schoolscheduled.slice(0,4);
        let slicedchillingscheduled = chillingscheduled.slice(0,4);
        let slicedworkscheduled = workscheduled.slice(0,4);
       

        this.setState({scheduled:scheduled ,unscheduled:unscheduled, pending:slicedpending, ongoing:slicedongoing, completed:slicedcompleted, skipped:slicedskipped, schoolunscheduled:slicedschoolunscheduled, chillingunscheduled:slicedchillingunscheduled, workunscheduled:slicedworkunscheduled, schoolscheduled:slicedschoolscheduled, chillingscheduled:slicedchillingscheduled, workscheduled:slicedworkscheduled});
    }
    
    //(THE TWO ARE WORKING)
    daySetter = (value) => {
        switch(value){
            case 0: return 'Sun'
            case 1: return 'Mon'
            case 2: return 'Tue'
            case 3: return 'Wed'
            case 4: return 'Thur'
            case 5: return 'Fri'
            case 6: return 'Sar'

            default: return ''
        }  
    } 
    monthSetter = (value) => {
        switch(value){
            case 0: return 'Jan'
            case 1: return 'Feb'
            case 2: return 'Mar'
            case 3: return 'Apr'
            case 4: return 'May'
            case 5: return 'Jun'
            case 6: return 'July'
            case 7: return 'Aug'
            case 8: return 'Sep'
            case 9: return 'Oct'
            case 10: return 'Nov'
            case 11: return 'Dec'

            default: return ''
        }  
    } 
    //This is the Delete method. (it is working )
    handleClick = (e,id) => {
        
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
                .then(json =>{

                    let dataUpdate = [];
                    //this filters the whole data toremove the one that was just deleted
                    data.map(task => {
                        if(task.id !== id)
                        {
                            dataUpdate.push(task);
                        }
                    });
                    // this is to call the method that sets the tasks to the dome to repass its data without the deleted one
                    this.addDataToState(dataUpdate);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your Task Has been deleted.',
                        type: 'success'
                    }) 
                } 
                ) 
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
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled!!',
                    'Your Task is safe.',
                    'error'
                  )
            }
          }
        )

    }
    //This is to Acccept a task (it is working )
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
    //This is to decline a task(ITS NOT WORKING)
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

    timeFormater = (date) =>{
        let formatedDate = date;
        return <Moment format=" HH:mm">{formatedDate}</Moment>
    }
    dateFormater = (date) =>{
        let formatedDate = date;
        return <Moment format="ddd MMM Do, YYYY">{formatedDate}</Moment>
    }
     
    render(){
        

        // console.log(this.state.pending, `this is the rendered pending`)
        
        let workunscheduled = this.state.workunscheduled;
        let schoolunscheduled = this.state.schoolunscheduled;
        let chillingunscheduled = this.state.chillingunscheduled;
        let workscheduled = this.state.workscheduled;
        let schoolscheduled = this.state.schoolscheduled;
        let chillingscheduled = this.state.chillingscheduled;
        let pending = this.state.pending;
        let ongoing = this.state.ongoing;
        let completed = this.state.completed;
        let skipped = this.state.skipped;
        let date = new Date();
        date = `${this.daySetter(date.getDay())}, ${this.monthSetter(date.getMonth())} ${date.getDate()}`;
        

        let unwork =  workunscheduled.map(task => 
            {
                return(
                    <li className="warning">{task.name}
                      {this.dateFormater(task.startTime)}
                </li>
                );
            }
        );

        let unschool =  schoolunscheduled.map(task => 
            {
                return(
                    <div>
                        <li className="warning">
                            {task.name}
                            {this.dateFormater(task.startTime)}
                        </li>
                    </div>
                    
                );
            }
        );

        let unLeisure =  chillingunscheduled.map(task => 
            {
                return(
                    <div>
                        <li className="warning">{task.name}</li>
                        {this.dateFormater(task.startTime)}
                    </div>
                       
                );
            }
        );
        let work =  workscheduled.map(task => 
            {
                return(
                    <li class="draggable-task success ">
                        <div class="todo-task-drag drag-handle">
                            <i class="os-icon os-icon-hamburger-menu-2 drag-handle"></i>
                        </div>
                        <div class="todo-task">
                            <span contenteditable="true">{task.name}</span>
                            {this.timeFormater(task.startTime)}
                            <div class="todo-task-buttons">
                                <a class="task-btn-delete" onClick={(e,id = task.id) => this.handleClick(e,id)} >
                                    <span>Delete</span>
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                );
            }
        );

        let school =  schoolscheduled.map(task => 
            {
                return(
                    <li class="draggable-task success">
                        <div class="todo-task-drag drag-handle">
                            <i class="os-icon os-icon-hamburger-menu-2 drag-handle"></i>
                        </div>
                        <div class="todo-task">
                            <span contenteditable="true">{task.name}</span>
                            {this.timeFormater(task.startTime)}
                            <div class="todo-task-buttons">
                                <a class="task-btn-delete" onClick={(e,id = task.id) => this.handleClick(e,id)} >
                                    <span>Delete</span>
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                );
            }
        );

        let leisure =  chillingscheduled.map(task => 
            {
                return(
                    <li class="draggable-task success">
                        <div class="todo-task-drag drag-handle">
                            <i class="os-icon os-icon-hamburger-menu-2 drag-handle"></i>
                        </div>
                        <div class="todo-task">
                            <span contenteditable="true">{task.name}</span>
                            {this.timeFormater(task.startTime)}
                            <div class="todo-task-buttons">
                                <a class="task-btn-delete" onClick={(e,id = task.id) => this.handleClick(e,id)} >
                                    <span>Delete</span>
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                );
            }
        );

         let pendingrender =  pending.map(task => 
            {
                return(
                    <li class="draggable-task warning">
                        <div class="todo-task-drag drag-handle">
                            <i class="os-icon os-icon-hamburger-menu-2 drag-handle"></i>
                        </div>
                        <div class="todo-task">
                            <span contenteditable="true">{task.name}</span>
                            {this.timeFormater(task.startTime)}
                            <div class="todo-task-buttons">
                                <a class="badge badge-success" href="#" onClick={(e,id = task.id) => this.handleAcceptedClick(e,id)}>
                                    Accept
                                </a>
                                <a class="badge badge-warning" href="#"  onClick={(e,id = task.id) => this.handleDeclinedClick(e,id)}>
                                    Decline
                                </a>
                                {/* <a class="task-btn-delete" onClick={(e,id = task.id) => this.handleClick(e,id)} >
                                    <span>Delete</span>
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a> */}
                            </div>
                        </div>
                    </li>
                );
            }
        );

        let ongoingrender = ongoing.map(task =>
            {
                return(
                    <li class="draggable-task warning">
                        <div class="todo-task-drag drag-handle">
                            <i class="os-icon os-icon-hamburger-menu-2 drag-handle"></i>
                        </div>
                        <div class="todo-task">
                            <span contenteditable="true">{task.name}</span>
                            {this.timeFormater(task.endTime)}
                            <div class="todo-task-buttons">
                                <a class="task-btn-delete" onClick={(e,id = task.id) => this.handleClick(e,id)} >
                                    <span>Delete</span>
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                );
            }
        );

        let completedrender = completed.map(task =>
            {
                return(
                    <li className="success">{task.name}
                     {this.timeFormater(task.endTime)}
                        {/* <div class="todo-task">
                            <span>
                                <a class="badge badge-success" onClick={(e,id = task.id) => this.handleClick(e,id)}>
                                    Delete
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a>
                            </span>
                        </div> */}
                    </li>
                );
            }
        )
        
        let skippedrender = skipped.map(task => {
                return(
                    <li class="draggable-task success ">
                        {task.name}
                        {this.timeFormater(task.endTime)}
                        {/* <div class="todo-task-drag drag-handle">
                            <i class="os-icon os-icon-hamburger-menu-2 drag-handle"></i>
                        </div> 
                        <div class="todo-task">
                            <span contenteditable="true">{task.name}</span>
                            {this.timeFormater(task.endTime)}
                            <div class="todo-task-buttons">
                                <a class="task-btn-delete" onClick={(e,id = task.id) => this.handleClick(e,id)} >
                                    <span>Delete</span>
                                    <i class="os-icon os-icon-ui-15"></i>
                                </a>
                            </div>
                        </div> */}
                    </li>
                );
            }
            
        );




        return(
            <Layout>
                
                <div class="content-i">
                    <div class="content-box"> 
                        <div class="todo-app-w">
                            <div class="todo-sidebar">
                                <div class="todo-sidebar-section">
                                        <h4 class="todo-sidebar-section-header">Task Category
                                        </h4>
                                        <div class="todo-sidebar-section-contents">
                                            <ul class="projects-list">
                                                <li>
                                                    <span>Work</span>
                                                </li>
                                                <li>
                                                    <span>School</span>
                                                </li>
                                                <li>
                                                    <span>Leisure</span>
                                                </li>
                                                <li class="add-new-project">
                                                    <Link to="/Create" className="nav-link">Add New Task</Link>
                                                </li>
                                            </ul>
                                        </div>
                                </div>
                                {/*Sidebar Section 1 ends */}
                                {/*Sidebar Section 2 starts */}
                                <div class="todo-sidebar-section">
                                    <h4 class="todo-sidebar-section-header"  >
                                        <span>COMPLETED TASKS</span>
                                    </h4>
                                    <div class="todo-sidebar-section-contents">
                                        {
                                            <ul class="tasks-list">
                                                 {completedrender}
                                            </ul>
                                        }
                                    </div>
                                </div>
                                {/*Sidebar Section 2 ends */}
                                {/*side bar Section 3 begins*/ }
                                <div class="todo-sidebar-section">
                                    <h4 class="todo-sidebar-section-header">
                                        <span>UNSCHEDULED TASKS</span>
                                    </h4>
                                    <div class="todo-sidebar-section-contents">
                                        <div class="todo-sidebar-section-sub-section">
                                            <div class="todo-sidebar-section-sub-section-toggler">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </div>
                                            <div class="todo-sidebar-section-sub-header">
                                                <i class="os-icon os-icon-documents-11"></i>
                                                <h6>Work</h6>
                                            </div>
                                            <div class="todo-sidebar-section-sub-section-content">
                                                {
                                                     <ul class="tasks-list">
                                                         {unwork}
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-sidebar-section-contents">
                                        <div class="todo-sidebar-section-sub-section">
                                            <div class="todo-sidebar-section-sub-section-toggler">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </div>
                                            <div class="todo-sidebar-section-sub-header">
                                                <i class="os-icon os-icon-ui-34"></i>
                                                <h6>Scool</h6>
                                            </div>
                                            <div class="todo-sidebar-section-sub-section-content">
                                            {
                                                     <ul class="tasks-list">
                                                         {unschool}
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-sidebar-section-contents">
                                        <div class="todo-sidebar-section-sub-section">
                                            <div class="todo-sidebar-section-sub-section-toggler">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </div>
                                            <div class="todo-sidebar-section-sub-header">
                                                <i class="os-icon os-icon-ui-21"></i>
                                                <h6>Leisure</h6>
                                            </div>
                                            <div class="todo-sidebar-section-sub-section-content">
                                                {
                                                     <ul class="tasks-list">
                                                         {unLeisure}
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Sidebar Section 3 ends */}
                            </div>
                            {/*Todo Side Bar Ends */}



                            {/*Todo Content Start */}
                            <div class="todo-content">
                                <h4 class="todo-content-header">
                                    <i class="os-icon os-icon-ui-83"></i>
                                    <span>Today's Tasks</span>
                                </h4>
                                <h5 class="tasks-sub-header">{date}</h5>
                                <div class="all-tasks-w">
                                    {/*Task Section 1 Starts*/}
                                    <div class="tasks-section">
                                        <div class="tasks-header-w">
                                            {/* <a class="tasks-header-toggler" href="#">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </a> */}
                                            <h5 class="tasks-header">PENDING TASKS</h5>
                                            <Link class="add-task-btn"  to="/Create" >
                                                <i class="os-icon os-icon-ui-22"></i>
                                                <span>Add Task</span>
                                            </Link>
                                        </div>
                                        <div class="tasks-list-w">
                                            {
                                                <ul class="tasks-list">
                                                    {pendingrender}
                                                </ul>
                                            }
                                            {/*ul 1 starts */}
                                            
                                            {/*ul 1 Endss */}
                                        </div>
                                    </div>
                                     {/*Task Section 1 Ends*/}

                                    {/*Task Section 2 Starts */}
                                    <div class="tasks-section">
                                        {/* <!--START - TASKS HEADER--> */}
                                        <div class="tasks-header-w">
                                            {/* <a class="tasks-header-toggler" href="#">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </a> */}
                                            <h5 class="tasks-header">SCHEDULED TASKS</h5>
                                            <Link class="add-task-btn"  to="/Create" >
                                                <i class="os-icon os-icon-ui-22"></i>
                                                <span>Add Task</span>
                                            </Link>
                                        </div>
                                        {/* <!--END - TASKS HEADER--> */}
                                        {/*Task List Start */}
                                        <div class="tasks-list-header">Work</div>
                                        {/*ul 1 Starts*/}
                                            {
                                                <ul class="tasks-list">
                                                    {work}
                                                </ul>
                                            }
                                        <div class="tasks-list-header">School</div>
                                            {
                                                <ul class="tasks-list">
                                                    {school}
                                                </ul>
                                            }
                                        <div class="tasks-list-header">Leisure</div>
                                            {
                                                <ul class="tasks-list">
                                                    {leisure}
                                                </ul>
                                            }

                                    {/*Task List Ends */}
                                    </div>
                                    {/*Task Section 2 Ends */}

                                    {/*Task Section 3 Starts */}
                                    <div class="tasks-section">
                                        <div class="tasks-header-w">
                                            {/* <a class="tasks-header-toggler" href="#">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </a> */}
                                            <h5 class="tasks-header">ONGOING TASKS</h5>
                                                {/* <span class="tasks-sub-header">Tue, Sep 24th</span> */}
                                            <Link class="add-task-btn"  to="/Create" >
                                                <i class="os-icon os-icon-ui-22"></i>
                                                <span>Add Task</span>
                                            </Link>
                                        </div>
                                        <div class="tasks-list-w">
                                            {/*ul 1 Starts */}
                                            {
                                                <ul class="tasks-list">
                                                    {ongoingrender}
                                                </ul>
                                            }
                                         
                                            {/*ul 1 Ends */}
                                        </div>
                                    </div>
                                    {/*Task Section 3 Endss */}
                                    {/*Task Section 4 Starts */}
                                    <div class="tasks-section">
                                        <div class="tasks-header-w">
                                            {/* <a class="tasks-header-toggler" href="#">
                                                <i class="os-icon os-icon-ui-23"></i>
                                            </a> */}
                                            <h5 class="tasks-header">SKIPPED TASKS</h5>
                                                {/* <span class="tasks-sub-header">Tue, Sep 24th</span> */}
                                            <Link class="add-task-btn"  to="/Create" >
                                                <i class="os-icon os-icon-ui-22"></i>
                                                <span>Add Task</span>
                                            </Link>
                                        </div>
                                        <div class="tasks-list-w">
                                            {/*ul 1 Starts */}
                                            {
                                                <ul class="tasks-list">
                                                    {skippedrender}
                                                </ul>
                                            }
                                            {/*ul 1 Ends */}
                                        </div>
                                    </div>
                                    {/*Task Section 4 Endss */}

                                </div>
                            </div>
                            {/*Todo Content Ends */}

                            {/*<Modal - Edit Task start*/} 
                            <div aria-hidden="true" class="modal fade" id="taskModal" role="dialog" tabindex="-1">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header faded smaller">
                                            <div class="modal-title">
                                                <span>Assigned to:</span>
                                                <img alt="" class="avatar" src="img/avatar1.jpg" />
                                                <span>Due Date: </span>
                                                <strong>Sep 12th, 2017</strong>
                                            </div>
                                            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                                                <span aria-hidden="true"> ×</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div class="form-group">
                                                    <label for="">Name</label>
                                                    <input class="form-control" placeholder="Enter task name" type="text" value="Visit Home Depot to find out what is needed to rebuild backyard patio" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="">Description</label>
                                                    <textarea class="form-control" name="" rows="3">The similar diesel only tell deference and likewise, thought, nonetheless, for ahead school. The were organization.</textarea>
                                                </div>
                                                <div class="form-group">
                                                    <label for="">Media Attached</label>
                                                    <div class="attached-media-w">
                                                        <img src="img/portfolio9.jpg" />
                                                        <img src="img/portfolio2.jpg" />
                                                        <img src="img/portfolio12.jpg" />
                                                        <a class="attach-media-btn" href="#">
                                                            <i class="os-icon os-icon-ui-22"></i>
                                                            <span>Add Photos</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for=""> Due Date</label>
                                                            <div class="date-input">
                                                                <input class="single-daterange form-control" placeholder="Date of birth" type="text" value="04/12/1978" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="">Priority</label>
                                                            <select class="form-control">
                                                                <option>High Priority</option>
                                                                <option>Normal Priority</option>
                                                                <option>Low Priority</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer buttons-on-left">
                                                    <button class="btn btn-teal" type="button"> Save changes</button>
                                                    <button class="btn btn-link" data-dismiss="modal" type="button"> Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<Modal - Edit Task End */} 

                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Dashboard;

                                   
                                
                                    