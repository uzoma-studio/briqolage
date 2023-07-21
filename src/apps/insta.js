import React from "react";
import styledd from "styled-components";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import '../styles/screen.css';
import Window from '../components/window';



const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));


export default function Insta() {


  return (
    <Window title='Instagram' icon={{
      id: 'Instagram',
      alt: 'instagram',
      src: 'https://res.cloudinary.com/nieleche/image/upload/v1674822636/insta_1_m6lryh.png'
      }}
      style={{ width: '45em'}}>

      <div  style={{ height: '400px' }}> 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2,  position: 'absolute', backgroundColor: '#FEFED8', left: '50%'}}>
            <img src="https://res.cloudinary.com/nieleche/image/upload/v1671988936/Instagram_logo.svg_hj7wtg.png"  width={100} height={36} alt="insta"/>
            <ColorButton href="https://www.instagram.com/briqolage/" target="_blank" sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 12, fontWeight: 'bold', px: 3,  borderColor: 'black'}} size="small" variant="contained">FOLLOW</ColorButton>
        </Box>
     
        <iframe src="https://embedsocial.com/facebook_album/pro_hashtag/dc8a04fa58f61d76f1efa09fdbfebc6e2635c86f" width="600px" height="900px" frameborder="0" marginheight="0" marginwidth="0"></iframe>
           
   
      </div>
    </Window>
   
  );
}

const AppContainer = styledd.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;
