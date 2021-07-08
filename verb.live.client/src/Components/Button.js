import styled from 'styled-components';

const Button = styled.button`
    -moz-box-shadow:inset 0px 1px 0px 0px #e184f3;
	-webkit-box-shadow:inset 0px 1px 0px 0px #e184f3;
	box-shadow:inset 0px 1px 0px 0px #e184f3;
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #c123de), color-stop(1, #a20dbd) );
	background:-moz-linear-gradient( center top, #c123de 5%, #a20dbd 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#c123de', endColorstr='#a20dbd');
	background-color:#c123de;
	-webkit-border-top-left-radius:20px;
	-moz-border-radius-topleft:20px;
	border-top-left-radius:20px;
	-webkit-border-top-right-radius:20px;
	-moz-border-radius-topright:20px;
	border-top-right-radius:20px;
	-webkit-border-bottom-right-radius:20px;
	-moz-border-radius-bottomright:20px;
	border-bottom-right-radius:20px;
	-webkit-border-bottom-left-radius:20px;
	-moz-border-radius-bottomleft:20px;
	border-bottom-left-radius:20px;
	text-indent:0px;
	border:1px solid #a511c0;
	display:inline-block;
	color:#ffffff;
	font-family:Trebuchet MS;
	font-size:17px;
	font-weight:bold;
	font-style:normal;
	padding-top:6px;
	padding-bottom:6px;
	padding-left:40px;
	padding-right:40px;
	text-decoration:none;
	text-align:center;
	text-shadow:1px 1px 0px #9b14b3;
    :hover {
	    background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #a20dbd), color-stop(1, #c123de) );
	    background:-moz-linear-gradient( center top, #a20dbd 5%, #c123de 100% );
	    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#a20dbd', endColorstr='#c123de');
	    background-color:#a20dbd;
    }
    :active {
    	position:relative;
    	top:1px;
    }
`;

export default Button;
