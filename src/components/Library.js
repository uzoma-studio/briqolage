import React from "react";
import LibrarySong from "./LibrarySong";
import styled from "styled-components";

const Library = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
	return (
		<LibraryContainer libraryStatus={!libraryStatus}>
			<SongContainer>
				{songs.map((song) => (
					<LibrarySong
						song={song}
						songs={songs}
						setCurrentSong={setCurrentSong}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
						setSongs={setSongs}
					/>
				))}
			</SongContainer>
		</LibraryContainer>
	);
};
const LibraryContainer = styled.div`
	position: relative;
	z-index: 9;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50%;
	background-color: transparent;
	user-select: none;
	overflow: scroll;
	transform: translateX(${(p) => (p.libraryStatus ? "0%" : "-100%")});
	transition: all 0.5s ease;
	opacity: ${(p) => (p.libraryStatus ? "100" : "0")};
	scrollbar-width: thin;
	scrollbar-color: rgba(155, 155, 155, 0.5) tranparent;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(155, 155, 155, 0.5);
		border-radius: 20px;
		border: transparent;
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		z-index: 9;
	}
`;

const SongContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: transparent;
`;

const H1 = styled.h2`
	padding: 2rem;
`;

export default Library;
