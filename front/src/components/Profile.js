import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ALL_PROFILES_URL = 'http://localhost:8080/profiles'

let allProfiles = [] 

class Profile extends Component{

    state = {
        profile: {},
        profiles: []        
      }
      
      componentDidMount() {
        this.fetchProfiles()
      }

      fetchProfiles = () => {
        axios.get(ALL_PROFILES_URL)
        .then(res => {
          const profiles = res.data;
          this.setState({profiles})
        })
      }

      // filterProfiles = (profiles) => {
      //     let user = this.props.user
      //     console.log(this.props.user)
      //     for(let i = 0; i < this.state.profiles.length; i++){
      //       if(profiles[i].user && profiles[i].user === user._id){
      //         allProfiles.push(profiles[i])           
      //       }}
      // }

      handleTextBoxOnChange = e => {
        this.setState({
          profile : {
            ...this.state.profile,
            [e.target.name] : e.target.value,
            user : this.props.user._id
          }
        })
      }

      fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0],
            profile: {
              ...this.state.profile,
            [e.target.name] : e.target.files[0].name
            }
        })
      }

      fileUploadHandler = () => {
          const fd = new FormData()
          fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
          axios.post('http://localhost:8080/upload', fd, {
              onUploadProgress: progressEvent => {
                  console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
              }
          })
          .then(res => {
              console.log(res)
          })
      }

      handleSubmitButtonClick = () => {
        let profile = this.state.profile
        axios.post('http://localhost:8080/profile', {
        profile
        })
      }


    render(){
      let user = this.props.user
      let allProfilesFiltered = this.state.profiles.map((profile, index) => {
            if(profile.user === user._id){
        return <li key={index}>
        <h3>{profile.name}</h3>
        <img key={index} src={'http://localhost:8080/image/' + profile.filename}/>
        <h3>{profile.description}</h3>
      </li>} })
  

        return(
        <div>
            <p>Name</p>
            <input type="text" name = "name" placeholder="Name" onChange={this.handleTextBoxOnChange}/>
            <p>Profile Picture</p>
            <input type="file" name = "image" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>
            <p>Description</p>
            <input type="text" name = "description" placeholder="Name" onChange={this.handleTextBoxOnChange}/><br/>
            <button onClick={this.handleSubmitButtonClick}>Submit</button>
            {allProfilesFiltered}
        </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isAuthenticated : state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Profile)

