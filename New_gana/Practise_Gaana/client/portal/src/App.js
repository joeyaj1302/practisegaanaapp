import logo from './logo.svg';
import './App.css';
import './SongsStyles.css';
import axios from 'axios'
import { useState } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import HorizontalSlider from './components/HorizontalSlider'
import AddSong from './AddSong';
import UpdateSong from './UpdateSong';


const Home = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [currentid, setCurrentid] = useState(0);
  const url = 'http://localhost:4000/'

  // const deleteSong = (currentid) => {
  //   const delurl = 'http://localhost:4000/song/delete/'
  //   axios.delete(delurl+ currentid).then((response) => {
  //     // const message = response.message;
  //     // alert("Song deleted successfully");
  //     // console.log("Song deleted successfully");
  //   })
  // }

  const getAllSongs = () => {
    // rest API
    const url = 'http://localhost:4000/song/showallsongs'

    // send the GET request
    axios.get(url).then((response) => {
      const result = response.data
      console.log(result);
      if (result.message === "Successful query") {
        setAllSongs(result.data)
      } else {
        alert('error occured while getting all songs')
      }
    })
  }




  return (
    <div>
      <h2 className="page-title">Home</h2>
      <button className="btn btn-success button-position" onClick={getAllSongs}>
        Get Songs
      </button>
      {/* <HorizontalSlider items={allSongs} title="All Songs" /> */}
         <div className = "container">
             <SongRow title= "hits" songs = {allSongs}/> 
         </div>
         <hr/>
         <div>
              <SongsTable songs={allSongs}/>
         </div>
         
         <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Admin Panel
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li>
                  <Link className="nav-link" to="/song/addsong">
                    Add songs to db
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/song/delete">
                    update songs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
        <Switch>
            <Route path="/song/addsong" component={AddSong} />
          </Switch>
          <Switch>
            <Route path="/song/delete" component={UpdateSong} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>

    </div>
  )
}


const SingleSongTile = ({song}) => {
  const url = 'http://localhost:4000/'
  return    (    <div className="singlesongtile zoom">
                      <img src={url + song.thumbnail} className="thumbnailList"></img>
                      <h6>{song.title}</h6>
                  </div>) 
}

const SongRow = ({songs})=> {
  return (
      
      <div className="SongRow">
          <div>
              
              {songs.map((song) => {
                  return <SingleSongTile song={song} />
              })}

          </div>  

          

      </div>
  )
  
}




const SongsTable = ({songs}) => {
  const url = 'http://localhost:4000/';
  return <table className="table table-striped table-responsive">
  <thead>
    <tr>
      <th>id</th>
      <th></th>
      <th>Name</th>
      <th>Duration</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {songs.map((song) => {
      // console.log(song);
      // setCurrentid(song.id);
      // console.log(currentid);
      return <tr>
        <td>{song.id}</td>
        <td><img src={url + song.thumbnail} className="thumbnailList"></img></td>
        <td><h6>{song.title}</h6></td>
        <td>{song.duration}</td>
        <td input = "button" onClick = {()=>{
           const delurl = 'http://localhost:4000/song/delete/'
           axios.delete(delurl+ song.id).then((response) => {
             const message = response.message;
             alert("Song deleted successfully");
             console.log("Song deleted successfully");
            })
           }}>
           <button>Delete</button>
        </td>
      </tr>
    })}
  </tbody>
</table>
  
}

// const App = ()=> {
//   return (
//     <div>
//         <h4 className="songGenre">All Time Classics</h4>
//         <div className = "container">
            
//             <SongRow title= "hits" songs = {songs1}/> 
//         </div>
//         <h4 className="songGenre">Top 10</h4>
//         <div className="container">
            
//             <SongRow title= "Top10charts" songs = {songs1}/>
//         </div>
//     </div>
   
    
//   )
  
// } 

export default Home;
