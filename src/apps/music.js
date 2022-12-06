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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


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
            <DialogActions className="DialogTags" > 
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
              <ImageList sx={{ width: 500, height: 480 }} cols={4} rowHeight={100}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <Typography sx={{
                      mb: '0',
                      fontWeight: 'bold',
                      fontSize: 10,
                    }} variant="body3" gutterBottom>
                               Title
                    </Typography>
                    <Typography sx={{
                      fontSize: 8,
                    }} variant="body2" gutterBottom>
                                Artist Name
                    </Typography>
                  </ImageListItem>
                ))}
              </ImageList>
          </TabPanel>
          <TabPanel value={value} index={1}>
                    
          </TabPanel>
          <TabPanel value={value} index={2}>
            Playlist 3
          </TabPanel>
          <DialogContentText>
            
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];