import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component{
    render(){

    let authenticatedUser = [{name : 'Login', link : '/'},{name : 'My Profile', link : '/profile'},{name : 'All Profiles', link : '/profiles'}]
    let nonAuthenticatedUser = [{name: 'Login', link : '/'}]
    let MenuItem = null

    if(this.props.isAuthenticated){
      MenuItem = authenticatedUser.map((item, index) => {
          return <li key={index}><Link to={item.link} className="nav-item nav-link">{item.name}</Link></li>
      })}
    else{MenuItem = nonAuthenticatedUser.map((item, index) => {
     return <li key={index} className="nav-item nav-link" ><Link to={'/'}>Login</Link></li>
    })
    }
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
      <li><Link to={'/profile'} className="navbar-brand">The Profile Dashboard</Link></li>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <ul className="navbar-nav mr-auto">
      {MenuItem}
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

{/* <li><Link to={'/'} className="nav-item nav-link">Login</Link></li>
      <li><Link to={'/profile'} className="nav-item nav-link">My Profile</Link></li>
      <li><Link to={'/profiles'} className="nav-item nav-link">All Profiles</Link></li> */}