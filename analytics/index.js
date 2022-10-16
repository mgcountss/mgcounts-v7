const app = require('express').Router();
const axios = require('axios').default;
const fs = require('fs');
let tofetch = [];
const youtubeUser = require('../models/youtube-users');
const youtubeEst = require('../models/youtube-users');
const youtubeVideo = require('../models/youtube-videos');
const youtubeLive = require('../models/youtube-videos');
const youtubeComment = require('../models/youtube-comments');
const storyfireUser = require('../models/storyfire-users');
const storyfireVideo = require('../models/storyfire-videos');
const mrbeastTeamtrees = require('../models/mrbeast-teamtrees');
const mrbeastTeamseas = require('../models/mrbeast-teamseas');
const robloxUser = require('../models/roblox-users');
const robloxGame = require('../models/roblox-games');
const robloxGroup = require('../models/roblox-groups');
const gabUser = require('../models/gab-users');
const gabPost = require('../models/gab-posts');
const discordServer = require('../models/discord-server');
const discordMee6 = require('../models/discord-mee6');
const redditUser = require('../models/reddit-user');
const redditSubreddit = require('../models/reddit-subreddit');
const globalclickerStats = require('../models/globalclicker-stats');
const rumbleUser = require('../models/rumble-users');
const allConsts = [youtubeUser, youtubeEst, youtubeVideo, youtubeLive, youtubeComment, storyfireUser, storyfireVideo, mrbeastTeamtrees, mrbeastTeamseas, robloxUser, robloxGame, robloxGroup, gabUser, gabPost, discordServer, discordMee6, redditUser, redditSubreddit, globalclickerStats, rumbleUser];
const allConsts2 = ['youtubeUser', 'youtubeEst', 'youtubeVideo', 'youtubeLive', 'youtubeComment', 'storyfireUser', 'storyfireVideo', 'mrbeastTeamtrees', 'mrbeastTeamseas', 'robloxUser', 'robloxGame', 'robloxGroup', 'gabUser', 'gabPost', 'discordServer', 'discordMee6', 'redditUser', 'redditSubreddit', 'globalclickerStats', 'rumbleUser'];

function updateStats() {
    for (let i = 0; i < allConsts.length; i++) {
        const consts = allConsts[i];
        consts.find({}).then(item => {
            let platform = allConsts2[i].toString().split(/(?=[A-Z])/)[0];
            let type = allConsts2[i].toString().split(/(?=[A-Z])/)[1].toLowerCase();
            if (allConsts2[i].toString().split(/(?=[A-Z])/)[0] == 'youtube') {
                if (type == 'user') {
                    for (let q = 0; q < item.length; q += 50) {
                        let fetch50 = [];
                        for (let w = 0; w < 50; w++) {
                            if (item[q + w]) {
                                fetch50.push(item[q + w].id);
                            }
                        }
                        axios.get('http://localhost:8080/api/youtube/user/analytics/user/bulk/' + fetch50.join(',')).then(res => { }).catch(err => { })
                    }
                    console.log(platform + " " + type + " done (" + item.length + ")")
                } else if (type == 'video') {
                    for (let q = 0; q < item.length; q += 50) {
                        let fetch50 = [];
                        for (let w = 0; w < 50; w++) {
                            if (item[q + w]) {
                                fetch50.push(item[q + w].id);
                            }
                        }
                        axios.get('http://localhost:8080/api/youtube/video/analytics/video/bulk/' + fetch50.join(',')).then(res => { }).catch(err => { })
                    }
                    console.log(platform + " " + type + " done (" + item.length + ")")
                } else if (type == 'comment') {
                    for (let q = 0; q < item.length; q += 50) {
                        let fetch50 = [];
                        for (let w = 0; w < 50; w++) {
                            if (item[q + w]) {
                                fetch50.push(item[q + w].id);
                            }
                        }
                        axios.get('http://localhost:8080/api/youtube/comment/analytics/comment/bulk/' + fetch50.join(',')).then(res => { }).catch(err => { })
                    }
                    console.log(platform + " " + type + " done (" + item.length + ")")
                }
            } else {
                item.forEach(item => {
                    let url = "http://localhost:8080/api/" + platform + "/" + type + "/" + item.id;
                    axios.get(url).then(res => { }).catch(err => {
                        tofetch.push(url);
                        fs.writeFileSync('tofetch.json', JSON.stringify(tofetch, null, "\t"));
                    }).catch(err => { })
                })
                console.log(platform + " " + type + " done (" + item.length + ")")
            }
        }).catch(err => {
            console.log(err)
        })
        if (i == allConsts.length - 1) {
            console.log('done', tofetch.length)
            setTimeout(function () {
                if (tofetch.length > 0) {
                    toFetchData();
                }
            }, 1000 * 60 * 30);
        }
    }
}

setInterval(function () {
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();
    if (hours == 7 && minute == 0) {
        updateStats();
    }
}, 60000);

function toFetchData() {
    fs.readFileSync('tofetch.json', 'utf8', (err, data) => {
        let tofetch = data
        for (let i = 0; i < tofetch.length; i++) {
            axios.get(tofetch[i]).then(res => {
                tofetch = tofetch.filter(item => item != tofetch[i]);
            }).catch(err => { })
        }
    }).catch(err => { })

    setTimeout(function () {
        if (tofetch.length > 0) {
            toFetchData();
            console.log(tofetch)
        }
    }, 1000 * 60 * 30);
}

module.exports = app;