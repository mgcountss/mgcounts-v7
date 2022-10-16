const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');

const Video = require('../../models/youtube-videos');
const apikey = require('../../apikey.js');

app.post('/video/search', (req, res) => {
    updateStats()
    search()
    function search() {
        axios.get("https://www.googleapis.com/youtube/v3/search?q=" + req.body.search + "&key=" + apikey() + "&type=video&part=snippet")
            .then(response => {
                let results = [];
                for (let i = 0; i < response.data.items.length; i++) {
                    results.push({
                        id: response.data.items[i].id.videoId,
                        name: response.data.items[i].snippet.title,
                        icon: response.data.items[i].snippet.thumbnails.default.url,
                        image: 'rect'
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

app.get('/video/:cid', (req, res) => {
    updateStats()
    if (req.params.cid.length == 11) {
        fetch();
        function fetch() {
            axios.get("https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,liveStreamingDetails&id=" + req.params.cid + "&key=" + apikey())
                .then(function (response) {
                    let data = response.data;
                    if (!data.error) {
                        data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
                        res.json({
                            "success": true,
                            "id": data.items[0].id,
                            "stats": [
                                {
                                    "name": "Views",
                                    "value": parseFloat(data.items[0].statistics.viewCount)
                                }, {
                                    "name": "Likes",
                                    "value": parseFloat(data.items[0].statistics.likeCount)
                                }, {
                                    "name": "Comments",
                                    "value": parseFloat(data.items[0].statistics.commentCount)
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
                                    "value": data.items[0].snippet.thumbnails.high.url
                                }, {
                                    "name": "Created",
                                    "value": data.items[0].snippet.publishedAt
                                }, {
                                    "name": "Description",
                                    "value": data.items[0].snippet.description
                                }
                            ],
                            "image": 'rect'
                        })
                        Video.findOne({ id: data.items[0].id }, (err, video) => {
                            if (video) {
                                video.stats = [
                                    {
                                        "name": "Views",
                                        "value": parseFloat(data.items[0].statistics.viewCount)
                                    }, {
                                        "name": "Likes",
                                        "value": parseFloat(data.items[0].statistics.likeCount)
                                    }, {
                                        "name": "Comments",
                                        "value": parseFloat(data.items[0].statistics.commentCount)
                                    }
                                ]
                                if (video.data[video.data.length - 1][0].value == data.date) {
                                    video.data[video.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[0].statistics.viewCount)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[0].statistics.likeCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.items[0].statistics.commentCount)
                                        }
                                    ];
                                } else {
                                    video.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[0].statistics.viewCount)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[0].statistics.likeCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.items[0].statistics.commentCount)
                                        }
                                    ]);
                                }
                                video.save();
                            } else {
                                let newVideo = new Video({
                                    "id": data.items[0].id,
                                    "stats": [
                                        {
                                            "name": "Views",
                                            "value": parseFloat(data.items[0].statistics.viewCount)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[0].statistics.likeCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.items[0].statistics.commentCount)
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
                                            "value": data.items[0].snippet.thumbnails.high.url
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
                                                "name": "Views",
                                                "value": parseFloat(data.items[0].statistics.viewCount)
                                            }, {
                                                "name": "Likes",
                                                "value": parseFloat(data.items[0].statistics.likeCount)
                                            }, {
                                                "name": "Comments",
                                                "value": parseFloat(data.items[0].statistics.commentCount)
                                            }
                                        ]
                                    ],
                                    "image": "rect"
                                });
                                newVideo.save();
                            }
                        })
                    }
                }).catch(function (error, response) {
                    Video.findOne({ "id": req.params.cid }, (err, video) => {
                        if (video) {
                            res.json({
                                "success": true,
                                "id": video.id,
                                "stats": video.stats,
                                "misc": video.misc,
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
                })
        }
    } else {
        res.status(404).json({ 'error': true, 'message': 'Invaild video ID.' })
    }
});

module.exports = app;