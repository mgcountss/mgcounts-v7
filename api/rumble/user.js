const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/rumble-users');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/user/search', (req, res) => {
    updateStats()
    axios.get("https://rumble.com/service.php?name=video_collection.search&query=" + req.body.search + "")
        .then(function (response) {
            let results = [];
            response.data.data.items.forEach(user => {
                results.push({
                    id: user.id,
                    name: user.title,
                    icon: user.thumb,
                    image: 'round'
                });
            });
            res.send({
                success: true,
                results: results
            });
        }).catch(err => {
            console.log(err);
            res.json({
                "success": false,
                "results": []
            });
        })
});

app.get('/user/:cid', (req, res) => {
    updateStats()
    fetch();
    function fetch() {
        axios.get("https://rumble.com/service.php?name=video_collection.meta&limit=10&id=" + req.params.cid + "")
            .then(function (response) {
                let data = response.data.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                    res.json({
                        "success": true,
                        "id": req.params.cid,
                        "stats": [
                            {
                                "name": "Followers",
                                "value": parseFloat(data.followers)
                            }, {
                                "name": "Following",
                                "value": parseFloat(data.following)
                            }, {
                                "name": "Rumbles",
                                "value": parseFloat(data.rumbles)
                            }, {
                                "name": "Videos",
                                "value": parseFloat(data.videos)
                            }
                        ],
                        "misc": [
                            {
                                "name": "Name",
                                "value": data.name
                            }, {
                                "name": "Image",
                                "value": data.thumb
                            }, {
                                "name": "Banner",
                                "value": data.backsplash
                            }, {
                                "name": "Created",
                                "value": null
                            }, {
                                "name": "Bio",
                                "value": null
                            }
                        ],
                        "image": 'round'
                    })
                    User.findOne({ id: req.params.cid }, (err, user) => {
                        if (user) {
                            user.stats = [
                                {
                                    "name": "Followers",
                                    "value": parseFloat(data.followers)
                                }, {
                                    "name": "Following",
                                    "value": parseFloat(data.following)
                                }, {
                                    "name": "Rumbles",
                                    "value": parseFloat(data.rumbles)
                                }, {
                                    "name": "Videos",
                                    "value": parseFloat(data.videos)
                                }
                            ]
                            if (user.data[user.data.length - 1][0].value == data.date) {
                                user.data[user.data.length - 1] = [
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Followers",
                                        "value": parseFloat(data.followers)
                                    }, {
                                        "name": "Following",
                                        "value": parseFloat(data.following)
                                    }, {
                                        "name": "Rumbles",
                                        "value": parseFloat(data.rumbles)
                                    }, {
                                        "name": "Videos",
                                        "value": parseFloat(data.videos)
                                    }
                                ];
                            } else {
                                user.data.push([
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Followers",
                                        "value": parseFloat(data.followers)
                                    }, {
                                        "name": "Following",
                                        "value": parseFloat(data.following)
                                    }, {
                                        "name": "Rumbles",
                                        "value": parseFloat(data.rumbles)
                                    }, {
                                        "name": "Videos",
                                        "value": parseFloat(data.videos)
                                    }
                                ]);
                            }
                            user.save();
                        } else {
                            let newUser = new User({
                                "id": req.params.cid,
                                "stats": [
                                    {
                                        "name": "Followers",
                                        "value": parseFloat(data.followers)
                                    }, {
                                        "name": "Following",
                                        "value": parseFloat(data.following)
                                    }, {
                                        "name": "Rumbles",
                                        "value": parseFloat(data.rumbles)
                                    }, {
                                        "name": "Videos",
                                        "value": parseFloat(data.videos)
                                    }
                                ],
                                "misc": [
                                    {
                                        "name": "Name",
                                        "value": data.name
                                    }, {
                                        "name": "Image",
                                        "value": data.thumb
                                    }, {
                                        "name": "Banner",
                                        "value": data.backsplash
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
                                            "value": data.date
                                        }, {
                                            "name": "Followers",
                                            "value": parseFloat(data.followers)
                                        }, {
                                            "name": "Following",
                                            "value": parseFloat(data.following)
                                        }, {
                                            "name": "Rumbles",
                                            "value": parseFloat(data.followingCount)
                                        }, {
                                            "name": "Videos",
                                            "value": parseFloat(data.videos)
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