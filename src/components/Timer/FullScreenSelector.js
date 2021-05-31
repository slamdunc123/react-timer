import React, { useState } from 'react';
import { MdFullscreen } from 'react-icons/md';
import { MdFullscreenExit } from 'react-icons/md';


const FullScreenSelector = () => {
	const [fullScreen, setFullScreen] = useState(false);
	const elem = document.documentElement;

	const handleFullScreen = () => {
		if (!fullScreen) {
			setFullScreen(true);
			elem.requestFullscreen();
		} else {
			setFullScreen(false);
			document.exitFullscreen();
		}
	};

	return (
		<div className='twinkl-fullscreen-selector-container'>
           {fullScreen ?  <MdFullscreenExit onClick={handleFullScreen} /> : <MdFullscreen onClick={handleFullScreen} />}
		</div>
	);
};

export default FullScreenSelector;
