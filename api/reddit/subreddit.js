const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const Subreddit = require('../../models/reddit-subreddit');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/subreddit/search', (req, res) => {
updateStats()
    axios.get("https://api.reddit.com/r/" + req.body.search + "/about.json")
        .then(response => {
            res.json({
                "success": true,
                "results": [
                    {
                        "name": response.data.data.display_name_prefixed,
                        "icon": response.data.data.community_icon.split('?')[0],
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

app.get('/subreddit/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://api.reddit.com/r/" + req.params.cid + "/about.json")
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                    res.json({
                        "success": true,
                        "id": req.params.cid,
                        "stats": [
                            {
                                "name": "Members",
                                "value": parseFloat(data.data.subscribers)
                            }, {
                                "name": "Online Members",
                                "value": parseFloat(data.data.accounts_active)
                            }
                        ],
                        "misc": [
                            {
                                "name": "Name",
                                "value": data.data.display_name_prefixed
                            }, {
                                "name": "Image",
                                "value": data.data.community_icon.split('?')[0]
                            }, {
                                "name": "Banner",
                                "value": data.data.mobile_banner_image
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
                    Subreddit.findOne({ id: req.params.cid }, (err, subreddit) => {
                        if (subreddit) {
                            subreddit.stats = [
                                {
                                    "name": "Members",
                                    "value": parseFloat(data.data.subscribers)
                                }, {
                                    "name": "Online Members",
                                    "value": parseFloat(data.data.accounts_active)
                                }
                            ]
                            if (subreddit.data[subreddit.data.length - 1][0].value == data.date) {
                                subreddit.data[subreddit.data.length - 1] = [
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Members",
                                        "value": parseFloat(data.data.subscribers)
                                    }, {
                                        "name": "Online Members",
                                        "value": parseFloat(data.data.accounts_active)
                                    }
                                ];
                            } else {
                                subreddit.data.push([
                                    {
                                        "name": "Date",
                                        "value": data.date
                                    }, {
                                        "name": "Members",
                                        "value": parseFloat(data.data.subscribers)
                                    }, {
                                        "name": "Online Members",
                                        "value": parseFloat(data.data.accounts_active)
                                    }
                                ]);
                            }
                            subreddit.save().catch(err => {});
                        } else {
                            let newSubreddit = new Subreddit({
                                "id": req.params.cid,
                                "stats": [
                                    {
                                        "name": "Members",
                                        "value": parseFloat(data.data.subscribers)
                                    }, {
                                        "name": "Online Members",
                                        "value": parseFloat(data.data.accounts_active)
                                    }
                                ],
                                "misc": [
                                    {
                                        "name": "Name",
                                        "value": data.data.display_name_prefixed
                                    }, {
                                        "name": "Image",
                                        "value": data.data.community_icon.split('?')[0]
                                    }, {
                                        "name": "Banner",
                                        "value": data.data.mobile_banner_image
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
                                            "name": "Members",
                                            "value": parseFloat(data.data.subscribers)
                                        }, {
                                            "name": "Online Members",
                                            "value": parseFloat(data.data.accounts_active)
                                        }
                                    ]
                                ],
                                "image": "round"
                            });
                            newSubreddit.save();
                        }
                    })
                }
            }).catch(function (error, response) {
                Subreddit.findOne({ "id": req.params.cid }, (err, subreddit) => {
                    if (subreddit) {
                        res.json({
                            "success": true,
                            "id": subreddit.id,
                            "stats": subreddit.stats,
                            "misc": subreddit.misc,
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