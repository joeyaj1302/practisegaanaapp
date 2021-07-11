import axios from 'axios'
import { useState } from 'react'

const AddSong = ( ) => {
    const[title, setTitle] = useState('')
    const[artistId, setArtistId] = useState('')
    const[albumId, setAlbumId] = useState('')
    const[duration, setDuration] = useState('')
    const[thumbnail, setThumbnail] = useState(undefined)
    

    const url = 'http://localhost:4000'
    const submitData = () =>{
        const data = new FormData()
        data.append('title', title)
        data.append('artistId', artistId)
        data.append('albumId', albumId)
        data.append('duration',duration)
        data.append('thumbnail', thumbnail)
        console.log(data)
        
        axios.post(url + '/song/addsong',data).then((response) => {
            const result = response.data
            if(result.message === 'Song added successfully')
            alert('artist added successfully')
            else
            alert('error while adding artist')
        })
    }

    return (
        <div>       
            <h2>WelCome</h2>
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














export default AddSong