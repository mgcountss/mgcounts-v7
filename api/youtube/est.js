const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const apikey = require('../../apikey.js');

app.post('/est/search', (req, res) => {
updateStats()
    search()
    function search() {
    axios.get("https://www.googleapis.com/youtube/v3/search?q=" + req.body.search + "&key=" + apikey()+"&type=channel&part=snippet")
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

app.get('/est/:cid', (req, res) => {
updateStats()
    if (req.params.cid.length == 24 && req.params.cid.startsWith('UC')) {
        fetch();
        function fetch() {
            axios.get("https://livecounts.xyz/api/youtube-live-subscriber-count/live/" + req.params.cid)
                .then(function (response) {
                    let data = response.data;
                    if (!data.error) {
                        res.json({
                            success: true,
                            stats: [{
                                "name": "Subscribers",
                                "value": data.counts[0]
                            }, {
                                "name": "Views",
                                "value": data.counts[1]
                            }, {
                                "name": "Videos",
                                "value": data.counts[2]
                            }],
                            misc: []
                        })
                    }
                })
        }
    } else {
        res.status(404).json({ 'error': true, 'message': 'Invaild channel ID.' })
    }
});

module.exports = app;