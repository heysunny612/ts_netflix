import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
  ${normalize}   
  *{box-sizing:border-box}
  a{text-decoration:none; color:inherit}
  ul{list-style:none;}
  body{ font-family: 'Noto Sans KR', sans-serif; color:#fff; background-color: #000;
  }
  button {outline:none;border:0 none; background-color:transparent;cursor: pointer;}


`;
