import React, { Component } from 'react';
import Layout from '../../Layout/Layout';
import { Link } from 'react-router-dom';


export default class Setting extends Component {
    render() {
        return (
            <Layout>
           
                <ul className="breadcrumb">

                    <li className="breadcrumb-item"><Link to="/Dashboard" >Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to="/" >Logout</Link></li>
                    <li className="breadcrumb-item"><Link to="/Register" >Register</Link></li>
                    {/* <li className="breadcrumb-item"><Link to="/Create" >Create</Link></li>
                    <li className="breadcrumb-item"><Link to="/View" >Tasks</Link></li>      */}
                </ul>
                <div className="content-i">
                    <div className="content-box">
                        <div className="element-wrapper">
                            <div className="element-box" style={{ minHeight: '70vh' }}>
                                <h4 className="form-header">
                                    Edit Settings
                                </h4>
                                <div class="form-desc">Change your app settings here.</div>
                                <div className="form-body">
                                        <div className="form-group"><div className="os-icon os-icon-pie-chart-2"><span>Your Activit</span></div></div>
                                </div> 
                            </div>
                            <div class="floated-colors-btn second-floated-btn"> 
                                <div class="os-toggler-w">
                                    <div class="os-toggler-i">
                                        <div class="os-toggler-pill"></div>
                                    </div>
                                </div>
                                <span>Dark </span>
                                <span>Colors</span>
                            </div>
                        </div>
                    </div>
                </div>
                
               
                
                        
            </Layout>
        )
    }
}




