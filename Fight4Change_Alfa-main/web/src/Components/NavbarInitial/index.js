import React from 'react'
import {FaBars} from 'react-icons/fa'
import logo from '../../Images/logo_web.png'
import {animateScroll as scroll} from 'react-scroll'
import './nav.css'

import {Nav,NavbarContainer, NavLogo, MobileIcon,NavMenu,NavItem,NavLinks, NavBtn,NavBtnLink, Menu,NavLinks1} from './NavbarElements'

const Navbar = ({toggle}) => {


const toggleHome = () => {
    scroll.scrollToTop();
}

    return (
        <Nav >
            <NavbarContainer>
                <NavLogo to='/' onClick={toggleHome}>
                    <img src={logo} className = "photo"  alt="logo" />
                </NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars/>
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks  to = "about" smooth={true} duration= {500} spy={true} exact='true' offset={-80} activeClass="active" >About</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "discover" smooth={true} duration= {500} spy={true} exact='true' offset={-80} >Discover</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "team" smooth={true} duration= {500} spy={true} exact='true' offset={-80} >The Team</NavLinks>
                    </NavItem>
                    
                </NavMenu>
                <Menu>
                    <NavBtn>
                        <NavBtnLink to ="/login">Log in</NavBtnLink>
                    </NavBtn>
                    <NavItem>
                        <NavLinks1 to = "/signup">Sign Up</NavLinks1>
                    </NavItem>
                    
                      
    
                </Menu>
            </NavbarContainer>
            
        </Nav>
    )
}

export default Navbar
