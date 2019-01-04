const express = require('express')
const bodyParser = require('body-parser')

const app = express() 

app.use(express.static('public'))

app.listen(4100, () => {
    console.log('listening on port 4100')
})