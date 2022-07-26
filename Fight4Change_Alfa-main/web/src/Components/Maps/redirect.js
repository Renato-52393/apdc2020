import {Link} from 'react-router-dom'
import styled from "styled-components"




export const BtnRedirect = styled.nav` 
      display:flex;
      align-items: center;

    
`

export const BtnLinkRedirect = styled(Link)` 
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
  
`