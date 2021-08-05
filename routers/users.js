var express = require('express');
const router = express.Router();
const UserService = require("../services/users");
const service = new UserService();

const { generateToken } = require('../auths/jwt');

// welcome route
router.get('/homepage', (req, res) => {
    console.log({ "success": "Welcome on the home page" });
    res.send({ "success": "Welcome in the home page" })
});

// get signup users
router.post('/signup', async(req, res) => {
    // console.log(req.body);
    await service.create(req.body).then((data) => {
        console.log(data, "User data");
        res.send({ "success": "Signup successfully...." });
    }).catch((err) => {
        res.send(err)
        console.log(err)
    })
});

// get all users
router.get('/getalluser', (req, res) => {
    service.findAll().then((data) => {
        console.log(data, "hello users");
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
});

// get user by id
router.get('/getuser/:id', (req, res) => {
    const userId = req.params.id;
    service.findById(userId).then((data) => {
        console.log({ "success": data })
        res.send(data)
    }).catch((err) => {
        res.send(err)
    });
});

// update user
router.put('/updateuser/:id', (req, res) => {
    service.UpdateById(req.params.id, req.body).then((data) => {
        if (data > 0) {
            res.send({ "success": `Id ${req.params.id} details updated` });
        } else {
            res.send({ "sorry": `Id ${req.params.id} not found!` });
        }
    }).catch((err) => {
        res.send(err)
    })
});

// delete user
router.delete('/deleteuser/:id', (req, res) => {
    const userId = req.params.id;
    service.deleteById(userId).then((data) => {
        console.log(data, 'data');
        if (data > 0) {
            res.send({ 'success': `Id ${req.params.id} deleted successfully` });
        } else {
            res.send({ "sorry": `Id ${req.params.id} not exist!` })
        }
    }).catch((err) => {
        res.send(err)
    })
});

// login user
router.post('/login', async(req, res) => {
    const userdata = await service.emailChecking(req.body.email);
    if (userdata) {
        const passCheck = await service.PassChecking(userdata, req.body.password);
        if (passCheck) {
            const token = generateToken(userdata)
            res.cookie("Key", token)
            console.log({ "token": token })
            res.send({ "Message": "Login successfully" });
        } else {
            res.send({ "sorry": "wrong password! " });
        }
    } else {
        res.send({ "sorry": "This email not exist!" });
    }
})

module.exports = router;