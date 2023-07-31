import image from '../pngegg.png'
import { useState } from 'react'

const SuccessPage = ({id}) => {

    //state to show the msg when the link is copied
    const [ copyFlag, setCopyFlag ] = new useState(0)


    //copies the link on click
    const handleClick = () => {
        navigator.clipboard.writeText('http://localhost:4000/api/images/'+id)
        setCopyFlag(1);
    }

    return (
        <div className='success-page-container'>
            <img src={image} alt='success' width='35px' height='35px' />
            <h2>Uploaded Successfully</h2>
            <div 
                className='image-container' 
                style={{
                    background: `url(http://localhost:4000/api/images/${id})`,
                    backgroundSize: `100% 100%`
                }}>
            </div>
            <div className='link-container'>
                <input type='text' value={'http://localhost:4000/api/images/'+id} readOnly />
                <button onClick={handleClick}>Copy Link</button>
            </div>
            { copyFlag === 1 && <span>Link Copied To Clipboard</span> }
        </div>
    )
}

export default SuccessPage