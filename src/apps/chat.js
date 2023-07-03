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
import InstaFeeds from './insta/InstaFeeds'
import '../styles/screen.css';
import Card from "./card";
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


export default function Chat() {
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
  const [message, setMessage] = useState({ username: "", content: "" });
  const { username, content } = message;
  useEffect(() => {
    const profiles = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "profiles" },
        (payload) => {
          console.log({ payload });
          payload &&
            setMessages((oldMessages) => [...oldMessages, payload.new]);
        }
      )
      .subscribe();
    return () => {
      profiles.unsubscribe();
    };
  }, []);

  useEffect(() => {
    Init();
  }, []);

   //Seleciona a tabela PROFILES e joga o retorno para dentro de MESSAGES
   async function Init() {
    const { data: profiles } = await supabase.from("profiles").select("*");
    if (profiles == null) return;
    setMessages(profiles);
  }

  //Insere USERNAME e CONTENT dentro da tabela
  async function createPost() {
    await supabase.from("profiles").insert([{ username, content }]).single();
    setMessage({ username: message.username, content: "" });
    Init();
    submit();
    console.log(messages);
  }

  function submit() {
    localStorage.setItem("name", message.username);
  }


  return (
    <div>
      <Button  className="instasec"  onClick={handleClickOpen}>
        <Draggable>
          <Tooltip title="Instagram">
                <img alt="instagram"  src="https://res.cloudinary.com/nieleche/image/upload/v1674822636/insta_1_m6lryh.png"  width={100} height={100}  />
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
                        Instagram
                    </Typography>
                </div>
            
            </DialogTitle>
          
          <DialogContent className='DIALOGRESIZE'>
            <Box sx={{ borderBottom: 2, borderTop: 2, borderColor: 'black', display: 'flex', justifyContent: 'space-between', p: 2}}>
                <img src="https://res.cloudinary.com/nieleche/image/upload/v1671988936/Instagram_logo.svg_hj7wtg.png"  width={100} height={36} alt="insta"/>
                <ColorButton href="https://www.instagram.com/uzzzoma/" target="_blank" sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 12, fontWeight: 'bold', px: 3,  borderColor: 'black'}} size="small" variant="contained">FOLLOW</ColorButton>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
           
            </Box>

           
           
           
            <TabPanel value={value} index={0}>
              
            <div className="container">
                <div className="separator">
                    {messages?.map((message) => (
                    <Card message={message} key={message.id} />
                  
                    ))}
                </div>
                
                <div className="form">
                    <div className="username">
                    <input
                        className="input"
                        id="name"
                        autoCapitalize="on"
                        placeholder="Username"
                        value={localStorage.getItem(message.username)}
                        onChange={(e) =>
                        setMessage({ ...message, username: e.target.value })
                        }
                    />
                    </div>
                    <div className="content">
                    <input
                        id="message"
                        className="input"
                        placeholder="Message"
                        value={content}
                        onChange={(e) =>
                        setMessage({ ...message, content: e.target.value })
                        }
                    />
                    </div>
                    <button className="button" onClick={createPost}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-send"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    </button>
                </div>
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
