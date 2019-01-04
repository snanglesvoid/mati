const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const app = express() 

app.use(express.static('public/assets'))

app.use(bodyParser.urlencoded({extended: true}))

function sendSliderPuzzle(imageUrl, catUrl, difficulty, solution, time, responseObject) {
    fs.readFile(path.join(__dirname, '/public/slider.html'), 'utf8', function(err, data) {
        if (err) {
            responseObject.status(500).json(err)
            return console.log(err)
        }

        let result = data
            .replace(/#imageUrl/g, imageUrl)
            .replace(/#catUrl/g, catUrl)
            .replace(/#difficulty/g, difficulty)
            .replace(/#solution/g, solution)
            .replace(/#time/g, time)

        responseObject.send(result)
    })
}

app.get('/codeword', (req, res) => {
    let q = req.query['q']
    if (q == 'IAmMati') {
        // res.sendFile(path.join(__dirname, '/public/slider.html'))
        sendSliderPuzzle(
            "https://farm7.staticflickr.com/6140/5958084943_5d0a1c141f_n.jpg",
            "http://31.media.tumblr.com/bce8ab31e15720046985d91e1801af18/tumblr_mrd6z6guyu1qzuhkbo1_1280.gif",
            4,
            'This is the Solution',
            4*60,
            res
        )
    }
    else if (q == 'xyz') {
        res.sendFile(path.join(__dirname, '/public/jigsaw.html'))
    }
    else {
        res.sendFile(path.join(__dirname, '/public/error.html'))
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(4100, () => {
    console.log('listening on port 4100')
})