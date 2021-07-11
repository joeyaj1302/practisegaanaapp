const express = require('express')
const router = express.Router()
const db = require('../dbutils/db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const { response } = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

console.log(db.eventNames);

// router.get('/songbyid/:id', (request, response) => {
//     const { id } = request.params
//     results = {};
//     const query = `select id, title, albumId, duration, thumbnail from song where id = ${id}`
//     console.log(query);
//     db.query(query, (error, users) => {
//         if (error) {
//             console.log(error);
//             results['message'] = error;
//             results['status'] = '404'
//             response.send(results);
//         }
//         else{
            
//             results['data'] = users;
//             if(users.length === 0) {
//              //response.write("Invalid username or password");
//           //    console.log("invalid username or password");
//           //    response.send({message: 'Invalid username or password'});
//               results['message'] = "Invalid song id or song doesn't exist in database";
//               response.send(results);
                  
//             }
//             else{
//               results['message'] = 'Successful query';
//               response.send(results);
//           }
//             }
           
//     })
//   })

router.get('/songbyid/:id', (request, response) => {
    const { id } = request.params
    results = {};
    const query = `select id, title, albumId, duration, thumbnail from song where id = ${id}`
    console.log(query);
    db.query(query, (error, result) => {
          response.send(utils.CreateResult(error, result));
      })
  })
  
router.post('/updatesong',upload.single('thumbnail'),(request,response) => {
    const {title,artistId,albumId,duration,newtitle} = request.body;
    const filename = request.file.filename;
    const query = `UPDATE song set title = "${newtitle}",artistId = ${artistId},albumId = ${albumId},
                   duration = "${duration}",thumbnail = "${filename}" WHERE title = "${title}"`;
    console.log(query);
    db.query(query,(error,result)=>{
        response.send(utils.CreateResult(error,result));
    })
        
})

router.get('/showallsongs',(request, response)=>{
    const query = `select id, title, albumId, duration, thumbnail from song`;
    db.query(query,(error,result)=>{
        const results = {};
        if(error){
            results['error'] = error;
            results['status'] = '404'
            results['message'] = "Unsuccessful query";
        }
        else{
            results['data'] = result;
            if(result.length===0) {
                results['message'] = "Empty song table or no song found";
                response.send(results);
            }
            else{
                results['message'] = "Successful query";
                response.send(results);
            }
        }
    })
})


router.post('/addsong',upload.single('thumbnail'),(request,response)=>{
    const { title, artistId, albumId, duration } = request.body   //spread operation
    
    const filename = request.file.filename;
    const query = `insert into song (title, artistId, albumId, thumbnail, duration) values ('${title}', '${artistId}', '${albumId}', '${filename}', '${duration}')`
    db.query(query,(error,result)=>{
        const results = {};
        if(error){
            results['error'] = error;
            results['status'] = '504'
            results['message'] = "Unsuccessful query";
            response.send(results);
        }
        else{
            results['data'] = result;
            results['message'] = "Song added successfully";
            response.send(results);
        }
    })

})

router.delete('/delete/:id',(request,response)=>{
    const {id} = request.params;
    const query = `DELETE FROM song WHERE id = ${id}`;
    db.query(query,(error,result)=>{
        const results = {};
        if(error){
            results['error'] = error;
            results['message'] = "Error occured while deleting song";
            response.send(results);
        }
        else{
            results['data'] = result;
            results['message'] = "Song deleted successfully";
            response.send(results);
        }
    })
})



module.exports = router;
