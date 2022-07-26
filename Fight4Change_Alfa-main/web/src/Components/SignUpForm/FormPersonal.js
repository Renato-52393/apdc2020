import React, { Component } from 'react';
//import Axios from 'axios';

import './Form.css';
const formValid = rest => {
    let valid = true;

    if (rest.zipcode.length === 0 && rest.address.length === 0) {
        valid = false;
    }

    console.log(valid);

    return valid;
}

export class FormPersonal extends Component {
    continue = e => {
        e.preventDefault();

        const request = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                userId: this.props.values.email,
                username: this.props.values.username,
                password: this.props.values.password,
                confirmPassword: this.props.values.confirmPassword,
                address: this.props.values.address,
                zipcode: this.props.values.zipcode
            })
        };
        fetch('https://apdc-fasebeta.appspot.com/signup', request)
            .then(async response => {
                   
                if (response.ok) {
                    console.log("hellllloooooo")
                    console.log("signup" + request.body);
                    if (formValid(this.props.values)) {
                        this.props.nextStep();

                    }
                }
                else {
                    console.log("Something went wrong")

                }
            })
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, handleChange } = this.props;

        return (
            <div className='form-content-right'>
                <form className='form' onSubmit={this.continue}>

                    <div className='form-inputs'>
                        <label className='form-label'>Address</label>
                        <input
                            className='form-input'
                            type='text'
                            name='address'
                            placeholder='Enter your address'
                            onChange={handleChange('address')}
                            defaultValue={values.address}
                        />
                        {this.props.values.address.length === 0 && <p className="p">Address required</p>}
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>Zip Code</label>
                        <input
                            className='form-input'
                            type='text'
                            name='zipcode'
                            placeholder='Enter your zipcode'
                            onChange={handleChange('zipcode')}
                            defaultValue={values.zipcode}
                        />
                        {this.props.values.zipcode.length === 0 && <p className="p">Zip Code required</p>}
                    </div>

                    <button className='form-input1-btn' label='SignUp' type='submit' >Sign Up</button>
                    {(this.props.values.zipcode.length === 0 || this.props.values.address.length === 0) && (<p className="p">Please fill the missing entries</p>)}

                    <button className='form-input2-btn' label='Back' onClick={this.back}>Back</button>
                    <span className='form-input-login'>
                        Already have an account? Login <a href='/login'>here</a>
                    </span>
                </form>
            </div>



        );
    }

}


export default FormPersonal;
