const app = require('express').Router();
const axios = require('axios').default;
const updateStats = require('../../stats.js');

const apikey = require('../../apikey.js');

app.post('/live/search', (req, res) => {
updateStats()
    search()
    function search() {
    axios.get("https://www.googleapis.com/youtube/v3/search?q=" + req.body.search + "&key=" + apikey()+"&type=video&part=snippet&maxResults=1")
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

app.get('/live/:cid', (req, res) => {
updateStats()
    if (req.params.cid.length == 11) {
        fetch();
        function fetch() {
            axios.get("https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=" + req.params.cid + "&key=" + apikey())
                .then(function (response) {
                    let data = response.data;
                    if (!data.error) {
                        if (data.items[0].liveStreamingDetails) {
                            res.json({
                                success: true,
                                stats: [{
                                    "name": "Viewers",
                                    "value": parseFloat(data.items[0].liveStreamingDetails.concurrentViewers)
                                }]
                            })
                        } else {
                            res.status(404).json({ 'error': true, 'message': 'err' })
                        }
                    }
                }).catch(function (error) {
                    res.status(404).json({ 'error': true, 'message': 'err' })
                })
        }
    } else {
        res.status(404).json({ 'error': true, 'message': 'Invaild channel ID.' })
    }
});

module.exports = app;