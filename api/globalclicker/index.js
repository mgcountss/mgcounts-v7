const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const GlobalClicker = require('../../models/globalclicker-stats');

app.post('/stats/search', (req, res) => {
updateStats()
    res.send({
        "success": true,
        "results": [
            {
                "name": "Global Clicker V1",
                "icon": "/assets/gc/v1.png",
                "id": "1",
                "image": "round"
            },
            {
                "name": "Global Clicker V2",
                "icon": "/assets/gc/v2.png",
                "id": "2",
                "image": "round"
            },
            {
                "name": "Global Clicker V3",
                "icon": "/assets/gc/v3.png",
                "id": "3",
                "image": "round"
            },
            {
                "name": "Global Clicker V4",
                "icon": "/assets/gc/v4.png",
                "id": "4",
                "image": "round"
            },
            {
                "name": "Global Clicker V5",
                "icon": "/assets/gc/v5.png",
                "id": "5",
                "image": "round"
            },
            {
                "name": "Global Clicker V6",
                "icon": "/assets/gc/v6.png",
                "id": "6",
                "image": "round"
            }
        ]
    })
})
const urls = [
    'http://global-clicker.mrcode.io/getpoints',
    null,
    null,
    null,
    'https://clouddata.scratch.mit.edu/logs?projectid=459730402&limit=1&offset=0',
    null
];
app.get('/stats/:cid', (req, res) => {
updateStats()
    if (req.params.cid == "1" || req.params.cid == "2" || req.params.cid == "3" || req.params.cid == "4" || req.params.cid == "5" || req.params.cid == "6") {
        fetch();
        function fetch() {
            if (urls[req.params.cid - 1] != null) {
                axios.get(urls[parseFloat(req.params.cid) - 1])
                    .then(function (response) {
                        let data = response.data;
                        if (!data.error) {
                            GlobalClicker.findOne({ id: req.params.cid }, (err, gc) => {
                                if (gc) {
                                    if (req.params.cid == "1") {
                                        gc.stats[0].value = parseFloat(data);
                                    } else if (req.params.cid == "5") {
                                        gc.stats[0].value = parseFloat(data[0].value);
                                    }
                                    if (gc.data[gc.data.length - 1][0].value == ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()) {
                                        gc.data[gc.data.length - 1] = [
                                            {
                                                "name": "Date",
                                                "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                            }, {
                                                "name": "Clicks",
                                                "value": parseFloat(gc.stats[0].value)
                                            }
                                        ];
                                    } else {
                                        gc.data.push([
                                            {
                                                "name": "Date",
                                                "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                            }, {
                                                "name": "Clicks",
                                                "value": parseFloat(gc.stats[0].value)
                                            }
                                        ]);
                                    }
                                    gc.markModified('stats');
                                    gc.save();
                                    res.json({
                                        success: true,
                                        stats: gc.stats,
                                        misc: gc.misc,
                                        image: 'round',
                                    })
                                } else {
                                    res.send({ 'error': true, 'message': 'err' })
                                }
                            })
                        }
                    }).catch(function (error) {
                        GlobalClicker.findOne({ id: req.params.cid }, (err, gc) => {
                            if (gc) {
                                res.json({
                                    success: true,
                                    stats: gc.stats,
                                    misc: gc.misc,
                                    image: 'round',
                                })
                            } else {
                                res.send({ 'error': true, 'message': 'err' })
                            }
                        })
                    })
            } else {
                GlobalClicker.findOne({ id: req.params.cid }, (err, gc) => {
                    if (gc) {
                        if (gc.data[gc.data.length - 1][0].value == ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()) {
                            gc.data[gc.data.length - 1] = [
                                {
                                    "name": "Date",
                                    "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                }, {
                                    "name": "Clicks",
                                    "value": parseFloat(gc.stats[0].value)
                                }
                            ];
                            gc.save();
                        } else {
                            gc.data.push([
                                {
                                    "name": "Date",
                                    "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                }, {
                                    "name": "Clicks",
                                    "value": parseFloat(gc.stats[0].value)
                                }
                            ]);
                            gc.save();
                        }
                        res.json({
                            success: true,
                            stats: gc.stats,
                            misc: gc.misc,
                            image: 'round'
                        })
                    } else {
                        res.send({ 'error': true, 'message': 'err' })
                    }
                })
            }
        }
    } else {
        res.status(404).json({ 'error': true, 'message': 'Invaild ID.' })
    }
});

module.exports = app;