import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ALL_PROFILES_URL = 'https://theprofiledashboardserver.herokuapp.com/profiles'

class AllProfiles extends Component {
    state ={
        profiles: []
    }

componentDidMount(){
    this.fetchProfiles()
}

fetchProfiles = () => {
    axios.get(ALL_PROFILES_URL)
    .then(res => {
        const profiles = res.data;
        this.setState({profiles})
    })
}

    render(){
        
        let allProfiles = null
    
        allProfiles = this.state.profiles.map((profile, index) => {
            
            return <li key={index}>
            <h3>{profile.name}</h3>
            <img key={index} src={'https://theprofiledashboardserver.herokuapp.com/image/' + profile.filename}/>
            <h3>{profile.description}</h3>
            </li>
        })
        return(
        <div>
            {allProfiles}
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated : state.isAuthenticated
    }
  }
  export default connect(mapStateToProps)(withRouter(AllProfiles))