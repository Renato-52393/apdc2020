import styled from 'styled-components'

export const MDBtn = styled.div` 
      display:flex;
      align-items: center;

      @media screen and (max-width:768px){
            display:none;
      }

`

export const MBtn = styled.button` 
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
      margin-top:30.5rem;
      margin-left:2.5rem;

&:hover{
      transition:all 0.2s ease-in-out;
      color: #3AA285;
      background:#fff
}
`