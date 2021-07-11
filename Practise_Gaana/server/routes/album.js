const express = require('express')
const router = express.Router()
const db = require('../dbutils/db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const { response } = require('express')

console.log(db.eventNames);

router.get('/profile/:id', (request, response) => {
  const { id } = request.params
  results = {};
  const query = `select id, firstName, lastName, isActive, email from user where id = ${id}`
  console.log(query);
  db.query(query, (error, users) => {
      if (error) {
          console.log(error);
          results['message'] = error;
          response.send(results);
      }
      else{
          
          results['data'] = users;
          if(users.length === 0) {
           //response.write("Invalid username or password");
        //    console.log("invalid username or password");
        //    response.send({message: 'Invalid username or password'});
            results['message'] = 'Invalid username or password';
            response.send(results);
                
          }
          else{
            results['message'] = 'Successful query';
            response.send(results);
        }
          }
         
  })
})


router.post('/signin',(request, response) => {
    const { email, password } = request.body       //spread operation
    const results = {};
    console.log(request.body);

    
    const query = `Select * from user where email = '${email}' and password = '${password}'`;
    db.query(query,(error, result) => {
        if(error) {
            console.log(error);
            results['error'] = error;
            results['message'] = "Some error occurred";
            response.send(results);
        }
        else{
            results['data'] = result;
            if(results['data'].length === 0) {
                results['message'] = "Invalid username or password"
                response.send(results);
            }
            else{
                results['message'] = 'Successful querry';
                response.send(results);
            }
        }
    })
})

router.post('/signup',(request,response)=>{
    const {firstName,lastName,email,password} = request.body;   //spread operation
    const query =  `INSERT INTO user(firstName,lastName,email,password) 
                    VALUES('${firstName}','${lastName}','${email}','${password}')`;
    db.query(query,(error,result)=>{
        const results = {};
        if(error){
            results['error'] = error;
            results['message'] = "Unsuccessful query";
            response.send(results);
        }
        else{
            results['data'] = result;
            results['message'] = "User added successfully";
            response.send(results);
        }
    })

})

router.delete('/delete/:id',(request,response)=>{
    const {id} = request.params;
    const query = `DELETE FROM user WHERE id = ${id}`;
    db.query(query,(error,result)=>{
        const results = {};
        if(error){
            results['error'] = error;
            results['message'] = "Error occured while deleting user";
            response.send(results);
        }
        else{
            results['data'] = result;
            results['message'] = "User deleted successfully";
            response.send(results);
        }
    })
})

router.get('/showallusers',(request, response)=>{
    const query = `SELECT * FROM user`;
    db.query(query,(error,result)=>{
        const results = {};
        if(error){
            results['error'] = error;
            results['message'] = "Unsuccessful query";
        }
        else{
            results['data'] = result;
            if(result.length===0) {
                results['message'] = "Empty user table or no user found";
                response.send(results);
            }
            else{
                results['message'] = "Successful query";
                response.send(results);
            }
        }
    })
})

module.exports = router;
