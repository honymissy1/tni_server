const express = require('express');
const projects = require('../models/project');
const project = require('../models/project')
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const auth = require('../middleware/auth')


router.use(cors())
router.get('/', async (req, res) =>{
    const queryValue = req.query.search;
    const queryRegex = queryValue ? {title:{$regex: new RegExp(queryValue, "i")}} : {};
    
    try{
        const list = await project.find(queryRegex).sort({createAt: -1});
        console.log(list)
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

router.post('/add', auth, async (req, res) =>{
    try{
        const create = await project.create({
             title: req.body.title,
             description: req.body.description,
             starting_date: req.body.starting_date,
             ending_date: req.body.ending_date,
             createAt: new Date(),
             importance: req.body.importance
         })

         res.status(200).json({message: 'Project Created'})
         console.log(create);

    }catch(err){
        res.status(401).json({message: 'Error'})

     console.log(err);
    }
})


router.put('/:id', auth, async (req, res) =>{
    try{
        const update = await project.findOneAndUpdate({_id: req.params.id}, {
            title: req.body.title,
            description: req.body.description,
            starting_date: req.body.starting_date,
            ending_date: req.body.ending_date,
            importance: req.body.importance
        })
        
        res.send("Updated Successfully")

    }catch(err){
        res.send('Wow')
    }
})

router.delete('/:id', auth, async (req, res) =>{
    try{
        const deleted = await projects.findOneAndDelete({_id: req.params.id});
        res.send('Deleted Successfully')
  }catch(err){
        res.send(err)
  }
})


module.exports = router