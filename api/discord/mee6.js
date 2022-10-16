const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const Server = require('../../models/discord-mee6');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/mee6/search', (req, res) => {
updateStats()
    axios.get("https://mee6.xyz/api/plugins/levels/leaderboard/" + req.body.search + "")
        .then(response => {
            let results = [];
            for (m = 0; m < response.data.players.length; m++) {
                results.push({
                    name: response.data.players[m].username,
                    icon: 'https://cdn.discordapp.com/avatars/' + response.data.players[m].id + '/' + response.data.players[m].avatar + '.png',
                    id: req.body.search+":::_:::"+response.data.players[m].id,
                    image: "round"
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
})

app.get('/mee6/:cid', (req, res) => {
updateStats()
    let sid = req.params.cid.split(':::_:::')[0];
    let cid = req.params.cid.split(':::_:::')[1];
    fetch();
    function fetch() {
        axios.get("https://mee6.xyz/api/plugins/levels/leaderboard/" + sid + "")
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    var m = 0;
                    let done = false;
                    for (m = 0; m < data.players.length; m++) {
                        if (cid == data.players[m].username || cid == data.players[m].id) {
                            let saveID = sid + ":::_:::" + data.players[m].id;
                            data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                            res.json({
                                "success": true,
                                "id": saveID,
                                "stats": [
                                    {
                                        "name": "XP",
                                        "value": parseFloat(data.players[m].xp)
                                    }, {
                                        "name": "Messages",
                                        "value": parseFloat(data.players[m].message_count)
                                    }, {
                                        "name": "Level",
                                        "value": parseFloat(data.players[m].level)
                                    }
                                ],
                                "misc": [
                                    {
                                        "name": "Name",
                                        "value": data.players[m].username
                                    }, {
                                        "name": "Image",
                                        "value": 'https://cdn.discordapp.com/avatars/' + data.players[m].id + '/' + data.players[m].avatar + '.png'
                                    }, {
                                        "name": "Banner",
                                        "value": 'https://cdn.discordapp.com/avatars/' + data.players[m].id + '/' + data.players[m].avatar + '.png'
                                    }, {
                                        "name": "Created",
                                        "value": null
                                    }, {
                                        "name": "About",
                                        "value": null
                                    }
                                ],
                                "image": 'round'
                            })
                            Server.findOne({ id: saveID }, (err, server) => {
                                if (server) {
                                    server.stats = [
                                        {
                                            "name": "XP",
                                            "value": parseFloat(data.players[m].xp)
                                        }, {
                                            "name": "Messages",
                                            "value": parseFloat(data.players[m].message_count)
                                        }, {
                                            "name": "Level",
                                            "value": parseFloat(data.players[m].level)
                                        }
                                    ]
                                    if (server.data[server.data.length - 1][0].value == data.date) {
                                        server.data[server.data.length - 1] = [
                                            {
                                                "name": "Date",
                                                "value": data.date
                                            }, {
                                                "name": "XP",
                                                "value": parseFloat(data.players[m].xp)
                                            }, {
                                                "name": "Messages",
                                                "value": parseFloat(data.players[m].message_count)
                                            }, {
                                                "name": "Level",
                                                "value": parseFloat(data.players[m].level)
                                            }
                                        ];
                                    } else {
                                        server.data.push([
                                            {
                                                "name": "Date",
                                                "value": data.date
                                            }, {
                                                "name": "XP",
                                                "value": parseFloat(data.players[m].xp)
                                            }, {
                                                "name": "Messages",
                                                "value": parseFloat(data.players[m].message_count)
                                            }, {
                                                "name": "Level",
                                                "value": parseFloat(data.players[m].level)
                                            }
                                        ]);
                                    }
                                    server.save();
                                } else {
                                    let newServer = new Server({
                                        "id": saveID,
                                        "stats": [
                                            {
                                                "name": "XP",
                                                "value": parseFloat(data.players[m].xp)
                                            }, {
                                                "name": "Messages",
                                                "value": parseFloat(data.players[m].message_count)
                                            }, {
                                                "name": "Level",
                                                "value": parseFloat(data.players[m].level)
                                            }
                                        ],
                                        "misc": [
                                            {
                                                "name": "Name",
                                                "value": data.players[m].username
                                            }, {
                                                "name": "Image",
                                                "value": 'https://cdn.discordapp.com/avatars/' + data.players[m].id + '/' + data.players[m].avatar + '.png'
                                            }, {
                                                "name": "Banner",
                                                "value": 'https://cdn.discordapp.com/avatars/' + data.players[m].id + '/' + data.players[m].avatar + '.png'
                                            }, {
                                                "name": "Created",
                                                "value": null
                                            }, {
                                                "name": "About",
                                                "value": null
                                            }
                                        ],
                                        "data": [
                                            [
                                                {
                                                    "name": "Date",
                                                    "value": data.date
                                                }, {
                                                    "name": "XP",
                                                    "value": parseFloat(data.players[m].xp)
                                                }, {
                                                    "name": "Messages",
                                                    "value": parseFloat(data.players[m].message_count)
                                                }, {
                                                    "name": "Level",
                                                    "value": parseFloat(data.players[m].level)
                                                }
                                            ]
                                        ],
                                        "image": "round"
                                    });
                                    newServer.save();
                                }
                            })
                            done = true;
                            break;
                        }
                    }
                    if (done == false) {
                        res.json({
                            "success": false,
                            "error": "User not found"
                        })
                    }
                }
            }).catch(function (error, response) {
                Server.findOne({ "id": sid + ":::_:::" + cid }, (err, server) => {
                    if (server) {
                        res.json({
                            "success": true,
                            "id": server.id,
                            "stats": server.stats,
                            "misc": server.misc
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