import {Link} from 'react-router-dom'
import styled from "styled-components"


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

export const Btn = styled.nav` 
      display:flex;
      align-items: center;

      @media screen and (max-width:768px){
            display:none;
      }

`

export const BtnLink = styled(Link)` 
    display: inline-block;
    width: 160px;
    height: 50px;
    margin-top: 390px;
    margin-left: 172.5px;
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
