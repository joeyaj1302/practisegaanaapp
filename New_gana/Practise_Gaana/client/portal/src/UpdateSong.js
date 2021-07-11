import axios from 'axios'
import { useState } from 'react'

const UpdateSong = () => {
    const [title,setTitle] = useState('');
    const [artistId,setArtistId] = useState('');
    const [albumId,setAlbumId] = useState('');
    const [duration,setDuration] = useState('');
    const [newtitle,setNewTitle] = useState('');
    const [thumbnail,setThumbnail] = useState(undefined);

    const url = 'http://localhost:4000';
    const submitData = () => {
        const data = new FormData();
        data.append('title', title);
        data.append('artistId', artistId);
        data.append('albumId', albumId);
        data.append('duration', duration);
        data.append('newtitle', newtitle);
        data.append('thumbnail', thumbnail);

        console.log(data);

        axios.post(url + '/song/updatesong',data).then(response =>{
            const result = response.data;
            if(result.message ==="successful query"){
                alert("Successfully updated song");
            }
            else{
                alert("Failed to update song");
            }
           
        })

    }

    return (
        <div>       
            <h2>Update Song</h2>
            <label >Title </label>
            <input onChange={(e) => {
            setTitle(e.target.value)
          }} type="text" className="form-control"/>
            <label >Artist ID</label>
            <input onChange={(e) => {
            setArtistId(e.target.value)
          }} type="text" className="form-control"/>
            <label>Album ID</label>
            <input onChange = {(e)=> {
            setAlbumId(e.target.value)
            }} type = "text" className="form-control"/>
            <label>Duration</label>
            <input onChange = {(e)=> {
                setDuration(e.target.value)
            }} type = "text" className="form-control"/>
            <label>New Title</label>
            <input onChange = {(e)=> {
                setNewTitle(e.target.value)
            }} type = "text" className="form-control"/>
            <label >thumbnail</label>
            <input onChange={(e) => {
            setThumbnail(e.target.files[0])
          }} accept="image/*" type="file" className="form-control"/>

            <button className="btn btn-success" onClick={submitData}>
                submit
            </button>
            </div>
    )
}


export default UpdateSong;
