const express = require('express');
const projects = require('../models/project');
const project = require('../models/project')
const router = express.Router();
const jwt = require('jsonwebtoken');
const { decoder } = require('../controllers/decoderToken')

router.get('/', async (req, res) =>{ 
    try{
        const list = await project.find();
        res.status(200).json(list)
    }catch(err){
        res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) =>{
    try{
        const single = await project.findOne({_id: req.params.id});
        res.send(single)
    }catch(err){
        res.send(err)
    }
})

router.post('/add', async (req, res) =>{
    try{
        const create = await project.create({
             title: req.body.title,
             description: req.body.description,
             starting_date: req.body.startingdate,
             ending_date: req.body.endingdate,
             createAt: new Date(),
             importance: req.body.importance
         })

         console.log(create);

    }catch(err){
     console.log(err);
    }
})


router.patch('/:id', async (req, res) =>{
    try{
        const update = await project.findOneAndUpdate({_id: req.params.id}, {
            title: req.body.title,
            description: req.body.description,
            starting_date: req.body.startingdate,
            ending_date: req.body.endingdate,
            importance: req.body.importance
        })

        res.send("Updated Successfully")

    }catch(err){
        res.send('Wow')
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const deleted = await projects.findOneAndDelete({_id: req.params.id});
        res.send('Deleted Successfully')
  }catch(err){
        res.send(err)
  }
})


module.exports = router