const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/reddit-user');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/user/search', (req, res) => {
updateStats()
    axios.get("https://api.reddit.com/user/" + req.body.search + "/about.json")
        .then(response => {
            res.json({
                "success": true,
                "results": [
                    {
                        "name": response.data.data.name,
                        "icon": response.data.data.icon_img.split("?")[0],
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

app.get('/user/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://api.reddit.com/user/" + req.params.cid + "/about.json")
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                    res.json({
                        "success": true,
                        "id": req.params.cid,
                        "stats": [
                            {
                                "name": "Total Karma",
                                "value": parseFloat(data.data.total_karma)
                            }, {
                                "name": "Comment Karma",
                                "value": parseFloat(data.data.comment_karma)
                            }, {
                                "name": "Link Karma",
                                "value": parseFloat(data.data.link_karma)
                            }
                        ],
                        "misc": [
                            {
                                "name": "Name",
                                "value": data.data.name
                            }, {
                                "name": "Image",
                                "value": data.data.icon_img.split("?")[0]
                            }, {
                                "name": "Banner",
                                "value": data.data.icon_img.split("?")[0]
                            }, {
                                "name": "Created",
                                "value": data.data.created
                            }, {
                                "name": "About",
                                "value": null
                            }
                        ],
                        "image": 'round'
                    })
                    User.findOne({ id: req.params.cid }, (err, user) => {
                        if (user) {
                            user.stats = [
                                {
                                    "name": "Total Karma",
                                    "value": parseFloat(data.data.total_karma)
                                }, {
                                    "name": "Comment Karma",
                                    "value": parseFloat(data.data.comment_karma)
                                }, {
                                    "name": "Link Karma",
                                    "value": parseFloat(data.data.link_karma)
                                }
                            ]
                            if (user.data[user.data.length - 1][0].value == data.date) {
                                user.data[user.data.length - 1] = [
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Total Karma",
                                        "value": parseFloat(data.data.total_karma)
                                    }, {
                                        "name": "Comment Karma",
                                        "value": parseFloat(data.data.comment_karma)
                                    }, {
                                        "name": "Link Karma",
                                        "value": parseFloat(data.data.link_karma)
                                    }
                                ];
                            } else {
                                user.data.push([
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Total Karma",
                                        "value": parseFloat(data.data.total_karma)
                                    }, {
                                        "name": "Comment Karma",
                                        "value": parseFloat(data.data.comment_karma)
                                    }, {
                                        "name": "Link Karma",
                                        "value": parseFloat(data.data.link_karma)
                                    }
                                ]);
                            }
                            user.save();
                        } else {
                            let newUser = new User({
                                "id": req.params.cid,
                                "stats": [
                                    {
                                        "name": "Total Karma",
                                        "value": parseFloat(data.data.total_karma)
                                    }, {
                                        "name": "Comment Karma",
                                        "value": parseFloat(data.data.comment_karma)
                                    }, {
                                        "name": "Link Karma",
                                        "value": parseFloat(data.data.link_karma)
                                    }
                                ],
                                "misc": [
                                    {
                                        "name": "Name",
                                        "value": data.data.name
                                    }, {
                                        "name": "Image",
                                        "value": data.data.icon_img.split("?")[0]
                                    }, {
                                        "name": "Banner",
                                        "value": data.data.icon_img.split("?")[0]
                                    }, {
                                        "name": "Created",
                                        "value": data.data.created
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
                                            "name": "Total Karma",
                                            "value": parseFloat(data.data.total_karma)
                                        }, {
                                            "name": "Comment Karma",
                                            "value": parseFloat(data.data.comment_karma)
                                        }, {
                                            "name": "Link Karma",
                                            "value": parseFloat(data.data.link_karma)
                                        }
                                    ]
                                ],
                                "image": "round"
                            });
                            newUser.save();
                        }
                    })
                }
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