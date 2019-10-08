const express = require('express');
var cors = require('cors');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Member = require('../models/post');
const router = express.Router();

router.use(cors())

router.get('/', async (req,res) => {
  try{
    const posts = await Member.find()
    res.json(posts)
  }catch(err){
    res.json({message:err })
  }
});

router.post('/', async (req,res) => {
  const post = new Member({
      userID: req.body.userID, //we specify the field from our shcema and what we will fill it up with
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      birthOfDate: req.body.birthOfDate,
      email: req.body.email,
      phone: req.body.phone
});
    try{
      const savedPost = await post.save();
      console.log(savedPost)
      res.json(savedPost); //it will output the response in a json format
    }catch (err) {
      res.json({ message: err });//it will output the error in a json format
    }
});

router.get('/:postId', async (req,res) => {
  try {
    //console.log(req.params.postId);
    const post = await Member.findById(req.params.postId)
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:postId', async (req,res ) => {
  try {
    const removedPost = await Member.remove({_id: req.params.postId })
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/:postId', async (req,res) => {
  let newBody = {}
  Object.keys(req.body).filter( i => i !== '_id').map(key => newBody[key] = req.body[key])
  console.log(newBody)
  try{
    const updatePost = await Member.findByIdAndUpdate({_id: req.params.postId }, newBody)
    res.send(updatePost)
  } catch (err) {
    res.json({ message: err });
    console.log(err)
  }
});


module.exports = router;
