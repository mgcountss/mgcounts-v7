const app = require('express').Router();
const updateStats = require('../../stats.js');
const Stats = require('../../models/stats');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/stats/:a', (req, res) => {
    updateStats()
    Stats.find({}).then(item => {
        res.json(item);
    });
});

module.exports = app;