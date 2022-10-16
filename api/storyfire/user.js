const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/storyfire-users');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/user/search', (req, res) => {
    updateStats()
    const body = { "hitsPerPage": 3, "offset": 0, "page": 0, "query": req.body.search }
    axios.post('https://storyfire.com/app/search/all', JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
            'origin': 'https://storyfire.com',
            'referer': 'https://storyfire.com/search',
            'user-agent': '',
            'cookie': '',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Microsoft Edge";v="98"',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'connect-account': ''
        }
    }).then(response => {
        let results = [];
        response.data.users.hits.forEach(user => {
            results.push({
                id: user.objectID,
                name: user.username,
                icon: user.userimage,
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
    if (req.params.cid.length == 28) {
        fetch();
        function fetch() {
            axios.get("https://storyfire.com/app/users/getProfile/" + req.params.cid + "")
                .then(function (response) {
                    let data = response.data;
                    if (!data.error) {
                        data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                        res.json({
                            "success": true,
                            "id": req.params.cid,
                            "stats": [
                                {
                                    "name": "Followers",
                                    "value": parseFloat(data.followersCount)
                                }, {
                                    "name": "Blaze",
                                    "value": parseFloat(data.points)
                                }, {
                                    "name": "Following",
                                    "value": parseFloat(data.followingCount)
                                }
                            ],
                            "misc": [
                                {
                                    "name": "Name",
                                    "value": data.username
                                }, {
                                    "name": "Image",
                                    "value": data.userimage
                                }, {
                                    "name": "Banner",
                                    "value": data.userimage
                                }, {
                                    "name": "Created",
                                    "value": null
                                }, {
                                    "name": "Bio",
                                    "value": data.bio
                                }
                            ],
                            "image": 'round'
                        })
                        User.findOne({ id: req.params.cid }, (err, user) => {
                            if (user) {
                                user.stats = [
                                    {
                                        "name": "Followers",
                                        "value": parseFloat(data.followersCount)
                                    }, {
                                        "name": "Blaze",
                                        "value": parseFloat(data.points)
                                    }, {
                                        "name": "Following",
                                        "value": parseFloat(data.followingCount)
                                    }
                                ]
                                if (user.data[user.data.length - 1][0].value == data.date) {
                                    user.data[user.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Followers",
                                            "value": parseFloat(data.followersCount)
                                        }, {
                                            "name": "Blaze",
                                            "value": parseFloat(data.points)
                                        }, {
                                            "name": "Following",
                                            "value": parseFloat(data.followingCount)
                                        }
                                    ];
                                } else {
                                    user.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Followers",
                                            "value": parseFloat(data.followersCount)
                                        }, {
                                            "name": "Blaze",
                                            "value": parseFloat(data.points)
                                        }, {
                                            "name": "Following",
                                            "value": parseFloat(data.followingCount)
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
                                            "value": parseFloat(data.followersCount)
                                        }, {
                                            "name": "Blaze",
                                            "value": parseFloat(data.points)
                                        }, {
                                            "name": "Following",
                                            "value": parseFloat(data.followingCount)
                                        }
                                    ],
                                    "misc": [
                                        {
                                            "name": "Name",
                                            "value": data.username
                                        }, {
                                            "name": "Image",
                                            "value": data.userimage
                                        }, {
                                            "name": "Banner",
                                            "value": data.userimage
                                        }, {
                                            "name": "Created",
                                            "value": null
                                        }, {
                                            "name": "Bio",
                                            "value": data.bio
                                        }
                                    ],
                                    "data": [
                                        [
                                            {
                                                "name": "Date",
                                                "value": data.date
                                            }, {
                                                "name": "Followers",
                                                "value": parseFloat(data.followersCount)
                                            }, {
                                                "name": "Blaze",
                                                "value": parseFloat(data.points)
                                            }, {
                                                "name": "Following",
                                                "value": parseFloat(data.followingCount)
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
    } else {
        res.status(404).json({ 'error': true, 'message': 'Invaild user ID.' })
    }
});

module.exports = app;