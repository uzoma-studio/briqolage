import React, { useState, useEffect } from "react";
import Contentful from "../utils/contentful";
import Window from "../components/window";
import "../styles/music.css";

const Music = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    // Fetch songs from Contentful
    Contentful.get(`
      {
        musicCollection {
          items {
            title
            audioUrl
            soundcloudTrackId
            coverArt {
              url
            }
          }
        }
      }
    `)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
          return;
        }
        // Extract songs from response
        const songs = data.musicCollection.items;
        setSongs(songs);
        // Set the first song as the default selected song
        setSelectedSong(songs[0]);
      })
      .catch((error) => {
        console.error("Failed to fetch music:", error);
      });
  }, []);

  return (
    <Window
      title="Music"
      icon={{
        id: "fmIcon",
        alt: "BriqFM icon",
        src: "https://res.cloudinary.com/nieleche/image/upload/v1674823219/fm_ijrhhd.png",
      }} 
    >
      <div className="music-container">
      {selectedSong && (
          <div className="song-details">
            <h2>{selectedSong.title}</h2>
            
            <iframe width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${selectedSong.soundcloudTrackId}&color=%23202a4d&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`}></iframe>
          </div>
        )}

        <div className="library">
          <h2>Songs</h2>
          <div className="library-songs">
            {songs.map((song, index) => (
              <div className="library-song" key={index} onClick={() => setSelectedSong(song)}>
                 <img src={song.coverArt.url} alt={song.title} />
                <div className="song-description">
                  <h3>{song.title}</h3>
                  <h4>{song.artist}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Window>
  );
};

export default Music;
