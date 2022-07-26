import styled from 'styled-components'

export const AddMDBtn = styled.div` 
      display:flex;
      align-items: center;

      @media screen and (max-width:768px){
            display:none;
      }

`

export const AddMBtn = styled.button` 

      

&:hover{
      transition:all 0.2s ease-in-out;
      color: #3AA285;
      background:#fff
}
`