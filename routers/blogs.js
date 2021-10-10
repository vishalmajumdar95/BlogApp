const express = require('express');
const router = express.Router();
const BlogService = require("../services/blogs");
const Service = new BlogService();

const { authenticateToken } = require('../auths/jwt');

// create blog 
router.post("/createblog", authenticateToken, async(req, res) => {
    console.log(req.body)
    Service.createblog(req.body).then((data) => {
        console.log(data, "userblog");
        res.send({ "success": "BlogCreate successfully...." })
    }).catch((err) => {
        res.send(err)
        console.log(err)
    })
});

// get all blog
router.get('/getallblog', authenticateToken, (req, res) => {
    Service.findAll().then((data) => {
        console.log(data, "hello blogs");
        res.send(data)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
});

// get user by id
router.get('/getblog/:id', authenticateToken, (req, res) => {
    const blog = req.params.id;
    Service.findById(blog).then((data) => {
        console.log({ "success": data })
        res.send(data)
    }).catch((err) => {
        res.send(err)
    });
});

// update blog
router.put("/updateblog/:id", authenticateToken, (req, res) => {
    Service.UpdateById(req.params.id, req.body).then(data => {
        if (data > 0) {
            res.send({ "success": `Id ${req.params.id} details updated` });
        } else {
            res.send({ "sorry": `Id ${req.params.id} not found!` });
        }
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
});

// delete Blog
router.delete("/deleteblog/:id", authenticateToken, (req, res) => {
    const blog = req.params.id;
    Service.deleteById(blog).then((data) => {
        console.log(data, "data");
        if (data > 0) {
            res.send({ 'success': `Blog ${req.params.id} deleted successfully` })
        } else {
            res.send({ "sorry": `Blog ${req.params.id} not exist!` })
        }
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
});


module.exports = router;