import React, { Component } from 'react';

class Menu extends Component{
    render(){
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Profile Dashboard</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="#">Login</a>
      <a className="nav-item nav-link" href="#">My Profile</a>
      <a className="nav-item nav-link" href="#">All Profiles</a>
    </div>
  </div>
  </nav>
</div>
        );
    }
}

export default Menu;