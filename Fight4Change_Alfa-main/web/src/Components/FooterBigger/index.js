import React from 'react'

import {FooterContainer, FooterWrap,FooterLinksContainer, FooterLinkItems, FooterLinksWrapper,FooterLinkTitle,FooterLink, SocialLogo,SocialMediaWrap,SocialMedia,WebSiteRights} from './FooterElements'
import logo from '../../Images/logo_web.png'

import './footer.css'
import{animateScroll as scroll} from 'react-scroll';

const Footer = ({toggle}) => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }
    
    return (
        <>
         <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> About us</FooterLinkTitle>
                                <FooterLink to= "/login"> How it works</FooterLink>
                                <FooterLink to= "/login"> Testimonials</FooterLink>
                                <FooterLink to= "/login"> Terms of Services</FooterLink>
                            
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> Contact us</FooterLinkTitle>
                                <FooterLink to= "/login"> How it works</FooterLink>
                                <FooterLink to= "/login"> Testimonials</FooterLink>
                                <FooterLink to= "/login"> Terms of Services</FooterLink>
                            
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle> About us</FooterLinkTitle>
                                <FooterLink to= "/login"> How it works</FooterLink>
                                <FooterLink to= "/login"> Testimonials</FooterLink>
                                <FooterLink to= "/login"> Terms of Services</FooterLink>
                            
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle> About us</FooterLinkTitle>
                                <FooterLink to= "/login"> How it works</FooterLink>
                                <FooterLink to= "/login"> Testimonials</FooterLink>
                                <FooterLink to= "/login"> Terms of Services</FooterLink>
                            
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrap>
                 <SocialLogo to='/' onClick={toggleHome}>
                     <img src={logo} className = "logo"  alt="logo" />
                </SocialLogo>
                <WebSiteRights> Fight4Change © {new Date().getFullYear()} All rights reserved.</WebSiteRights>
                </SocialMediaWrap>
               
            </SocialMedia>
            </FooterWrap>
         </FooterContainer>   
        </>
    )
}

export default Footer
