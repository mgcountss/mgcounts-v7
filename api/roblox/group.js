const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/roblox-groups');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/group/search', (req, res) => {
updateStats()
    axios.get("https://groups.roblox.com/v1/groups/search?cursor=&keyword=" + req.body.search + "&limit=10&prioritizeExactMatch=true&sortOrder=Asc")
        .then(response => {
            let ids = [];
            for (let i = 0; i < response.data.data.length; i++) {
                ids.push(response.data.data[i].id);
            }
            axios.get("https://thumbnails.roblox.com/v1/groups/icons?groupIds=" + ids.join(",") + "&size=420x420&format=Png&isCircular=false")
                .then(response2 => {
                    let results = [];
                    for (let i = 0; i < response.data.data.length; i++) {
                        results.push({
                            "name": response.data.data[i].name,
                            "icon": response2.data.data[i].imageUrl,
                            "id": response.data.data[i].id,
                            "image": "rect"
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

app.get('/group/:cid', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://groups.roblox.com/v1/groups/" + req.params.cid + "")
            .then(function (response1) {
                axios.get("https://thumbnails.roblox.com/v1/groups/icons?groupIds=" + req.params.cid + "&size=420x420&format=Png&isCircular=false")
                    .then(function (response2) {
                        let data1 = response1.data;
                        let data2 = response2.data;
                        data1.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                        res.json({
                            "success": true,
                            "id": req.params.cid,
                            "stats": [
                                {
                                    "name": "Visits",
                                    "value": parseFloat(data1.memberCount)
                                }
                            ],
                            "misc": [
                                {
                                    "name": "Name",
                                    "value": data1.name
                                }, {
                                    "name": "Image",
                                    "value": data2.data[0].imageUrl
                                }, {
                                    "name": "Banner",
                                    "value": data2.data[0].imageUrl
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
                                        "name": "Visits",
                                        "value": parseFloat(data1.memberCount)
                                    }
                                ]
                                if (user.data[user.data.length - 1][0].value == data1.date) {
                                    user.data[user.data.length - 1] = [
                                        {
                                            "name": "Date",
                                            "value": data1.date
                                        }, {
                                            "name": "Visits",
                                            "value": parseFloat(data1.memberCount)
                                        }
                                    ];
                                } else {
                                    user.data.push([
                                        {
                                            "name": "Date",
                                            "value": data1.date
                                        }, {
                                            "name": "Visits",
                                            "value": parseFloat(data1.memberCount)
                                        }
                                    ]);
                                }
                                user.save();
                            } else {
                                let newUser = new User({
                                    "id": req.params.cid,
                                    "stats": [
                                        {
                                            "name": "Visits",
                                            "value": parseFloat(data1.memberCount)
                                        }
                                    ],
                                    "misc": [
                                        {
                                            "name": "Name",
                                            "value": data1.name
                                        }, {
                                            "name": "Image",
                                            "value": data2.data[0].imageUrl
                                        }, {
                                            "name": "Banner",
                                            "value": data2.data[0].imageUrl
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
                                                "name": "Visits",
                                                "value": parseFloat(data1.memberCount)
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
    }
});

module.exports = app;