import React, { useContext, useState } from 'react'
import './write.css'
import { Add, Cancel } from '@material-ui/icons';
import axios from 'axios'
import { Context } from '../../context/Context'

export default function Write() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename;
            try {
                await axios.post("/upload", data)
            } catch (err) {
            }
        }
        try {
            const res = await axios.post("/posts", newPost);

            res && window.location.replace("/post/" + res.data._id)
        } catch (err) { }

    }
    return (
        <div className="write">
            {file &&
                <div className="writeContainerImg">
                    <img
                        className="writeImg"
                        src={URL.createObjectURL(file)}
                        alt=""
                    />
                    <Cancel className="writeCancelImg" onClick={() => setFile(null)} />
                </div>
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <Add className="writeIcon" />
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story" className="writeInput writeText" type="text" onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type="submit">Share</button>
            </form>
        </div>
    )
}
