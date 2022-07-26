
import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'


export const InfoContainer = styled.div`
    color: #fff;
    background: linear-gradient(0deg,rgb(169,229,206) 0%,rgba(22,126,101,1) 100%);

    `;

export const InfoWrapper = styled.div`
    display:  grid;
    z-index: 1;
    height: 660px;
    width:100%;
    max-width:1100px;
    margin-right: auto;
    margin-left:auto;
    padding: 0 24px;
    justify-content: center;
`;

export const InfoRow = styled.div`

display:grid;
grid-auto-columns:minmax(auto, 1fr);
margins-top:20px;
align-items: center;
grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'`: `'col1 col2'`)};
@media screen and (max-width: 960px){
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col1' 'col2'`: `'col1 col1' 'col2 col2'`)}; 
    } 

`;

export const Column1 = styled.div`
    
    padding: 0 15px;
    grid-area: col1;
    align-items: center;

`;
export const Column2 = styled.div`
    
    padding: 0 15px;
    grid-area: col2;
    align-items: center;

`;

export const TextWrapper = styled.div`
    max-width: 500px;
    padding-top: 0;
    padding-bottom: 60px;

`;
export const TopLine = styled.p`
    color: #fff;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform:uppercase;
    margin-bottom: 16px;
`;

/*export const Heading = styled(LinkR)`
    margin-bottom:24px;
    font-size: 48px;
    line-height:1.1;
    font-weight:600;
    color: ${({lightText}) => (lightText ?  '#f7f8fa': '#010606')};

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
    
`;*/

export const Heading = styled.h1`
    margin-bottom:24px;
    font-size: 48px;
    line-height:1.1;
    font-weight:600;
    color: ${({lightText}) => (lightText ?  '#f7f8fa': '#ffffff')};

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
    
`;

export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom:35px;
    font-size:18px;
    line-height: 24px;
    color: ${({darkText}) => (darkText ?  '#010606': '#fff')};
`;

export const BtnWrapper = styled.div`
   display:grid;
   justify-content: center;

`;

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
    
`;

export const Img = styled.img`
width: 100%; 
margin: 0px 0 40px 0;
padding-right: 0;

`;


