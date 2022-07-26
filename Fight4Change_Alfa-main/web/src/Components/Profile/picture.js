import React, { Component } from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import avatar from '../../Images/avatar.svg';
import './FormP.css';

export class Picture extends Component {
  state = {
    profileImg: avatar,
  }
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result })
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };
  render() {
    const { profileImg } = this.state
    return (
      <div>
          <img src={profileImg} alt="" id="img" className="profileimg-container"/>
        <input  accept="image/*" className="hide" 
        id="input" type="file"
        onChange={this.imageHandler} />
          <label htmlFor="input" aria-label="upload picture" className="choose-picture">
          <PhotoCamera />
          </label>
        
      </div>
    );
  }
}

export default Picture;