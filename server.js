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
    let q = req.query['q'].toLowerCase()
    if (q == 'kamel') {
        sendSliderPuzzle(
            "/img/1.jpg",
            "http://31.media.tumblr.com/bce8ab31e15720046985d91e1801af18/tumblr_mrd6z6guyu1qzuhkbo1_1280.gif",
            3,
            'Reichtum = Jüngling auf Seekuh',
            90,
            res
        )
    }
    else if (q == 'fahrrad') {
        sendSliderPuzzle(
            "/img/2.jpg",
            "https://media.giphy.com/media/7lsw8RenVcjCM/giphy.gif",
            4,
            'Schönheit = Jungfrau auf Einhorn',
            3*60,
            res
        )
    }
    else if (q == 'josef') {
        sendSliderPuzzle(
            "/img/3.jpg",
            "https://media.giphy.com/media/yqMtk0TfjRa5W/giphy.gif",
            4,
            'Phantasie = Reiterin auf (steigendem) Pferd',
            4*60,
            res
        )
    }
    else if (q == 'luftballon') {
        sendSliderPuzzle(
            "/img/4.jpg",
            "https://33.media.tumblr.com/17ffd65788d459e6591e5aade7a5b24d/tumblr_nwr7rtfzyt1ske259o1_500.gif",
            5,
            'Kraft = Herkules auf Stier',
            5*60,
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