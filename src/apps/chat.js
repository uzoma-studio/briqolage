import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import '../styles/screen.css';
import '../styles/chat.css';
import { supabase } from '../supabaseClient';
import Window from "../components/window";

import helpers from '../utils/helpers'


export default function Chat({ username, setUsername }) {
 
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages').select()
      .order('created_at', { ascending: false })
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
      setMessages((prevMessages) => [newMessage, ...prevMessages]); // Add the new message to the messages array
  
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
      setContent('');
    }
  };
  
  const { formatDate } = helpers

  return (
    <Window title="Chat room" icon={{
      id: 'chatIcon',
      alt: 'chat',
      src: "https://res.cloudinary.com/nieleche/image/upload/v1688460648/IMG_1916_fpfp9d.png"
    }}
    isOpenByDefault={true}
    style={{width: '30em', top: '25vh', left: `calc(100vw - 30em)`}}
    >
      <div className=" chatbox-container">
        <div className="messages-container">
          {messages &&
            messages
              .slice()
              .reverse()
              .map((message) => (
                <div className="message chatcard" key={message.id}>
                  {message.created_at ?
                    <small style={{fontSize: '12px'}}>{formatDate(Date.parse(message.created_at))}</small>
                    :
                    <small style={{fontSize: '12px'}}>just now</small>
                  }
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
            className="input chatinput w40"
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
    </Window>
  );
}