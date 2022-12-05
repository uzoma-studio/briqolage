import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import IconButton from '@mui/material/IconButton';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

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

export default function Music() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
      <Tooltip title="Briq FM">
                <img id="fmIcon" src="https://res.cloudinary.com/nieleche/image/upload/v1669288824/sound_c1kbdo.png"  width={130} height={130}  />
              </Tooltip>
      </Button>

      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >

        <DialogTitle style={{ cursor: 'move', p: '0',  border: '3px solid black;' }} id="draggable-dialog-title">
          <div className="DialogTags">
            <DialogActions > 
                <Brightness1Icon sx={{ 
                    position: 'absolute',
                    left: 8,
                    top: 8,
                    cursor: 'pointer',
                    fontSize: 'medium',
                    pr: '10px',
                    color: '#FF4A92'}} autoFocus onClick={handleClose} />

                    <Brightness1Icon sx={{ 
                    position: 'absolute',
                    left: 8,
                    top: 8,
                    cursor: 'pointer',
                    fontSize: 'medium',
                    pl: '10px',
                    color: '#FFCF14'}} autoFocus onClick={handleClose} />

                    <Brightness1Icon sx={{ 
                    position: 'absolute',
                    left: 8,
                    top: 8,
                    cursor: 'pointer',
                    fontSize: 'medium',
                    pl: '30px',
                    color: '#3D6AFC'}} autoFocus onClick={handleClose} />
            
            </DialogActions>


              <SkipPreviousIcon  sx={{ 
                    position: 'absolute',
                    left: 75,
                    top: 8, }} />

              <PlayArrowIcon sx={{ 
                    position: 'absolute',
                    left: 100,
                    top: 8, }} />

              <SkipNextIcon sx={{ 
                    position: 'absolute',
                    left: 125,
                    top: 8, }} />

            <Typography sx={{
                position: 'absolute',
              width: '100%',
              textAlign: 'center',
              top: 8,
            }} variant="body2" gutterBottom>
                    Briqolage
                    </Typography>

           
                    
          </div>
         
        </DialogTitle>
        <hr></hr>
        <DialogContent>
          <DialogContentText>
           test test test test test test tets test test test test test test test test 
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}