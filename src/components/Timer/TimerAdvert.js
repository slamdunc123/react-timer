import React from 'react'

const TimerAdvert = () => {
    return (
        <div className='advert-container'>
				<div className='advert-body'>
					<div className='advert-image'></div>
					<div className='advert-text'>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Magni, ut!
					</div>
					<div className='advert-search'>
						{/* <a href={`/search?term=${time}`}> */}
							<button style={{ width: '100px', height: '50px' }}>
								Search
							</button>
						{/* </a> */}
					</div>
				</div>
			</div>
    )
}

export default TimerAdvert
