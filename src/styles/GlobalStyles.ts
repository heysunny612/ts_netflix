import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export const GlobalStyles = createGlobalStyle`
${normalize}   
*{box-sizing:border-box}
a{text-decoration:none; color:inherit}
ul{list-style:none;}
body{background-color:black}

`;
