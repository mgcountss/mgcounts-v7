const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/gab-posts');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/post/search', (req, res) => {
updateStats()
    axios.get("https://gab.com/api/v1/statuses/" + req.body.search + "")
        .then(response => {
            res.json({
                "success": true,
                "results": [
                    {
                        "name": response.data.content,
                        "icon": response.data.account.avatar_static,
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

app.get('/post/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://gab.com/api/v1/statuses/" + req.params.cid + "")
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    let banner = data.account.header_static;
                    if (banner == "https://gab.com/headers/original/missing.png") {
                        banner = data.account.avatar_static;
                    }
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                    res.json({
                        "success": true,
                        "id": req.params.cid,
                        "stats": [
                            {
                                "name": "Favourites",
                                "value": parseFloat(data.favourites_count)
                            }, {
                                "name": "Replies",
                                "value": parseFloat(data.replies_count)
                            }, {
                                "name": "Reblogs",
                                "value": parseFloat(data.reblogs_count)
                            }
                        ],
                        "misc": [
                            {
                                "name": "Name",
                                "value": data.content
                            }, {
                                "name": "Image",
                                "value": data.account.avatar_static
                            }, {
                                "name": "Banner",
                                "value": banner
                            }, {
                                "name": "Created",
                                "value": data.created_at
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
                                    "name": "Favourites",
                                    "value": parseFloat(data.favourites_count)
                                }, {
                                    "name": "Replies",
                                    "value": parseFloat(data.replies_count)
                                }, {
                                    "name": "Reblogs",
                                    "value": parseFloat(data.reblogs_count)
                                }
                            ]
                            if (user.data[user.data.length - 1][0].value == data.date) {
                                user.data[user.data.length - 1] = [
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Favourites",
                                        "value": parseFloat(data.favourites_count)
                                    }, {
                                        "name": "Replies",
                                        "value": parseFloat(data.replies_count)
                                    }, {
                                        "name": "Reblogs",
                                        "value": parseFloat(data.reblogs_count)
                                    }
                                ];
                            } else {
                                user.data.push([
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Favourites",
                                        "value": parseFloat(data.favourites_count)
                                    }, {
                                        "name": "Replies",
                                        "value": parseFloat(data.replies_count)
                                    }, {
                                        "name": "Reblogs",
                                        "value": parseFloat(data.reblogs_count)
                                    }
                                ]);
                            }
                            user.save();
                        } else {
                            let newUser = new User({
                                "id": req.params.cid,
                                "stats": [
                                    {
                                        "name": "Favourites",
                                        "value": parseFloat(data.favourites_count)
                                    }, {
                                        "name": "Replies",
                                        "value": parseFloat(data.replies_count)
                                    }, {
                                        "name": "Reblogs",
                                        "value": parseFloat(data.reblogs_count)
                                    }
                                ],
                                "misc": [
                                    {
                                        "name": "Name",
                                        "value": data.content
                                    }, {
                                        "name": "Image",
                                        "value": data.account.avatar_static
                                    }, {
                                        "name": "Banner",
                                        "value": banner
                                    }, {
                                        "name": "Created",
                                        "value": data.created_at
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
                                            "name": "Favourites",
                                            "value": parseFloat(data.favourites_count)
                                        }, {
                                            "name": "Replies",
                                            "value": parseFloat(data.replies_count)
                                        }, {
                                            "name": "Reblogs",
                                            "value": parseFloat(data.reblogs_count)
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
                            "misc": user.misc
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