import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// style
const pointer = { cursor: "pointer" };

const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
	setSongs,
}) => {

	// Event handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const togglePlayPauseIcon = () => {
		if (isPlaying) {
			return faPause;
		} else {
			return faPlay;
		}
	};

	const getTime = (time) => {
		let minute = Math.floor(time / 60);
		let second = ("0" + Math.floor(time % 60)).slice(-2);
		return `${minute}:${second}`;
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		} else if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
			} else {
				await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
				activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
			}
		}
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	const activeLibraryHandler = (newSong) => {
		const newSongs = songs.map((song) => {
			if (song.id === newSong.id) {
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
	};

	return (
		<PlayerContainer>
			<PlayControlContainer>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
					icon={faAngleLeft}
					size="2x"
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					icon={togglePlayPauseIcon()}
					size="2x"
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forward"
					icon={faAngleRight}
					size="2x"
					style={pointer}
				/>
			</PlayControlContainer>
			
			<TimeControlContainer>
				<div className="MusicTime">
				<P>{getTime(songInfo.currentTime || 0)}</P>/
				<P>{getTime(songInfo.duration || 0)}</P>
				</div>
				<Track currentSong={currentSong}>
					<Input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
					/>
					<AnimateTrack songInfo={songInfo}></AnimateTrack>
				</Track>
			</TimeControlContainer>
		</PlayerContainer>
	);
};

const PlayerContainer = styled.div`
	width: 100%;
	font-size:10px;
	display: flex;
	flex-direction: column;
	align-items:center;
`;

const TimeControlContainer = styled.div`
	margin-top: 0vh;
	width: 100%;
	@media screen and (max-width: 768px) {
		width: 11vh;
	}
`;

const Track = styled.div`
	background: lightblue;
	width: 100%;
	height: 0.2rem;
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
	background: linear-gradient(to right, #205950, #2AB3BF);
`;

const AnimateTrack = styled.div`
	background: rgb(204, 204, 204);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(${(p) => Math.round((p.songInfo.currentTime * 100) / p.songInfo.duration) + "%"});
	pointer-events: none;
`;

const Input = styled.input`
	width: 100%;
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
	/* padding-top: 1rem;
	padding-bottom: 1rem; */
	&:focus {
		outline: none;
		-webkit-appearance: none;
	}
	@media screen and (max-width: 768px) {
		&::-webkit-slider-thumb {
			height: 48px;
			width: 48px;
		}
	}
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-ms-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
`;

const P = styled.p`
	padding: 0 0.1rem 0 0.1rem;
	user-select: none;
`;

const PlayControlContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-top: 0.5rem;
	padding-bottom: 0.6rem;
	width: 100%;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

export default Player;
