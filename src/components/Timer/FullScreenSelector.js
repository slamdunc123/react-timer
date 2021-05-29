import React, { useState } from 'react';

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
			<button onClick={handleFullScreen}>
				{fullScreen ? 'Minimise' : 'Full Screen'}
			</button>
		</div>
	);
};

export default FullScreenSelector;
