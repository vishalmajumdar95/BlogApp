const express = require("express");
const router = express.Router();
const LikeDislikeService = require("../services/likedislikes");
const Server = new LikeDislikeService();

const { authenticateToken } = require('../auths/jwt');


// Home page
router.get('/home', async(req, res) => {
    res.send({ "success": "Like Create successfully...." })
})

// create like 
router.put('/like', authenticateToken, async(req, res) => {
    console.log(req.body);
    Server.createLike(req.body).then((data) => {
        console.log(data, "data")
        res.send({ "success": "Like Create successfully...." })
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

// create dislike
router.put('/dislike', authenticateToken, async(req, res) => {
    console.log(req.body);
    Server.createDislike(req.body).then((data) => {
        console.log(data, "data")
        res.send({ "success": "Dislike Create successfully...." })
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

// get all likes
router.get("/alllikes", authenticateToken, async(req, res) => {
    console.log(req.body)
    Server.findAllLikes().then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

//get all dislike
router.get("/alldislikes", authenticateToken, async(req, res) => {
    console.log(req.body)
    Server.findAllDislikes().then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err) => {
        console.log(err)
        res.send(err)
    })
})

module.exports = router;