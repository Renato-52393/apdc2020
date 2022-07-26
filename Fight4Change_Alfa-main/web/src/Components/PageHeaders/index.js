import React from 'react'

import { InfoContainer } from './eventsElements'
import { InfoWrapper } from './eventsElements'
import { InfoRow } from './eventsElements' 
import { Column1 } from './eventsElements'
import { TextWrapper } from './eventsElements' 
import { TopLine } from './eventsElements'
import { Heading } from './eventsElements'
import { Subtitle } from './eventsElements' 

import { Column2 } from './eventsElements' 
import { ImgWrap } from './eventsElements'
import { Img } from './eventsElements' 


const InfoSection = ({lightBg,id,imgStart,lightText,topLine,headline,darkText,description,description1,img,alt}) => {
    return (
        <>
         <InfoContainer lightBg={lightBg} id ={id}>
            <InfoWrapper>
                <InfoRow imgStart ={imgStart}>
                    <Column1>
                        <TextWrapper>
                            <TopLine lightText = {lightText}>{topLine}</TopLine>
                            <Heading lightText = {lightText}>{headline }</Heading>
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
