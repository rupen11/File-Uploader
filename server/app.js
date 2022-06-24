require('dotenv').config()
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const imageModel = require("./model/imageModel");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
require("./db/db");
app.use('/public', express.static('public'));

const DIR = './public/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(".");
        cb(null, fileName[0] + Date.now() + Math.floor(Math.random(10)) + "." + fileName[1]);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return res.status(400).send('Only .png, .jpg and .jpeg format allowed!');
        }
    }
});

app.post('/profile', upload.single('avatar'), async (req, res) => {
    try {
        console.log(req.file);
        const url = req.protocol + '://' + req.get('host');
        const user = new imageModel({
            name: req.body.name,
            avatar: url + '/public/' + req.file.filename
        });
        const saveUser = await user.save();
        if (!saveUser) return res.status(400).send("Some error");
        return res.status(200).send("saved");
    }
    catch (error) {
        console.log(error);
    }
})

app.get('/getData', async (req, res) => {
    try {
        const user = await imageModel.findById(id);
        if (!user) return res.status(400).send("Some error");
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running at http://localhost:" + process.env.PORT);
})