const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/mrbeast-teamtrees');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cheerio = require('cheerio');

app.get('/teamtrees/stats', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://teamtrees.org")
            .then(function (response) {
                let data = response.data;
                let $ = cheerio.load(data);
                res.json({
                    "success": true,
                    "id": 'teamtrees',
                    "stats": [
                        {
                            "name": "Trees Planted",
                            "value": Number($("#totalTrees")["0"].attribs["data-count"])
                        }
                    ],
                    "misc": [
                        {
                            "name": "Name",
                            "value": "TeamTrees"
                        }, {
                            "name": "Image",
                            "value": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Team_Trees_circle_logo.svg/1200px-Team_Trees_circle_logo.svg.png"
                        }, {
                            "name": "Banner",
                            "value": "https://teamtrees.org/images/social-share-earth-astronaut-1-9x1.png"
                        }, {
                            "name": "Created",
                            "value": null
                        }, {
                            "name": "Bio",
                            "value": null
                        }
                    ],
                    "image": "round"
                })
                User.findOne({ id: 'stats' }, (err, user) => {
                    if (user) {
                        user.stats = [
                            {
                                "name": "Trees Planted",
                                "value": Number($("#totalTrees")["0"].attribs["data-count"])
                            }
                        ]
                        if (user.data[user.data.length - 1][0].value == ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()) {
                            user.data[user.data.length - 1] = [
                                {
                                    "name": "Date",
                                    "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                }, {
                                    "name": "Trees Planted",
                                    "value": Number($("#totalTrees")["0"].attribs["data-count"])
                                }
                            ];
                        } else {
                            user.data.push([
                                {
                                    "name": "Date",
                                    "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                }, {
                                    "name": "Trees Planted",
                                    "value": Number($("#totalTrees")["0"].attribs["data-count"])
                                }
                            ]);
                        }
                        user.save();
                    }
                })
            }).catch(function (error, response) {
                User.findOne({ "id": 'stats' }, (err, user) => {
                    if (user) {
                        res.json({
                            "success": true,
                            "id": user.id,
                            "stats": user.stats,
                            "misc": user.misc,
                        })
                    } else {
                        res.json({
                            "success": false,
                            "error": "Error: " + error.message
                        })
                    }
                });
            });
    }
});

module.exports = app;