const express = require('express')
const { createPalette, getAllPalette } = require('../modules/palette')
const router = express.Router()

router.get('/all', (req, res, next) => {
    const { skip = 0, count = 50 } = req.query
    const palette = getAllPalette(skip, count)
    res.status(200).json(palette)
    next()
})

router.post('/create', express.json(), (req, res, next) => {
    try {
        const { colors } = req.body;
        const palette = createPalette({ colors, userName: 'develop' })
        if (!palette) {
            res.status(201).json(false)
        }
        else {
            res.status(201).json(palette)
        }
    } catch (error) {
        res.locals['response-content'] = error
        res.status(500).send(error.message)
    }
    next()
})

module.exports = router