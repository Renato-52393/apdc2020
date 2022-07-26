import styled from "styled-components"
import {Link} from 'react-router-dom'



export const BtnRoute= styled.nav` 
      display:flex;
      align-items: center;

      @media screen and (max-width:768px){
            display:none;
      }

`
export const BtnLinkRoute = styled(Link)` 
    display: absolute;
    z-index:9;
    width: 260px;
    height: 50px;
    margin-top:-32.5rem;
    margin-left:-3rem;
    position: center;
    text-decoration: underline;
    text-align: center;

    border-radius: 2px;
    background:none;
    outline: none;
    border: none;
    color: #000;
    font-size: 1rem;

&:hover{
    cursor: pointer;
   
    transition: all 0.4s ease-out;
      color:#01bf71;
}
`

export const BtnLinkEvent = styled(Link)` 
    display: absolute;
    z-index:9;
    width: 260px;
    height: 50px;
    margin-top:-32.5rem;
    margin-left:36rem;
    position: center;
    text-decoration: underline;
    text-align: center;

    border-radius: 2px;
    background:none;
    outline: none;
    border: none;
    color: #000;
    font-size: 1rem;

&:hover{
    cursor: pointer;
   
    transition: all 0.4s ease-out;
      color:#01bf71;
}
`

export const BtnLinkLRoute = styled(Link)` 
    display: absolute;
    z-index:9;
    width: 260px;
    height: 50px;
    margin-top:-4rem;
    margin-left:-2.6rem;
    position: center;
    text-decoration: underline;
    text-align: center;

    border-radius: 2px;
    background:none;
    outline: none;
    border: none;
    color: #000;
    font-size: 1rem;

&:hover{
    cursor: pointer;
   
    transition: all 0.4s ease-out;
      color:#01bf71;
}
`

export const BtnLinkMenu = styled(Link)` 
    display: absolute;
    
    background:none;
    outline: none;
    border: none;
    color: #000;
    font-size: 1rem;

&:hover{
    cursor: pointer;
   
    transition: all 0.4s ease-out;
      color:#01bf71;
}
`

export const FilterBtn = styled.button` 
      border-radius:50px;
      background:#3AA285;
      white-space: nowrap;
      padding:10px 22px;
      color:#ffffff;
      font-size:16px;
      outline:none;
      border: none;
      cursor:pointer;
      transition:all 0.2s ease-in-out;
      text-decoration: none;
      margin-top:2rem;

&:hover{
      transition:all 0.2s ease-in-out;
      color: #3AA285;
      background:#fff
}
`
export const BtnLink = styled(Link)` 
    display: absolute;
    
    background:none;
    outline: none;
    border: none;
    color: #000;
    font-size: 1rem;
    

&:hover{
    cursor: pointer;
   
    transition: all 0.4s ease-out;
      color:#01bf71;
}
`
