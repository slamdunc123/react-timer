import React, { useState } from 'react';
import { MdFullscreen } from 'react-icons/md';
import { MdFullscreenExit } from 'react-icons/md';


const FullScreenSelector = () => {
	const [fullScreen, setFullScreen] = useState(false);
	const elem = document.documentElement;

	const handleFullScreenToggle = () => {
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
           {fullScreen ?  <MdFullscreenExit onClick={handleFullScreenToggle} /> : <MdFullscreen onClick={handleFullScreenToggle} />}
		</div>
	);
};

export default FullScreenSelector;
