const express = require('express')
const { createPalette, getAllPalette } = require('../modules/palette')
const router = express.Router()

router.get('/all', (req, res) => {
    const { skip = 0, count = 50 } = req.query
    const palette = getAllPalette(skip, count)
    res.status(200).json(palette)
})

router.post('/create', express.json(), (req, res) => {
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
        console.log(error);
        res.status(500).send(error.message)
    }
})

module.exports = router