import UploadForm from "../components/UploadForm"
import LoadingBar from "../components/LoadingBar"
import SuccessPage from "../components/SuccessPage"
import { useState } from "react"

let imageID = ''
const Home = () => {
    const [uploadFlag, setUploadFlag] = new useState(-1)
    const sendData = async (fileObj) => {

        let formData = new FormData();

        formData.append('image',fileObj)

        const requestOptions = {
            method: 'POST',
            body: formData
        };
        setUploadFlag(1)
        const response = await fetch('http://localhost:4000/api/images/', requestOptions)
        const data = await response.json()
        imageID = data._id
        setUploadFlag(0)
    }

    return(
        <div className="page-container">
        {uploadFlag === -1 && <UploadForm sendData={sendData} />}
        {uploadFlag === 1 && <LoadingBar />}
        {uploadFlag === 0 && <SuccessPage id={imageID} />}
        </div>
    )
}

export default Home