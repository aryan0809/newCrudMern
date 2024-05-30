const express = require('express');
const User= require('../api/models/userModel');
const router= express.Router();


router.post("/", async (req, res) => {
    const { name, email, age, profilePic } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Create a new user if the email does not exist
        const userData = await User.create({
            name: name,
            email: email,
            age: age,
            profilePic: profilePic
        });

        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//find all
router.get("/", async(req, res)=>{
    try{
        const user = await User.find();
    res.status(201).json(user);
    }catch(error){
        console.log(error)
    res.status(500).json({error:error.message})    ;
    }
    
});

//find by id 

router.get('/:id', async(req, res)=>{
    try{
        const{id}= req.params;
        const singleUser= await User.findById(id);
        res.status(201).json(singleUser);
    }catch(error){
        console.log('error in find by id' , error);
        res.status(400).json({error:error.message});
    }
});


//delete

router.delete('/:id', async(req, res)=>{
    try{
        const{id}= req.params;
        const singleUser= await User.findByIdAndDelete({_id:id});
        res.status(201).json(singleUser);
    }catch(error){
        console.log('error in find by id' , error);
        res.status(400).json({error:error.message});
    }
});

//put /patch

router.patch('/:id', async(req, res)=>{
    const{id}=req.params;
    const {name, email, age}=req.body;
    try{
        const updateUser= await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updateUser);
    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

module.exports= router;