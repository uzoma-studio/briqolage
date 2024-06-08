import React from "react";
import { useState, useRef, useEffect } from "react";
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


export default function Window({ children, title, icon, isOpenByDefault, style, windowTabs, music }) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
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

    function PaperComponent(props) {
        return (
            <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            >
                {
                    !fullscreen ? 
                        <span style={style} className='MuiPaper-root-container'>
                            <Paper {...props} />
                        </span>
                        :
                        <Paper {...props} />
                }
            </Draggable>

       
        );
    }

    const dialogRef = useRef(null)

    useEffect(() => {
        if(dialogRef.current){
            if(fullscreen){ 
                dialogRef.current.style.height = '100%'
                dialogRef.current.style.width = '100%'
            } else {
                dialogRef.current.style.height = '0'
                dialogRef.current.style.width = '0'
            }
        }
      }, [fullscreen]);

  return (

    <div>
      { icon ?
           <Button className="instasec" onClick={handleClickOpen}>
           {window.innerWidth > 768 ? (
             <Draggable>
               <Tooltip title={title}>
                 <img
                   id={icon.id}
                   alt={icon.alt}
                   src={icon.src}
                   width={title === "Music" ? 138 : (title === "Artworks" ? 140 : (title === "Login" ? 20 : 90))}
                   height={title === "Artworks" ? 140 :(title === "Login" ? 20:90)}
                   className='icon'
                 />
               </Tooltip>
             </Draggable>
           ) : (
             <Tooltip title={title}>
               <img
                 id={icon.id}
                 alt={icon.alt}
                 src={icon.src}
                 width={title === "Music" ? 138 : (title === "Artworks" ? 140 : (title === "Login" ? 20 : 90))}
                 height={title === "Artworks" ? 140 :(title === "Login" ? 20:90)}
                 className='icon'
               />
             </Tooltip>
           )}
         </Button>
          :
          <Button className="abtTypo" sx={{px: 0}} onClick={handleClickOpen}>
            <Typography className="font-face-nmR" sx={{fontSize: 12}} variant="body2" gutterBottom>
              {title}
            </Typography>
          </Button>
      }

      
      <Dialog
       fullScreen={fullscreen}
        open={isOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        ref={dialogRef}>

        <AppContainer libraryStatus={music && music.libraryStatus}>
                <DialogActions className="DialogTags" style={{ display: 'flex', justifyContent: 'flex-start', padding: '2px'}}> 
                    <Brightness1Icon sx={{ 
                        left: 8,
                        top: 2,
                        cursor: 'pointer',
                        fontSize: 'large',
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
            <DialogTitle style={{ cursor: 'move', p: '0',  border: '3px solid black;' }} id="draggable-dialog-title">
                <div className="DialogTags">
                  
                    { music && music.playSongContainer ?
                        music.playSongContainer
                        :
                        <Typography className='font-face-nmB' variant="body2" gutterBottom sx={{
                            width: '100%',
                            pt: '0.4rem',
                            textAlign: 'center',

                        }}>
                            {title}
                        </Typography>
                    }
                </div>
            
            </DialogTitle>
          <DialogContent className='DIALOGRESIZE'>
           
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {windowTabs && windowTabs}
            </Box>
           
           {/* The actual content that this Window component is serving 👇🏾 */}

            { !windowTabs ?
                <TabPanel value={value} index={0}>
                    { children }
                </TabPanel>
                :
                children
            }
    
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
