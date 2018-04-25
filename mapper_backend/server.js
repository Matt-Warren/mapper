const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

let storage = multer.diskStorage(
  {
      destination: './public/maps',
      filename: function ( req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);

let upload = multer({ storage: storage })

const app = express()
app.use(cors())
app.use(express.static('public/maps'))

app.get('/', (req, res) => {
  console.log('hello world')
  res.send()
})

app.post('/upload', upload.single('map'), (req, res, next) => {
  console.log('got post @ /upload')
  console.log(req.file)
  console.log(req.body)
})

app.listen(8081, () => {
    console.log('mapper_backend started on port 8081.')
})