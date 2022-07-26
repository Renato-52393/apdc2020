import React from 'react'

import { InfoContainer } from './infoElements'
import { InfoWrapper } from './infoElements'
import { InfoRow } from './infoElements' 
import { Column1 } from './infoElements'
import { TextWrapper } from './infoElements' 
import { TopLine } from './infoElements'
import { Heading } from './infoElements'
import { Subtitle } from './infoElements' 

import { Column2 } from './infoElements' 
import { ImgWrap } from './infoElements'
import { Img } from './infoElements' 


const InfoSection = ({lightBg,id,imgStart,lightText,topLine,headline,headline1,darkText,description,description1,img,alt,href}) => {
    return (
        <>
         <InfoContainer lightBg={lightBg} id ={id}>
            <InfoWrapper>
                <InfoRow imgStart ={imgStart}>
                    <Column1>
                        <TextWrapper>
                            <TopLine lightText = {lightText}>{topLine}</TopLine>
                            <Heading>{headline}</Heading>
                            <Subtitle darkText={darkText}>{description}</Subtitle>
                            <Subtitle darkText={darkText}>{description1}</Subtitle> 
                        </TextWrapper>
                    </Column1>
                    <Column2>
                        <ImgWrap>
                            <Img src={img} alt={alt}/> 
                        </ImgWrap>
                    </Column2>
                </InfoRow>
            </InfoWrapper>

         </InfoContainer>
        </>
    )
}

export default InfoSection
