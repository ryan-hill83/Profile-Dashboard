const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const mongodbURL = 'mongodb://profiles:epicride1@ds263493.mlab.com:63493/profiles'
mongoose.connect(mongodbURL, { useNewUrlParser: true });
const db = mongoose.connection;
const dotenv = require('dotenv');
dotenv.load();
const PORT = process.env.PORT || 8080
const Profile = require('./schemas/Profile')
const User = require('./schemas/User')
const bcrypt = require('bcrypt');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const crypto = require('crypto')
const saltRounds = 10;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

let gfs 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    gfs = Grid(db.db, mongoose.mongo)
    gfs.collection('images')
  console.log('connected to MongoDb...')
});

const storage = new GridFsStorage({
    url: mongodbURL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
      //    const filename = buf.toString('hex') + path.extname(file.originalname);
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'images'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

  app.post('/upload', upload.single('image'), (req, res) => {
        res.json({file: req.file})
  })

  app.get('/files', (req, res) => {
      gfs.files.find().toArray((err, files) => {
            if(!files || files.length === 0){
                return res.status(404).json({
                    err: 'No files exist'
                })
            }
            return res.json(files)
      })
  })

  app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        return res.json(file)
    }) 
})

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                const readstream = gfs.createReadStream(file.filename)
                readstream.pipe(res)
        }
        else {res.status(404).json({err: 'Not an image'})}
    }) 
})

app.post('/profile', (req, res) => {
    
    let profile = req.body.profile
    let name = profile.name
    let filename = profile.image
    let description = profile.description
    let user = profile.user

   Profile.findOneAndUpdate({user: user}, {name: name , filename: filename, description: description, user : user}, {upsert:true}, function(err, doc){} )
})

app.get('/profiles', (req,res) => {
    Profile.find({}).sort('name').exec((err, feedback) => res.json(feedback));
  })

app.post('/registerUser', (req,res) => {

  let newUser = req.body.newUser

  let email = newUser.email
  let password = newUser.password

  User.findOne({email: email},(error,user) => {
    if(!user){
      bcrypt.hash(password, saltRounds, function(err, hash) {
        var newUser = new User({
          email: email,
          password: hash,
          created_at: Date.now()
        });
        newUser.save();

        res.send(JSON.stringify({message: 'Account created succesfully'}))
      });
    } else {
      res.send(JSON.stringify({message: 'This email address is already registered...'}))
    }
})
})

app.get('/ViewUsers', (req,res) => {
  User.find({}).exec((err, users) => res.json(users))
})

app.post('/DeleteUsers/:UserID', (req,res) => {
  let UserID = req.params.UserID

  User.findByIdAndDelete(UserID).then(() => res.send(JSON.stringify({message: 'User deleted'})))
})

app.post('/login', (req,res) => {

  let user = req.body.user

  console.log(user)
  let password = user.password
  let email = user.email

  User.findOne({email: email},(error,user) => {
    if(!user){
      res.send(JSON.stringify({message: 'This email address in not registered...'}))
    } else {
    bcrypt.compare(password, user.password, function(err, response) {
      if(response){
        res.send(JSON.stringify({isAuthenticated: true, isAdmin: user.isAdmin, user: user}))
      } else {
        res.send(JSON.stringify({message: 'Password is incorrect...'}))
      }
});
}
})
})

app.get('/', (req,res) => res.send("/"))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))