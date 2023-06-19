import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${normalize}   
  *{box-sizing:border-box}
  a{text-decoration:none; color:inherit}
  ul{list-style:none;padding:0;}
  body{ font-family: 'Noto Sans KR', sans-serif; color:#fff; background-color: #000; overflow-x:hidden;}
  button {outline:none;border:0 none; background-color:transparent;cursor: pointer;}
  h4{margin:0}
 
`;
