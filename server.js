const express = require('express')
const bodyParser = require('body-parser')

const app = express() 

app.use(express.static('public'))

app.listen(3004, () => {
    console.log('listening on port 3004')
})