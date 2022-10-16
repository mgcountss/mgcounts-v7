const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/roblox-games');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/game/search', (req, res) => {
updateStats()
    axios.get("https://games.roblox.com/v1/games/list?keyword=" + req.body.search + "&startRows=0&maxRows=10&hasMoreRows=true&isKeywordSuggestionEnabled=true")
        .then(response => {
            let ids = [];
            for (let i = 0; i < response.data.games.length; i++) {
                ids.push(response.data.games[i].universeId);
            }
            axios.get("https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=" + ids.join(",") + "&size=768x432&format=Png&isCircular=false")
                .then(response2 => {
                    let results = [];
                    for (let i = 0; i < response.data.games.length; i++) {
                        results.push({
                            "name": response.data.games[i].name,
                            "icon": response2.data.data[i].thumbnails[0].imageUrl,
                            "id": response.data.games[i].universeId,
                            "image": "rect"
                        });
                    }
                    res.json({
                        "success": true,
                        "results": results
                    });
                }).catch(err => {
                    res.json({
                        "success": false,
                        "results": []
                    });
                })
        }).catch(err => {
            res.json({
                "success": false,
                "results": []
            });
        })
})

app.get('/game/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://games.roblox.com/v1/games?universeIds=" + req.params.cid + "")
            .then(function (response1) {
                axios.get("https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=" + req.params.cid + "&size=768x432&format=Png&isCircular=false")
                    .then(function (response2) {
                        axios.get("https://games.roblox.com/v1/games/votes?universeIds=" + req.params.cid + "")
                            .then(function (response3) {
                                let data1 = response1.data;
                                let data2 = response2.data;
                                let data3 = response3.data;
                                data1.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                res.json({
                                    "success": true,
                                    "id": req.params.cid,
                                    "stats": [
                                        {
                                            "name": "Visits",
                                            "value": parseFloat(data1.data[0].visits)
                                        }, {
                                            "name": "Playing",
                                            "value": parseFloat(data1.data[0].playing)
                                        }, {
                                            "name": "Favorites",
                                            "value": parseFloat(data1.data[0].favoritedCount)
                                        }, {
                                            "name": "Up Votes",
                                            "value": parseFloat(data3.data[0].upVotes)
                                        },
                                        {
                                            "name": "Down Votes",
                                            "value": parseFloat(data3.data[0].downVotes)
                                        }
                                    ],
                                    "misc": [
                                        {
                                            "name": "Name",
                                            "value": data1.data[0].name
                                        }, {
                                            "name": "Image",
                                            "value": data2.data[0].thumbnails[0].imageUrl
                                        }, {
                                            "name": "Banner",
                                            "value": data2.data[0].thumbnails[0].imageUrl
                                        }, {
                                            "name": "Created",
                                            "value": null
                                        }, {
                                            "name": "Bio",
                                            "value": null
                                        }
                                    ],
                                    "image": 'rect'
                                })
                                User.findOne({ id: req.params.cid }, (err, user) => {
                                    if (user) {
                                        user.stats = [
                                            {
                                                "name": "Visits",
                                                "value": parseFloat(data1.data[0].visits)
                                            }, {
                                                "name": "Playing",
                                                "value": parseFloat(data1.data[0].playing)
                                            }, {
                                                "name": "Favorites",
                                                "value": parseFloat(data1.data[0].favoritedCount)
                                            }, {
                                                "name": "Up Votes",
                                                "value": parseFloat(data3.data[0].upVotes)
                                            },
                                            {
                                                "name": "Down Votes",
                                                "value": parseFloat(data3.data[0].downVotes)
                                            }
                                        ]
                                        if (user.data[user.data.length - 1][0].value == data1.date) {
                                            user.data[user.data.length - 1] = [
                                                {
                                                    "name": "Date",
                                                    "value": data1.date
                                                }, {
                                                    "name": "Visits",
                                                    "value": parseFloat(data1.data[0].visits)
                                                }, {
                                                    "name": "Playing",
                                                    "value": parseFloat(data1.data[0].playing)
                                                }, {
                                                    "name": "Favorites",
                                                    "value": parseFloat(data1.data[0].favoritedCount)
                                                }, {
                                                    "name": "Up Votes",
                                                    "value": parseFloat(data3.data[0].upVotes)
                                                },
                                                {
                                                    "name": "Down Votes",
                                                    "value": parseFloat(data3.data[0].downVotes)
                                                }
                                            ];
                                        } else {
                                            user.data.push([
                                                {
                                                    "name": "Date",
                                                    "value": data1.date
                                                }, {
                                                    "name": "Visits",
                                                    "value": parseFloat(data1.data[0].visits)
                                                }, {
                                                    "name": "Playing",
                                                    "value": parseFloat(data1.data[0].playing)
                                                }, {
                                                    "name": "Favorites",
                                                    "value": parseFloat(data1.data[0].favoritedCount)
                                                }, {
                                                    "name": "Up Votes",
                                                    "value": parseFloat(data3.data[0].upVotes)
                                                },
                                                {
                                                    "name": "Down Votes",
                                                    "value": parseFloat(data3.data[0].downVotes)
                                                }
                                            ]);
                                        }
                                        user.save();
                                    } else {
                                        let newUser = new User({
                                            "id": req.params.cid,
                                            "stats": [
                                                {
                                                    "name": "Visits",
                                                    "value": parseFloat(data1.data[0].visits)
                                                }, {
                                                    "name": "Playing",
                                                    "value": parseFloat(data1.data[0].playing)
                                                }, {
                                                    "name": "Favorites",
                                                    "value": parseFloat(data1.data[0].favoritedCount)
                                                }, {
                                                    "name": "Up Votes",
                                                    "value": parseFloat(data3.data[0].upVotes)
                                                },
                                                {
                                                    "name": "Down Votes",
                                                    "value": parseFloat(data3.data[0].downVotes)
                                                }
                                            ],
                                            "misc": [
                                                {
                                                    "name": "Name",
                                                    "value": data1.data[0].name
                                                }, {
                                                    "name": "Image",
                                                    "value": data2.data[0].thumbnails[0].imageUrl
                                                }, {
                                                    "name": "Banner",
                                                    "value": data2.data[0].thumbnails[0].imageUrl
                                                }, {
                                                    "name": "Created",
                                                    "value": null
                                                }, {
                                                    "name": "Bio",
                                                    "value": null
                                                }
                                            ],
                                            "data": [
                                                [
                                                    {
                                                        "name": "Date",
                                                        "value": data1.date
                                                    }, {
                                                        "name": "Visits",
                                                        "value": parseFloat(data1.data[0].visits)
                                                    }, {
                                                        "name": "Playing",
                                                        "value": parseFloat(data1.data[0].playing)
                                                    }, {
                                                        "name": "Favorites",
                                                        "value": parseFloat(data1.data[0].favoritedCount)
                                                    }, {
                                                        "name": "Up Votes",
                                                        "value": parseFloat(data3.data[0].upVotes)
                                                    },
                                                    {
                                                        "name": "Down Votes",
                                                        "value": parseFloat(data3.data[0].downVotes)
                                                    }
                                                ]
                                            ],
                                            "image": "rect"
                                        });
                                        newUser.save();
                                    }
                                });
                            }).catch(function (error, response) {
                                User.findOne({ "id": req.params.cid }, (err, user) => {
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
                    }).catch(function (error, response) {
                        User.findOne({ "id": req.params.cid }, (err, user) => {
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
            }).catch(function (error, response) {
                User.findOne({ "id": req.params.cid }, (err, user) => {
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