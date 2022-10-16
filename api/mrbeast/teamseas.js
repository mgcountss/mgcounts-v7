const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');
const User = require('../../models/mrbeast-teamseas');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/teamseas/stats', (req, res) => {
updateStats()
    fetch();
    function fetch() {
        axios.get("https://tscache.com/donation_total.json")
            .then(function (response) {
                let data = response.data;
                if (!data.error) {
                    data.date = ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                    res.json({
                        "success": true,
                        "id": "teamseas",
                        "stats": [
                            {
                                "name": "Pounds Removed",
                                "value": parseFloat(data.count)
                            }
                        ],
                        "misc": [
                            {
                                "name": "Name",
                                "value": "TeamSeas"
                            }, {
                                "name": "Image",
                                "value": "https://teamseas.org/assets/images/teamseas-logo.png"
                            }, {
                                "name": "Banner",
                                "value": "https://mgcounts.com/assets/img/teamseas.png"
                            }, {
                                "name": "Created",
                                "value": null
                            }, {
                                "name": "Bio",
                                "value": null
                            }
                        ],
                        "image": "round"
                    })
                    User.findOne({ id: "stats" }, (err, user) => {
                        if (user) {
                            user.stats = [
                                {
                                    "name": "Pounds Removed",
                                    "value": parseFloat(data.count)
                                }
                            ]
                            if (user.data[user.data.length - 1][0].value == data.date) {
                                user.data[user.data.length - 1] = [
                                    {
                                        "name": "Date",
                                        "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                    }, {
                                        "name": "Pounds Removed",
                                        "value": parseFloat(data.count)
                                    }
                                ];
                            } else {
                                user.data.push([
                                    {
                                        "name": "Date",
                                        "value": ((new Date().getMonth()) + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()
                                    }, {
                                        "name": "Pounds Removed",
                                        "value": parseFloat(data.count)
                                    }
                                ]);
                            }
                            user.save();
                        }
                    })
                }
            }).catch(function (error, response) {
                User.findOne({ "id": "stats" }, (err, user) => {
                    if (user) {
                        res.json({
                            "success": true,
                            "id": user.id,
                            "stats": user.stats,
                            "misc": user.misc
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