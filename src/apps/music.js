import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../styles/music.css';
import SearchIcon from '@mui/icons-material/Search';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  fontSize: '12',

  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '8ch',
      '&:focus': {
        width: '13ch',
      },
    },
  },
}));

export default function Music() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                    top: 6, }} />

              <PlayArrowIcon sx={{ 
                    position: 'absolute',
                    left: 100,
                    top: 6, }} />

              <SkipNextIcon sx={{ 
                    position: 'absolute',
                    left: 125,
                    top: 6, }} />

            <Typography sx={{
              position: 'absolute', 
              width: '100%',
              textAlign: 'center',
              pt: 1,
            }} variant="body2" gutterBottom>
                    Briqolage
                    </Typography>

         

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase 
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
     
          </div>

         
         
        </DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab sx={{ color: 'gray', fontSize: 10, fontWeight: 'light' }} label="Playlist One" {...a11yProps(0)} />
              <Tab sx={{ color: 'gray', fontSize: 10, fontWeight: 'light' }} label="Playlist Two" {...a11yProps(1)} />
              <Tab sx={{ color: 'gray', fontSize: 10, fontWeight: 'light' }} label="Playlist Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Playlist 1
          </TabPanel>
          <TabPanel value={value} index={1}>
            Playlist 2
          </TabPanel>
          <TabPanel value={value} index={2}>
            Playlist 3
          </TabPanel>
          <DialogContentText>
           test test test test test test tets test test test test test test test test 
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}