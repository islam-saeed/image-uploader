import image from "../image.svg"
import {useState, useRef} from 'react';




const UploadForm = ({sendData}) => {
    const inputRef = useRef(null);

    // browse for the file on click
    const handleClick = () => {
    // open file input box on click of the button
    inputRef.current.click();
    };


    // get the file that was browsed and send it to the database
    const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
        return;
    }

    // reset file input
    event.target.value = null;

    sendData(fileObj);
    
    };
    
    // state to change the image-container style on drag
    const [dragActive, setDragActive] = useState(false);

    // tracks the file to see if it enters the image-container div
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      };


      // sends the image to the database on drop
      const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            sendData(e.dataTransfer.files[0])
        }
      };

    return (
        <div className="upload-form" onDragEnter={handleDrag}>
            <div className="container">
                <h2>Upload Your Image</h2>
                <h4>File should be jpeg,png....</h4>
                <div 
                    className="image-container"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={ dragActive ? {backgroundColor : "white"} : {} }
                    >
                    <img src={image} alt="image placeholder" className="placeholder" />
                    <p>Drag & Drop your image here</p>
                </div>
                <p>or</p>
                <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                />

                <button onClick={handleClick}>Choose a file</button>
            </div>
        </div>
    )
}

export default UploadForm