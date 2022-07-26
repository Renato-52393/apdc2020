import React from 'react'
import {SidebarContainer,Icon,CloseIcon, SidebarWrapper,SidebarMenu,SidebarLink} from './SidebarElements'

const Sidebar = ({isOpen,toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to ='/events' onClick={toggle}>
                        Events
                    </SidebarLink>
                    <SidebarLink to ='/institutions' onClick={toggle}>
                        Institutions
                    </SidebarLink>
                    <SidebarLink to ='/prizes' onClick={toggle}>
                        Prizes
                    </SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>

        </SidebarContainer>
            
        
    )
}

export default Sidebar
