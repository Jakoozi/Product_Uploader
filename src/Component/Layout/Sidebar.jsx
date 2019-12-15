import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { css } from 'glamor';

class SidebarComponent extends React.Component {


  render() {
    
    
    return (
      <div className="menu-and-user">
        <ToastContainer />
        <ul className="main-menu">
          <li className="sub-menu">
            <Link to="/" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-edit-1"></div>
              </div>
              {/* <span>Upload</span> */}
              Upload
            </Link>
          </li>
          <li className="sub-menu">
            <Link to="/View" className="nav-link">
              <div className="icon-w">
                <div className="os-icon
                os-icon-window-content">
                </div>
              </div>
              {/* <span>View Products</span> */}
              View Products
            </Link>
          </li>
          <li className="sub-menu">
            <Link to="/Edit" className="nav-link">
              <div className="icon-w">
                <div className="os-icon os-icon-edit-1"></div>
              </div>
              {/* <span>Upload</span> */}
              Edit
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default SidebarComponent;
