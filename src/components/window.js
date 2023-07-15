import React from "react";
import { useState } from "react";
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


export default function Window({ children, title, iconUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [fullscreen, setFullScreen] = useState(false);
  

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFullScreen(false)
  };

  const handleFull = () => {
    setFullScreen(true)
  };

  const handleCloseFull = () => {
    setFullScreen(false)
  };

  return (
    <div>
      <Button  className="instasec"  onClick={handleClickOpen}>
        <Draggable>
          <Tooltip title={title}>
            <img alt={`${title} icon`}  src={iconUrl}  width={90} height={90}  />
          </Tooltip>
        </Draggable>
      </Button>

      
      <Dialog
       fullScreen={fullscreen}
        open={isOpen}
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
                        {title}
                    </Typography>
                </div>
            
            </DialogTitle>
          
          <DialogContent className='DIALOGRESIZE'>
           
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            </Box>
           
           {/* The actual content that this Window component is serving 👇🏾 */}

            <TabPanel value={value} index={0}>
              { children }
            </TabPanel>
    
          </DialogContent>
        </AppContainer>
      </Dialog>
    </div>
  );
}

const AppContainer = styledd.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;
