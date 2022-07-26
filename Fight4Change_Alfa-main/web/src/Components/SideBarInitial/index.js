import React from 'react'
import {SidebarContainer,Icon,CloseIcon, SidebarWrapper,SidebarMenu,SidebarLink,SideBtnWrap,SidebarRoute} from './SidebarElements'


const Sidebar = ({isOpen,toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to ='about' onClick={toggle}>
                        About
                    </SidebarLink>
                    <SidebarLink to ='discover' onClick={toggle}>
                        Discover
                    </SidebarLink>
                    <SidebarLink to ='team' onClick={toggle}>
                        The Team
                    </SidebarLink>
                    <SidebarLink to ='signup' onClick={toggle}>
                        Sign Up
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to = "/login">Log in</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>

        </SidebarContainer>
            
        
    )
}

export default Sidebar