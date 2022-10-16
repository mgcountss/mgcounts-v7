const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/roblox-users');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/user/search', (req, res) => {
updateStats()
    axios.get("https://www.roblox.com/search/users/results?keyword=" + req.body.search + "&maxRows=10&startIndex=0")
        .then(response => {
            let ids = [];
            for (let i = 0; i < response.data.UserSearchResults.length; i++) {
                ids.push(response.data.UserSearchResults[i].UserId);
            }
            axios.get("https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=" + ids.join(",") + "&size=420x420&format=Png&isCircular=false")
                .then(response2 => {
                    let results = [];
                    for (let i = 0; i < response.data.UserSearchResults.length; i++) {
                        results.push({
                            "name": response.data.UserSearchResults[i].Name,
                            "icon": response2.data.data[i].imageUrl,
                            "id": response.data.UserSearchResults[i].UserId,
                            "image": "round"
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

app.get('/user/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://api.roblox.com/users/" + req.params.cid + "")
            .then(function (response1) {
                axios.get("https://friends.roblox.com/v1/users/" + req.params.cid + "/followers/count")
                    .then(function (response2) {
                        axios.get("https://friends.roblox.com/v1/users/" + req.params.cid + "/friends/count")
                            .then(function (response3) {
                                axios.get("https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=" + req.params.cid + "&size=720x720&format=Png&isCircular=false")
                                    .then(function (response4) {
                                        axios.get("https://friends.roblox.com/v1/users/" + req.params.cid + "/followings/count")
                                            .then(function (response5) {
                                                let data1 = response1.data;
                                                let data2 = response2.data;
                                                let data3 = response3.data;
                                                let data4 = response4.data;
                                                let data5 = response5.data;
                                                data1.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                                res.json({
                                                    "success": true,
                                                    "id": req.params.cid,
                                                    "stats": [
                                                        {
                                                            "name": "Followers",
                                                            "value": parseFloat(data2.count)
                                                        }, {
                                                            "name": "Following",
                                                            "value": parseFloat(data5.count)
                                                        }, {
                                                            "name": "Friends",
                                                            "value": parseFloat(data3.count)
                                                        }
                                                    ],
                                                    "misc": [
                                                        {
                                                            "name": "Name",
                                                            "value": data1.Username
                                                        }, {
                                                            "name": "Image",
                                                            "value": data4.data[0].imageUrl
                                                        }, {
                                                            "name": "Banner",
                                                            "value": data4.data[0].imageUrl
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
                                                                "value": parseFloat(data2.count)
                                                            }, {
                                                                "name": "Following",
                                                                "value": parseFloat(data5.count)
                                                            }, {
                                                                "name": "Friends",
                                                                "value": parseFloat(data3.count)
                                                            }
                                                        ]
                                                        if (user.data[user.data.length - 1][0].value == data1.date) {
                                                            user.data[user.data.length - 1] = [
                                                                {
                                                                    "name": "Date",
                                                                    "value": data1.date
                                                                }, {
                                                                    "name": "Followers",
                                                                    "value": parseFloat(data2.count)
                                                                }, {
                                                                    "name": "Following",
                                                                    "value": parseFloat(data5.count)
                                                                }, {
                                                                    "name": "Friends",
                                                                    "value": parseFloat(data3.count)
                                                                }
                                                            ];
                                                        } else {
                                                            user.data.push([
                                                                {
                                                                    "name": "Date",
                                                                    "value": data1.date
                                                                }, {
                                                                    "name": "Followers",
                                                                    "value": parseFloat(data2.count)
                                                                }, {
                                                                    "name": "Following",
                                                                    "value": parseFloat(data5.count)
                                                                }, {
                                                                    "name": "Friends",
                                                                    "value": parseFloat(data3.count)
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
                                                                    "value": parseFloat(data2.count)
                                                                }, {
                                                                    "name": "Following",
                                                                    "value": parseFloat(data5.count)
                                                                }, {
                                                                    "name": "Friends",
                                                                    "value": parseFloat(data3.count)
                                                                }
                                                            ],
                                                            "misc": [
                                                                {
                                                                    "name": "Name",
                                                                    "value": data1.Username
                                                                }, {
                                                                    "name": "Image",
                                                                    "value": data4.data[0].imageUrl
                                                                }, {
                                                                    "name": "Banner",
                                                                    "value": data4.data[0].imageUrl
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
                                                                        "name": "Followers",
                                                                        "value": parseFloat(data2.count)
                                                                    }, {
                                                                        "name": "Following",
                                                                        "value": parseFloat(data5.count)
                                                                    }, {
                                                                        "name": "Friends",
                                                                        "value": parseFloat(data3.count)
                                                                    }
                                                                ]
                                                            ],
                                                            "image": "round"
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