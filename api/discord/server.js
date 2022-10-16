const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const Server = require('../../models/discord-server');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/server/search', (req, res) => {
updateStats()
    axios.get("https://discord.com/api/v6/invites/" + req.body.search + "?with_counts=true")
        .then(response => {
            res.json({
                "success": true,
                "results": [
                    {
                        "name": response.data.guild.name,
                        "icon": "https://cdn.discordapp.com/icons/" + response.data.guild.id + "/" + response.data.guild.icon + ".png",
                        "id": req.body.search,
                        "image": "round"
                    }
                ]
            });
        }).catch(err => {
            res.json({
                "success": false,
                "results": []
            });
        })
})

app.get('/server/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://discord.com/api/v6/invites/" + req.params.cid + "?with_counts=true")
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    let banner = "https://cdn.discordapp.com/banners/" + data.guild.id + "/" + data.guild.banner + ".png";
                    if (banner == null) {
                        banner = "https://cdn.discordapp.com/icons/" + data.guild.id + "/" + data.guild.icon + ".png";
                    }
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                    res.json({
                        "success": true,
                        "id": req.params.cid,
                        "stats": [
                            {
                                "name": "Members",
                                "value": parseFloat(data.approximate_member_count)
                            }, {
                                "name": "Online",
                                "value": parseFloat(data.approximate_presence_count)
                            }
                        ],
                        "misc": [
                            {
                                "name": "Name",
                                "value": data.guild.name
                            }, {
                                "name": "Image",
                                "value": "https://cdn.discordapp.com/icons/" + data.guild.id + "/" + data.guild.icon + ".png"
                            }, {
                                "name": "Banner",
                                "value": banner
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
                    Server.findOne({ id: req.params.cid }, (err, server) => {
                        if (server) {
                            server.stats = [
                                {
                                    "name": "Members",
                                    "value": parseFloat(data.approximate_member_count)
                                }, {
                                    "name": "Online",
                                    "value": parseFloat(data.approximate_presence_count)
                                }
                            ]
                            if (server.data[server.data.length - 1][0].value == data.date) {
                                server.data[server.data.length - 1] = [
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Members",
                                        "value": parseFloat(data.approximate_member_count)
                                    }, {
                                        "name": "Online",
                                        "value": parseFloat(data.approximate_presence_count)
                                    }
                                ];
                            } else {
                                server.data.push([
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Members",
                                        "value": parseFloat(data.approximate_member_count)
                                    }, {
                                        "name": "Online",
                                        "value": parseFloat(data.approximate_presence_count)
                                    }
                                ]);
                            }
                            server.save();
                        } else {
                            let newServer = new Server({
                                "id": req.params.cid,
                                "stats": [
                                    {
                                        "name": "Members",
                                        "value": parseFloat(data.approximate_member_count)
                                    }, {
                                        "name": "Online",
                                        "value": parseFloat(data.approximate_presence_count)
                                    }
                                ],
                                "misc": [
                                    {
                                        "name": "Name",
                                        "value": data.guild.name
                                    }, {
                                        "name": "Image",
                                        "value": "https://cdn.discordapp.com/icons/" + data.guild.id + "/" + data.guild.icon + ".png"
                                    }, {
                                        "name": "Banner",
                                        "value": banner
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
                                            "name": "Members",
                                            "value": parseFloat(data.approximate_member_count)
                                        }, {
                                            "name": "Online",
                                            "value": parseFloat(data.approximate_presence_count)
                                        }
                                    ]
                                ],
                                "image": "round"
                            });
                            newServer.save();
                        }
                    })
                }
            }).catch(function (error, response) {
                Server.findOne({ "id": req.params.cid }, (err, server) => {
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