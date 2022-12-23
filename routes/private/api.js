const { isEmpty } = require('lodash');
const { v4 } = require('uuid');
const db = require('../../connectors/db');
const roles = require('../../constants/roles');

module.exports = function(app) {
  // Register HTTP endpoint to get all users
  app.get('/api/v1/users', async function(req, res) {
    const results = await db.select('*').from('users');
    return res.json(results)
  });

  //Register HTTP endpoint to get all courses in a faculty
  app.get('/api/v1/faculties', async function (req,res){
    const coursesExists = await db.select('*').from('courses');
    const search ={
      facultyId: req.body.facultyId
    }
    if(isEmpty(coursesExists)){
      return res.status(400).send('Could not get courses because list is empty');
    }
    try{
      const results = await db.select('*').from('courses').where('facultyId',req.body.facultyId);
      return res.status(200).json(results);
      console.log(results);
    }
    catch(error){
      console.log(error.message);
      return res.status(400).send('Could not get courses');
    }
  })

  app.get('/api/v1/enrollements' , async (req , res) => {
    try{
    const result = await db.select ('*').from('enrollements').where('courseId',req.body.courseId);
    console.log(`result here`,result.rows);
    //res.send(result.rows);
    return res.status(200).json(result);
    }catch(err){
        console.log("error message",err.message);
        return res.status(400).send('Could not get enrollements');
    }
  });
  app.post('/api/v1/faculties/transfer', async function(req,res){
    const newRequest={
      currentFacultyId:req.body.currentFacultyId,
      newFacultyId: req.body.newFacultyId,
      userId:req.body.userId,
      transferStatus: "pending"
    }
    try {
      const request = await db('transferRequests').insert(newRequest).returning('*');
      return res.status(200).json(request);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not register request');
    }
  })
  app.delete('/api/v1/courses/:courseId', async (req, res)=> {
  
    try {
      const query = `delete from courses where Id=${req.params.courseId}`;
      const result = await db.raw(query);
      res.send("deleted succesfully");
    } catch (err) {
      console.log("eror message", err.message);
      res.send("failed to delete course");
    }
  
})
app.put('/api/v1/enrollements/:courseId', async (req, res)=> {
  
  try {
    const {grade} = req.body;
    console.log(req.body,grade);
    const query = `update enrollements
                       set grade = '${grade}',
                       where userId = ${req.body.userId}`
    const result = await db.raw(query);
    res.send("updated succesfully");
  } catch (err) {
    console.log("eror message", err.message);
    res.send("failed to update grades");
  }

})
};



