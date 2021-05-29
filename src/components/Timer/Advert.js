import React from 'react'

const TimerAdvert = () => {
    return (
        <div className='twinkl-advert-container'>
				<div className='twinkl-advert-body'>
					<div className='twinkl-advert-image'></div>
					<div className='twinkl-advert-text'>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Magni, ut!
					</div>
					<div className='twinkl-advert-search'>
						<a href='/search?term=time'>
							<button style={{ width: '100px', height: '50px' }}>
								Search for time
							</button>
						</a>
					</div>
				</div>
			</div>
    )
}

export default TimerAdvert
