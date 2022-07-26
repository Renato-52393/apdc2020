import React from 'react'
import { Container, FormButton, FormContent, FormInput, FormLabel, FormWrap,Icon,Form,FormH1 } from './LoginElements'
import logo from '../../Images/logo_web.png';

const Login = () => {
    return (
        <>
        <Container>
            <FormWrap>
                <Icon to ="/">
                <img src={logo} className = "photo"  alt="logo" />
                 </Icon>
                <FormContent>
                    <Form action="#">
                        <FormH1>Log in to your account</FormH1>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput type='email' required/>
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type='password' required/>
                        <FormButton type = 'submit'>Log In</FormButton>
                    </Form>
                </FormContent>
            </FormWrap>


        </Container>
        </>
    )
}

export default Login
