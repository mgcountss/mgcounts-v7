const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');

const Comment = require('../../models/youtube-comments');
const apikey = require('../../apikey.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/comment/search', (req, res) => {
    updateStats()
    search()
    function search() {
        axios.get("https://www.googleapis.com/youtube/v3/comments?part=snippet&id=" + req.body.search + "&key=" + apikey())
            .then(response => {
                res.send({
                    "success": true,
                    results: [{
                        id: response.data.items[0].id,
                        name: response.data.items[0].snippet.textDisplay,
                        icon: response.data.items[0].snippet.authorProfileImageUrl,
                        image: "round"
                    }]
                });
            }).catch(err => {
                search()
            })
    }
})

app.get('/comment/:cid', (req, res) => {
    updateStats()
    if (req.params.cid.length == 26 && req.params.cid.startsWith('Ug')) {
        fetch();
        function fetch() {
            axios.get("https://www.googleapis.com/youtube/v3/comments?part=snippet&id=" + req.params.cid + "&key=" + apikey())
                .then(function (response) {
                    let data = response.data;
                    if (!data.error) {
                        data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
                        res.json({
                            "success": true,
                            "id": data.items[0].id,
                            "stats": [
                                {
                                    "name": "Likes",
                                    "value": parseFloat(data.items[0].snippet.likeCount)
                                }
                            ],
                            "misc": [
                                {
                                    "name": "Name",
                                    "value": data.items[0].snippet.textDisplay
                                },
                                {
                                    "name": "Image",
                                    "value": data.items[0].snippet.authorProfileImageUrl
                                },
                                {
                                    "name": "Banner",
                                    "value": data.items[0].snippet.authorProfileImageUrl
                                },
                                {
                                    "name": "Created",
                                    "value": data.items[0].snippet.publishedAt
                                },
                                {
                                    "name": "Author",
                                    "value": data.items[0].snippet.authorDisplayName
                                }
                            ],
                            "image": 'round'
                        })
                        Comment.findOne({ id: data.items[0].id }, (err, comment) => {
                            if (comment) {
                                comment.stats = [
                                    {
                                        "name": "Likes",
                                        "value": parseFloat(data.items[0].snippet.likeCount)
                                    }
                                ]
                                if (comment.data[comment.data.length - 1][0].value == data.date) {
                                    comment.data[comment.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[0].snippet.likeCount)
                                        }
                                    ];
                                } else {
                                    comment.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[0].snippet.likeCount)
                                        }
                                    ]);
                                }
                                comment.save();
                            } else {
                                let newComment = new Comment({
                                    "id": data.items[0].id,
                                    "stats": [
                                        {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[0].snippet.likeCount)
                                        }
                                    ],
                                    "misc": [
                                        {
                                            "name": "Name",
                                            "value": data.items[0].snippet.textDisplay
                                        },
                                        {
                                            "name": "Image",
                                            "value": data.items[0].snippet.authorProfileImageUrl
                                        },
                                        {
                                            "name": "Banner",
                                            "value": data.items[0].snippet.authorProfileImageUrl
                                        },
                                        {
                                            "name": "Created",
                                            "value": data.items[0].snippet.publishedAt
                                        },
                                        {
                                            "name": "Author",
                                            "value": data.items[0].snippet.authorDisplayName
                                        }
                                    ],
                                    "data": [
                                        [
                                            {
                                                "name": "Date",
                                                "value": data.date
                                            }, {
                                                "name": "Likes",
                                                "value": parseFloat(data.items[0].snippet.likeCount)
                                            }
                                        ]
                                    ],
                                    "image": "round"
                                });
                                newComment.save();
                            }
                        })
                    }
                }).catch(function (error, response) {
                    Comment.findOne({ "id": req.params.cid }, (err, comment) => {
                        if (comment) {
                            res.json({
                                "success": true,
                                "id": comment.id,
                                "stats": comment.stats,
                                "misc": comment.misc,
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
        res.status(404).json({ 'error': true, 'message': 'Invaild comment ID.' })
    }
});

module.exports = app;