import React, { useState, useEffect } from 'react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

const FullScreenSelector = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullScreenToggle = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    const handleFullScreenDetection = () => {
        if (document.fullscreenElement) {
            setIsFullscreen(true);
        } else {
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        document.addEventListener(
            'fullscreenchange',
            handleFullScreenDetection
        );
        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullScreenDetection
            );
        };
    }, []);

    return (
        <div className="twinkl-fullscreen-selector-container">
            {isFullscreen ? (
                <MdFullscreenExit onClick={handleFullScreenToggle} />
            ) : (
                <MdFullscreen onClick={handleFullScreenToggle} />
            )}
        </div>
    );
};

export default FullScreenSelector;
