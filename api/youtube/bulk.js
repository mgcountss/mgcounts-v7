const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/youtube-users');
const Video = require('../../models/youtube-videos');
const Comment = require('../../models/youtube-comments');
const apikey = require('../../apikey.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/user/analytics/user/bulk/:cid', (req, res) => {
    updateStats()
    req.params.cid = req.params.cid.split(',');
    let channelids = req.params.cid;
    fetch();
    function fetch() {
        axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,brandingSettings&id=" + req.params.cid + "&key=" + apikey())
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
                    for (let i = 0; i < data.items.length; i++) {
                        User.findOne({ id: data.items[i].id }, (err, user) => {
                            if (user) {
                                user.stats = [
                                    {
                                        "name": "Subscribers",
                                        "value": parseFloat(data.items[i].statistics.subscriberCount)
                                    }, {
                                        "name": "Views",
                                        "value": parseFloat(data.items[i].statistics.viewCount)
                                    }, {
                                        "name": "Videos",
                                        "value": parseFloat(data.items[i].statistics.videoCount)
                                    }
                                ]
                                if (user.data[user.data.length - 1][0].value == data.date) {
                                    user.data[user.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Subscribers",
                                            "value": parseFloat(data.items[i].statistics.subscriberCount)
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[i].statistics.viewCount)
                                        }, {
                                            "name": "Videos",
                                            "value": parseFloat(data.items[i].statistics.videoCount)
                                        }
                                    ];
                                } else {
                                    user.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Subscribers",
                                            "value": parseFloat(data.items[i].statistics.subscriberCount)
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[i].statistics.viewCount)
                                        }, {
                                            "name": "Videos",
                                            "value": parseFloat(data.items[i].statistics.videoCount)
                                        }
                                    ]);
                                }
                                user.save().catch(err => { });
                            } else {
                                console.log('err')
                            }
                        })
                    }
                }
            })
            .catch(function (error) {
                fetch();
            })
    }
    res.send("ok");
})

app.get('/video/analytics/video/bulk/:cid', (req, res) => {
    updateStats()
    req.params.cid = req.params.cid.split(',');
    let channelids = req.params.cid;
    fetch();
    function fetch() {
        axios.get("https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,liveStreamingDetails&id=" + req.params.cid + "&key=" + apikey())
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
                    for (let i = 0; i < data.items.length; i++) {
                        Video.findOne({ id: data.items[i].id }, (err, video) => {
                            if (video) {
                                video.stats = [
                                    {
                                        "name": "Views",
                                        "value": parseFloat(data.items[i].statistics.viewCount)
                                    }, {
                                        "name": "Likes",
                                        "value": parseFloat(data.items[i].statistics.likeCount)
                                    }, {
                                        "name": "Dislikes",
                                        "value": parseFloat(data.items[i].statistics.dislikeCount)
                                    }, {
                                        "name": "Comments",
                                        "value": parseFloat(data.items[i].statistics.commentCount)
                                    }
                                ]
                                if (video.data[video.data.length - 1][0].value == data.date) {
                                    video.data[video.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[i].statistics.viewCount)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[i].statistics.likeCount)
                                        }, {
                                            "name": "Dislikes",
                                            "value": parseFloat(data.items[i].statistics.dislikeCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.items[i].statistics.commentCount)
                                        }
                                    ];
                                } else {
                                    video.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Views",
                                            "value": parseFloat(data.items[i].statistics.viewCount)
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[i].statistics.likeCount)
                                        }, {
                                            "name": "Dislikes",
                                            "value": parseFloat(data.items[i].statistics.dislikeCount)
                                        }, {
                                            "name": "Comments",
                                            "value": parseFloat(data.items[i].statistics.commentCount)
                                        }
                                    ]);
                                }
                                video.save().catch(err => { });
                            } else {
                                console.log('err')
                            }
                        })
                    }
                }
            })
            .catch(function (error) {
                fetch();
            })
    }
})

app.get('/comment/analytics/comment/bulk/:cid', (req, res) => {
    updateStats()
    req.params.cid = req.params.cid.split(',');
    let channelids = req.params.cid;
    fetch();
    function fetch() {
        axios.get("https://www.googleapis.com/youtube/v3/comments?part=snippet&id=" + req.params.cid + "&key=" + apikey())
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
                    for (let i = 0; i < data.items.length; i++) {
                        Comment.findOne({ id: data.items[i].id }, (err, comment) => {
                            if (comment) {
                                comment.stats = [
                                    {
                                        "name": "Likes",
                                        "value": parseFloat(data.items[i].snippet.likeCount)
                                    }
                                ]
                                if (comment.data[comment.data.length - 1][0].value == data.date) {
                                    comment.data[comment.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[i].snippet.likeCount)
                                        }
                                    ];
                                } else {
                                    comment.data.push([
                                        {
                                            "name": "Date",
                                            "value": data.date
                                        }, {
                                            "name": "Likes",
                                            "value": parseFloat(data.items[i].snippet.likeCount)
                                        }
                                    ]);
                                }
                                comment.save().catch(err => { });
                            } else {
                                console.log('err')
                            }
                        })
                    }
                }
            })
            .catch(function (error) {
                fetch();
            })
    }
})



module.exports = app;