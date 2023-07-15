import React, { useState, useEffect } from 'react';
import styledd from "styled-components";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Typography from '@mui/material/Typography'; 
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import '../styles/screen.css';
// import DialogControlComponent from '../components/dialog-controls'

import Artworks from '../components/artworks/artworks'

import Contentful from '../utils/contentful'


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function Blog() {
  const [open, setOpen] = React.useState(false);
  const [fullscreen, setFullScreen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFullScreen(false)
  };

  const handleFull = () => {
    setFullScreen(true)
  };

  const handleCloseFull = () => {
    setFullScreen(false)
  };

  const [ blogPosts, setBlogPosts ] = useState(null)

  const query = `
  query {
    blogPostCollection(limit:10) {
        items {
            title
            body {
            json
            links {
                assets {
                block {
                    sys {
                    id
                    }
                    title
                    url
                }
                }
            }
            }
            date
            }
        }
    }
  `

  useEffect(() => {
    Contentful.get(query)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setBlogPosts(data.blogPostCollection.items)

      });
  }, [query]);
  
  return (
    <div>
      <Button className='artsec' onClick={handleClickOpen}>
       <Draggable>
        <Tooltip title="Briq Blog">
          <img  label="briq Blog" alt='Briq Blog icon' src="https://res.cloudinary.com/nieleche/image/upload/v1669859352/aboutbriq_grwbqc.png"  width={145} height={145}  />
        </Tooltip>
        </Draggable>
      </Button>

      
      <Dialog
       fullScreen={fullscreen}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">

        <AppContainer>
          <DialogTitle style={{ cursor: 'move', p: '0',  border: '3px solid black;' }} id="draggable-dialog-title">
            <div className="DialogTags">
              <DialogActions className="DialogTags" > 
                  <Brightness1Icon sx={{ 
                      left: 8,
                      top: 2,
                      cursor: 'pointer',
                      fontSize: 'small',
                      pl: '0px',
                      color: '#FF4A92'}} autoFocus onClick={handleClose} />

                      <Brightness1Icon sx={{ 
                      left: 8,
                      top: 2,
                      cursor: 'pointer',
                      fontSize: 'small',
                      pl: '0px',
                      color: '#FFCF14'}} autoFocus onClick={handleCloseFull} />

                      <Brightness1Icon sx={{ 
                      left: 8,
                      top: 2,
                      cursor: 'pointer',
                      fontSize: 'small',
                      pl: '0px',
                      color: '#3D6AFC'}} autoFocus onClick={handleFull} />
              
              </DialogActions>

              <Typography className='font-face-nmB' variant="body2" gutterBottom sx={{
                    width: '100%',
                    pt: '0.4rem',
                    textAlign: 'center',

                }}>
                    Blog Posts
                </Typography>
            </div>
          
          </DialogTitle>
          
          <DialogContent className='DIALOGRESIZE'>
            <Box sx={{ borderBottom: 2, borderColor: 'black' }}>
            </Box>
              
            {
                blogPosts && blogPosts.map((post) => <div style={{padding: '10px'}}>
                    <p style={{fontSize: '24px'}}>{post.title}</p>
                </div>)
            }
          </DialogContent>
        </AppContainer>
      </Dialog>
    </div>
  );
}

document.getElementById('root')


const AppContainer = styledd.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;


