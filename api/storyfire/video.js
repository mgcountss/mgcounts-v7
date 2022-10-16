const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/storyfire-videos');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/video/search', (req, res) => {
    updateStats()
    const body = { "hitsPerPage": 3, "offset": 0, "page": 0, "query": req.body.search }
    axios.post('https://storyfire.com/app/search/all', JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
            'origin': 'https://storyfire.com',
            'referer': 'https://storyfire.com/search',
            'user-agent': '',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Microsoft Edge";v="98"',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'connect-account': ''
        }
    }).then(response => {
        let results = [];
        response.data.videoStories.hits.forEach(video => {
            results.push({
                id: video.objectID,
                name: video.title,
                icon: video.storyImage,
                image: 'rect'
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

app.get('/video/:cid', (req, res) => {
    updateStats()
    if (req.params.cid.length == 24) {
        fetch();
        function fetch() {
            axios.get("https://storyfire.com/app/videoDetail/" + req.params.cid + "")
                .then(function (response) {
                    let data = response.data.video;
                    if (!data.error) {
                        data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                        res.json({
                            "success": true,
                            "id": req.params.cid,
                            "stats": [
                                {
                                    "name": "Views",
                                    "value": parseFloat(data.views)
                                }, {
                                    "name": "Likes",
                                    "value": parseFloat(data.likesCount)
                                }, {
                                    "name": "Comments",
                                    "value": parseFloat(data.commentsCount)
                                }
                            ],
                            "misc": [
                                {
                                    "name": "Name",
                                    "value": data.title
                                }, {
                                    "name": "Image",
                                    "value": data.storyImage
                                }, {
                                    "name": "Banner",
                                    "value": data.storyImage
                                }, {
                                    "name": "Created",
                                    "value": data.publishDate
                                }, {
                                    "name": "Bio",
                                    "value": data.description
                                }
                            ],
                            "image": 'rect'
                        })
                        User.findOne({ id: req.params.cid }, (err, user) => {
                            if (user) {
                                user.stats = [
                                    {
                                        "name": "Views",
                                        "value": parseFloat(data.views)
                                    }, {
                                        "name": "Likes",
                                        "value": parseFloat(data.likesCount)
                                    }, {
                                        "name": "Comments",
                                        "value": parseFloat(data.commentsCount)
                                    }
                                ]
                                if (user.data[user.data.length - 1][0].value == data.date) {
                                    user.data[user.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.views)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.likesCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.commentsCount)
                                        }
                                    ];
                                } else {
                                    user.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.views)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.likesCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.commentsCount)
                                        }
                                    ]);
                                }
                                user.save();
                            } else {
                                let newUser = new User({
                                    "id": req.params.cid,
                                    "stats": [
                                        {
                                            "name": "Views",
                                            "value": parseFloat(data.views)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.likesCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.commentsCount)
                                        }
                                    ],
                                    "misc": [
                                        {
                                            "name": "Name",
                                            "value": data.title
                                        }, {
                                            "name": "Image",
                                            "value": data.storyImage
                                        }, {
                                            "name": "Banner",
                                            "value": data.storyImage
                                        }, {
                                            "name": "Created",
                                            "value": data.publishDate
                                        }, {
                                            "name": "Bio",
                                            "value": data.description
                                        }
                                    ],
                                    "data": [
                                        [
                                            {
                                                "name": "Date",
                                                "value": data.date
                                            }, {
                                                "name": "Views",
                                                "value": parseFloat(data.views)
                                            }, {
                                                "name": "Likes",
                                                "value": parseFloat(data.likesCount)
                                            }, {
                                                "name": "Comments",
                                                "value": parseFloat(data.commentsCount)
                                            }
                                        ]
                                    ],
                                    "image": "rect"
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