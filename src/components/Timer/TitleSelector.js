import React from 'react';

const TitleSelector = ({ handleTitleChange }) => {
	return (
		<div>
			<input type='text' onChange={handleTitleChange} placeholder='Title' maxLength="20"/>
		</div>
	);
};

export default TitleSelector;
