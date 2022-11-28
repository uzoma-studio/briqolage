import React from 'react'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import '../styles/screen.css'

function Home() {

  return (
    <>     
      <Container 
            sx={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            width: '100%'
            }} component="footer" maxWidth="lg">
       
       <Box  
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: "5",
          }}>
           <img src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/sound_c1kbdo.png" width={100} height={100} />
           <img src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/art_i12sdq.png" width={100} height={100} />
           <img src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/instaa_a2hir1.png" width={100} height={100} />

          </Box>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        > 
           <img src="https://res.cloudinary.com/nieleche/image/upload/v1669245963/dock_tgaiql.png" width={600} height={66} />
        </Box>
      </Container>
    </>
  )
}

export default Home

