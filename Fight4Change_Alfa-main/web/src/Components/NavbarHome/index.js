import React from 'react'
import {FaBars} from 'react-icons/fa'
import logo from '../../Images/logo_web.png'
import {animateScroll as scroll} from 'react-scroll'
import './nav.css'
import SideMenu from '../SideMenu/SideDrawer'

import {Nav,NavbarContainer, NavLogo, MobileIcon,NavMenu,NavItem,NavLinks} from './NavbarElements'

const Navbar = () => {

const toggleHome = () => {
    scroll.scrollToTop();
}

    return (
        <Nav >
            <NavbarContainer>
                <NavLogo to='/home' onClick={toggleHome}>
                    <img src={logo} className = "photo"  alt="logo" />
                </NavLogo>
                <SideMenu/>
                <MobileIcon>
                    <FaBars/>
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks  to = "/events">Events</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "/institutions">Institutions</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to = "/prizes">Prizes</NavLinks>
                    </NavItem>
                </NavMenu>
                   
            </NavbarContainer>
            
        </Nav>
    )
}

export default Navbar
