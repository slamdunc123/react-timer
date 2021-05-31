import React, {useState} from 'react';
import { MdTextFields } from 'react-icons/md';

const TitleSelector = ({ handleTitleChange, title }) => {
    const [showTitleTextInput, setShowTitleTextInput] = useState(false)
	return (
		<div className="twinkl-timer-title-selector-container">
            <MdTextFields onClick={() => setShowTitleTextInput(!showTitleTextInput)}/>
            {
               showTitleTextInput ?  <input type='text' onChange={handleTitleChange} placeholder='Title'value={title} maxLength="20"/> : null
            }
			
		</div>
	);
};

export default TitleSelector;
