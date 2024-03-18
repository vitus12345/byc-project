const { Blog , validate } = require("../model/blog");

const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get("/", async (req, res) => {
    const blog = await Blog.find().sort({dateAdded: -1});
    res.send(blog);
  
});

router.post("/", [auth, admin], async(req, res)=> {

    const {image, title, author, body } = req.body;

    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
       
        const blog = new Blog({image, title, author, body });
        await blog.save()
        res.status(200).send(blog)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
      }

})

router.put("/:id", [auth, admin], async(req, res)=> {

    const {image, title, author, body } = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
       
       let blog = await Blog.findByIdAndUpdate(req.params.id, {image, title, author, body });

       if (!blog) return res.status(400).send("Blog not found");
       await blog.save()
       res.status(200).send(blog)
        
    }
    catch (err) {
        res.status(500).json({ message: err.message });
      }

})

router.delete("/:id", [auth, admin], async(req, res)=>{
    let blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) return res.status(400).send("Blog not found");

  res.send(blog);
})










  module.exports = router;