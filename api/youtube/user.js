const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/youtube-users');
const apikey = require('../../apikey.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/user/search', (req, res) => {
    updateStats()
    search()
    function search() {
        axios.get("https://www.googleapis.com/youtube/v3/search?q=" + req.body.search + "&key=" + apikey() + "&type=channel&part=snippet")
            .then(response => {
                let results = [];
                for (let i = 0; i < response.data.items.length; i++) {
                    results.push({
                        id: response.data.items[i].id.channelId,
                        name: response.data.items[i].snippet.title,
                        icon: response.data.items[i].snippet.thumbnails.default.url,
                        image: 'round'
                    });
                }
                res.send({
                    success: true,
                    results: results
                });
            })
            .catch(err => {
                console.log(err.response.data);
                search()
            })
    }
})

app.get('/user/:cid', (req, res) => {
    updateStats()
    if (req.params.cid.length == 24 && req.params.cid.startsWith('UC')) {
        fetch();
        function fetch() {
            axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,brandingSettings&id=" + req.params.cid + "&key=" + apikey())
                .then(function (response) {
                    let data = response.data;
                    if (!data.error) {
                        data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                        let banner = data.items[0].snippet.thumbnails.default.url;
                        if (data.items[0].brandingSettings.image) {
                            banner = data.items[0].brandingSettings.image.bannerExternalUrl;
                        }
                        res.json({
                            "success": true,
                            "id": data.items[0].id,
                            "stats": [
                                {
                                    "name": "Subscribers",
                                    "value": parseFloat(data.items[0].statistics.subscriberCount)
                                }, {
                                    "name": "Views",
                                    "value": parseFloat(data.items[0].statistics.viewCount)
                                }, {
                                    "name": "Videos",
                                    "value": parseFloat(data.items[0].statistics.videoCount)
                                }
                            ],
                            "misc": [
                                {
                                    "name": "Name",
                                    "value": data.items[0].snippet.title
                                }, {
                                    "name": "Image",
                                    "value": data.items[0].snippet.thumbnails.high.url
                                }, {
                                    "name": "Banner",
                                    "value": banner
                                }, {
                                    "name": "Created",
                                    "value": data.items[0].snippet.publishedAt
                                }, {
                                    "name": "Description",
                                    "value": data.items[0].snippet.description
                                }
                            ],
                            "image": 'round'
                        })
                        User.findOne({ id: data.items[0].id }, (err, user) => {
                            if (user) {
                                user.stats = [
                                    {
                                        "name": "Subscribers",
                                        "value": parseFloat(data.items[0].statistics.subscriberCount)
                                    }, {
                                        "name": "Views",
                                        "value": parseFloat(data.items[0].statistics.viewCount)
                                    }, {
                                        "name": "Videos",
                                        "value": parseFloat(data.items[0].statistics.videoCount)
                                    }
                                ]
                                if (user.data[user.data.length - 1][0].value == data.date) {
                                    user.data[user.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Subscribers",
                                            "value": parseFloat(data.items[0].statistics.subscriberCount)
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[0].statistics.viewCount)
                                        }, {
                                            "name": "Videos",
                                            "value": parseFloat(data.items[0].statistics.videoCount)
                                        }
                                    ];
                                } else {
                                    user.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Subscribers",
                                            "value": parseFloat(data.items[0].statistics.subscriberCount)
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[0].statistics.viewCount)
                                        }, {
                                            "name": "Videos",
                                            "value": parseFloat(data.items[0].statistics.videoCount)
                                        }
                                    ]);
                                }
                                user.save().catch(err => { });
                            } else {
                                let newUser = new User({
                                    "id": data.items[0].id,
                                    "stats": [
                                        {
                                            "name": "Subscribers",
                                            "value": parseFloat(data.items[0].statistics.subscriberCount)
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[0].statistics.viewCount)
                                        }, {
                                            "name": "Videos",
                                            "value": parseFloat(data.items[0].statistics.videoCount)
                                        }
                                    ],
                                    "misc": [
                                        {
                                            "name": "Name",
                                            "value": data.items[0].snippet.title
                                        }, {
                                            "name": "Image",
                                            "value": data.items[0].snippet.thumbnails.high.url
                                        }, {
                                            "name": "Banner",
                                            "value": banner
                                        }, {
                                            "name": "Created",
                                            "value": data.items[0].snippet.publishedAt
                                        }, {
                                            "name": "Description",
                                            "value": data.items[0].snippet.description
                                        }
                                    ],
                                    "data": [
                                        [
                                            {
                                                "name": "Date",
                                                "value": data.date
                                            }, {
                                                "name": "Subscribers",
                                                "value": parseFloat(data.items[0].statistics.subscriberCount)
                                            }, {
                                                "name": "Views",
                                                "value": parseFloat(data.items[0].statistics.viewCount)
                                            }, {
                                                "name": "Videos",
                                                "value": parseFloat(data.items[0].statistics.videoCount)
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
                            if (error.message == 'Request failed with status code 404') {
                                res.json({
                                    "success": false,
                                    "error": "Channel not found"
                                })
                            } else {
                                fetch()
                            }
                        }
                    });
                });
        }
    } else {
        res.status(404).json({ 'error': true, 'message': 'Invaild channel ID.' })
    }
});

module.exports = app;