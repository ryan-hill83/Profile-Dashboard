import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component{
    render(){

      // let menu = [{name : 'Login', link : '/'},{name : 'My Profile', link : '/profile'},{name : 'All Profiles', link : '/profiles'}]
      // let menuItems = null
      
      // menuItems = menu.map((item, index) => {
      //   return <li className="nav-item nav-link" key={index}>{item.name}</li>
      // })
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <li><Link to={'/profile'} className="navbar-brand">Profile Dashboard</Link></li>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      {/* <a className="nav-item nav-link" href="#">Login</a>
      <a className="nav-item nav-link" href="#">My Profile</a>
      <a className="nav-item nav-link" href="#">All Profiles</a> */}
      <ul className="navbar-nav mr-auto">
      <li><Link to={'/'} className="nav-item nav-link">Login</Link></li>
      <li><Link to={'/profile'} className="nav-item nav-link">My Profile</Link></li>
      <li><Link to={'/profiles'} className="nav-item nav-link">All Profiles</Link></li>
      </ul>
    </div>
  </div>
  </nav>
</div>
        );
    }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin,
    isAuthenticated: state.isAuthenticated
  }
}
export default connect(mapStateToProps)(withRouter(Menu))