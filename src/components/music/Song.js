import React from "react";
import styled from "styled-components";

const Song = ({ currentSong }) => {
	return (
		<SongContainer>
			<H1>{currentSong.title}</H1>
			<H2>{currentSong.artist}</H2>
		</SongContainer>
	);
};

const SongContainer = styled.div`
	padding-top:0.4rem;
	position:relative;
	width: 100%;
	text-align:right;
`;

const Img = styled.img`
	width: 5%;
	border-radius: 50%;
	@media screen and (max-width: 768px) {
		width: 12%;
	}
`;

const H1 = styled.h2`
	padding: 0rem 1rem 0rem 1rem;
	font-weight:bold;
	font-size: 0.8rem;
`;

const H2 = styled.h3`
	padding: 0rem 1rem 0rem 1rem;
	font-size: 0.7rem;
`;

export default Song;
