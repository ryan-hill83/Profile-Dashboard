import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './head_logo.jpg'


class Menu extends Component{
    render(){

    let authenticatedUser = [{name : 'Login', link : '/'},{name : 'My Profile', link : '/profile'},{name : 'All Profiles', link : '/profiles'}]
    let nonAuthenticatedUser = [{name: 'Login', link : '/'}]
    let MenuItem = null

    if(this.props.isAuthenticated){
      MenuItem = authenticatedUser.map((item, index) => {
          return <li key={index}><Link to={item.link} className="nav-link">{item.name}</Link></li>
      })}
    else{MenuItem = nonAuthenticatedUser.map((item, index) => {
     return <li key={index} className="nav-link" ><Link to={'/'}>Login</Link></li>
    })
    }
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
      <li><Link to={'/profile'} className="navbar-brand"><img src={require('./head_logo.jpg')} className="logo" alt='logo'/>The Profile Dashboard</Link></li>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    
      <ul className="navbar-nav mr-auto flex-nowrap">
      {MenuItem}
      </ul>
    
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

{/* <li><Link to={'/'} className="nav-item nav-link">Login</Link></li>
      <li><Link to={'/profile'} className="nav-item nav-link">My Profile</Link></li>
      <li><Link to={'/profiles'} className="nav-item nav-link">All Profiles</Link></li> */}