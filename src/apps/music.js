import React, { useState, useEffect, useRef } from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../styles/music.css';

import Window from "../components/window";

// Import components
import Player from "../components/music/Player";
import Song from "../components/music/Song";
import Library from "../components/music/Library";

import Contentful from "../utils/contentful";
import { v4 as uuidv4 } from "uuid";

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

export default function Music() {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  	// Ref
	const audioRef = useRef(null);

	// State
  const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
  
  // Query Contentful for music
  const query = `
    {
      musicCollection {
        items {
          title
          audioUrl
          artist
          genre
          coverArt {
            url
          }
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

        const songs = data.musicCollection.items
        // set the first song in the collection as 'active'
        songs[0].active = true
        // every other song is therefore 'inactive'
        songs.slice(1).forEach((song) => {
          song.active = false 
          // set id for each song as well
          song.id = uuidv4()
        })
        setSongs(songs)
        setCurrentSong(songs[0])
      });
  }, [query]);

	// Functions
	const updateTimeHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime, duration });
	};

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		let nextSong = songs[(currentIndex + 1) % songs.length];
		await setCurrentSong(nextSong);

		const newSongs = songs.map((song) => {
			if (song.id === nextSong.id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);

		if (isPlaying) {
			audioRef.current.play();
		}
	};

  const playSongContainer = <div className="PlaySongContainer">
    {
      currentSong ?
        <>
          <Player
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            songs={songs}
            setSongs={setSongs}
          />
          <Song currentSong={currentSong} />
        </>
        :
        <p>Loading...</p>
    }
  </div>

  const tabs = <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab sx={{ color: 'gray', fontSize: 10, fontWeight: 'light' }} label="Channel" {...a11yProps(0)} />
              </Tabs>

  return (
    <Window title="Music" icon={{
      id: 'fmIcon',
      alt: 'BriqFM icon',
      src: 'https://res.cloudinary.com/nieleche/image/upload/v1674823219/fm_ijrhhd.png'
    }} music={{libraryStatus, playSongContainer}} windowTabs={tabs}>
      {/* {
        <
        currentSong ?
        <>
          <Library
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
          />
        
          <audio
            onLoadedMetadata={updateTimeHandler}
            onTimeUpdate={updateTimeHandler}
            onEnded={songEndHandler}
            ref={audioRef}
            src={currentSong.audioUrl}
          />
        </>
        :
        <p>Loading...</p>
      } */}
      <p style={{padding: '20px'}}>MUSIC COMING SOON...</p>
    </Window>

  )
}