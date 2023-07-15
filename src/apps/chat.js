import React from "react";
import { useState, useEffect } from "react";
import styledd from "styled-components";
import { styled } from '@mui/material/styles';
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
import { pink } from '@mui/material/colors';
import '../styles/screen.css';
import '../styles/chat.css';
import { supabase } from '../supabaseClient';

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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));


export default function Chat({ username, setUsername }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
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

 
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select();
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== '' && content.trim() !== '') {
      const newMessage = { username, content };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to the messages array
  
      const { data, error } = await supabase.from('messages').insert([newMessage]);
      if (error) {
        console.error('Error sending message:', error);
      } else {
        if (data && data.length > 0) {
          // Update the new message with its actual ID returned from the database
          const updatedMessage = { ...newMessage, id: data[0].id };
          setMessages((prevMessages) => {
            // Replace the temporary message with the updated message in the messages array
            const updatedMessages = prevMessages.map((message) => {
              return message === newMessage ? updatedMessage : message;
            });
            return updatedMessages;
          });
        }
      }
  
      setUsername('');
      setUsername('');
      setContent('');
    }
  };
  
  

  return (
    <div>
      <Button  className="instasec"  onClick={handleClickOpen}>
        <Draggable>
          <Tooltip title="Instagram">
                <img alt="instagram"  src="https://res.cloudinary.com/nieleche/image/upload/v1688460648/IMG_1916_fpfp9d.png"  width={90} height={90}  />
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
                        Chat room
                    </Typography>
                </div>
            
            </DialogTitle>
          
          <DialogContent className='DIALOGRESIZE'>
           
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            </Box>

           
           
           
            <TabPanel value={value} index={0}>
              <div className=" chatbox-container">
                <div className="messages-container">
                  {messages &&
                    messages
                      .slice()
                      .reverse()
                      .map((message) => (
                        <div className="message chatcard" key={message.id}>
                          <div className='image-name'>
                            <p className='username name'>{message.username}</p>
                          </div>
                          <div className='content'>   
                            <p className='text'>{message.content}</p>
                          </div>
                        </div>
                      ))}
                </div>


                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                </Box>

                <form className="form" onSubmit={handleSubmit}>
              
                <input
                className="input chatinput w50"
                type="text"
                value={username}
                disabled
                placeholder="Username"
              />
                  <input
                    className="input w100"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Message"
                  />
                  <button className="button w50" type="submit">Send</button>
                </form>
              </div>

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
