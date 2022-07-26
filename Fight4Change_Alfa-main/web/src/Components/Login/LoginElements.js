import styled from "styled-components"
import {Link} from 'react-router-dom'



export const Container = styled.div `
    min-height: 692px;
    position:fixed;
    bottom: 0;
    left:0;
    right: 0;
    top: 0;
    z-index:0;
    overflow:hidden;
    background:linear-gradient(0deg,rgb(255,255,255) 0%,rgba(169,229,206,1) 100%);
`;

export const FormWrap = styled.div` 
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width:480px){
        height:80%;
    }
` 


export const Icon = styled(Link) `
    margin-left: 32px;
    margin-top:32px;
    text-decoration:none;
    color:#fff;
    font-width:700;
    font-size:32px;

    @media screen and (max-width:480px){
        margin-left: 16px;
        margin-top:8px;
    }

`

export const FormContent = styled.div` 

    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;

    @media screen and (max-width:480px){
        padding:10px;
    }
`

export const Form = styled.form` 
   background: linear-gradient(0deg,rgb(169,229,206) 0%,rgba(22,126,101,1) 100%);
    max-width: 400px;
    height:auto;
    width: 100%;
    z-index:1;
    display:grid;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.9);

    @media screen and (max-width: 480px){
        padding: 32px 32px;
    }
`

export const FormH1= styled.h1` 
    margin-bottom: 40 px;
    color:#fff;
    font-size: 20px;
    font-weight: 400;
    text-align:center;

` 

export const FormLabel = styled.label` 

        margin-botton:8px;
        font-size:14px;
        color:#fff;

`

export const FormInput = styled.input `
    padding:16px 16px;
    margin-bottom: 32px;
    border:none;
    border-radius:4px;

`

export const FormButton = styled.button `


    background: #01bf71;
    padding:16px 0;
    border:none;
    border-radius: 4px;
    color:#fff;
    font-size: 20px;
    cursor:pointer;

`

export const Text = styled.span`
    text-align:center;
    margin-top:24px;
    color:#fff;
    font-size:14px;

`
export const BtnLogIn = styled.nav` 
      display:flex;
      align-items: center;

      @media screen and (max-width:768px){
            display:none;
      }

`

export const BtnLinkLogIn = styled.button` 
    display: inline-block;
    width: 160px;
    height: 50px;
 
    position: center;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    border-radius: 2px;
    background: linear-gradient(
      90deg,
      rgb(39, 176, 255) 0%,
      rgb(0, 232, 236) 100%
    );
    outline: none;
    border: none;
    color: #000;
    font-size: 1.5rem;
  


&:hover{
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(39, 143, 255) 0%,
      rgb(12, 99, 250) 100%
    );
    transition: all 0.4s ease-out;
      background:#fff
}
`



