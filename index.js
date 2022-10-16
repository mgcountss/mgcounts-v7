const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const youtubeUser = require('./models/youtube-users');
const youtubeEst = require('./models/youtube-users');
const youtubeVideo = require('./models/youtube-videos');
const youtubeLive = require('./models/youtube-videos');
const youtubeComment = require('./models/youtube-comments');
const storyfireUser = require('./models/storyfire-users');
const storyfireVideo = require('./models/storyfire-videos');
const mrbeastTeamtrees = require('./models/mrbeast-teamtrees');
const mrbeastTeamseas = require('./models/mrbeast-teamseas');
const robloxUser = require('./models/roblox-users');
const robloxGame = require('./models/roblox-games');
const robloxGroup = require('./models/roblox-groups');
const gabUser = require('./models/gab-users');
const gabPost = require('./models/gab-posts');
const discordServer = require('./models/discord-server');
const discordMee6 = require('./models/discord-mee6');
const redditUser = require('./models/reddit-user');
const redditSubreddit = require('./models/reddit-subreddit');
const globalclickerStats = require('./models/globalclicker-stats');
const rumbleUser = require('./models/rumble-users');
const stats = require('./models/stats');
const all = ['youtube/user', 'youtube/est', 'youtube/video', 'youtube/live', 'youtube/comment', 'storyfire/user', 'storyfire/video', 'mrbeast/teamtrees', 'mrbeast/teamseas', 'roblox/user', 'roblox/game', 'roblox/group', 'gab/user', 'gab/post', 'discord/server', 'discord/mee6', 'reddit/user', 'reddit/subreddit', 'globalclicker/stats', 'rumble/user'];
const add = require('./add.js');
const getGoal = require('./getGoal.js');
app.set('view engine', 'ejs');
mongoose.connect('mongodb://username:password@ip:port/mgcounts?authMechanism=DEFAULT&authSource=admin');

fs.readdir('./api/youtube/', (err, files) => {
  files.forEach(file => {
    app.use('/api/youtube', require('./api/youtube/' + file));
  });
});
fs.readdir('./api/storyfire/', (err, files) => {
  files.forEach(file => {
    app.use('/api/storyfire', require('./api/storyfire/' + file));
  });
});
fs.readdir('./api/mrbeast/', (err, files) => {
  files.forEach(file => {
    app.use('/api/mrbeast', require('./api/mrbeast/' + file));
  });
});
fs.readdir('./api/roblox/', (err, files) => {
  files.forEach(file => {
    app.use('/api/roblox', require('./api/roblox/' + file));
  });
});
fs.readdir('./api/gab/', (err, files) => {
  files.forEach(file => {
    app.use('/api/gab', require('./api/gab/' + file));
  });
});
fs.readdir('./api/discord/', (err, files) => {
  files.forEach(file => {
    app.use('/api/discord', require('./api/discord/' + file));
  });
});
fs.readdir('./api/reddit/', (err, files) => {
  files.forEach(file => {
    app.use('/api/reddit', require('./api/reddit/' + file));
  });
});
fs.readdir('./api/globalclicker/', (err, files) => {
  files.forEach(file => {
    app.use('/api/globalclicker', require('./api/globalclicker/' + file));
  });
});
fs.readdir('./api/mgcounts/', (err, files) => {
  files.forEach(file => {
    app.use('/api/mgcounts', require('./api/mgcounts/' + file));
  });
});
fs.readdir('./api/rumble/', (err, files) => {
  files.forEach(file => {
    app.use('/api/rumble', require('./api/rumble/' + file));
  });
});
fs.readdir('./analytics/', (err, files) => {
  files.forEach(file => {
    app.use('/api/analytics', require('./analytics/' + file));
  });
});

app.get('/logo.png', (req, res) => {
  res.sendFile(__dirname + '/assets/img/mgcounts.png');
});
app.get('/assets/gc/:v.png', (req, res) => {
  res.sendFile(__dirname + '/assets/img/gc/' + req.params.v + '.png');
});
app.get('/assets/img/:v.png', (req, res) => {
  res.sendFile(__dirname + '/assets/img/' + req.params.v + '.png');
});
app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/assets/img/favicon.ico');
});
app.get('/odometer.js', (req, res) => {
  res.sendFile(__dirname + '/js/odometer.js');
});
app.get('/highstock.js', (req, res) => {
  res.sendFile(__dirname + '/js/highstock.js');
});
app.get('/odometer.css', (req, res) => {
  res.sendFile(__dirname + '/css/odometer.css');
});
app.get('/', (req, res) => {
  res.render('index');
  stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
    if (item) {
      item.site++;
      item.save();
    }
  });
});

app.get('/:platform/:type/:id', (req, res) => {
  req.params.type = req.params.type.toLowerCase();
  req.params.platform = req.params.platform.toLowerCase();
  if (req.params.platform == 'youtube' && req.params.type == 'est') {
    add("" + req.params.platform + "/" + req.params.type + "", req.params.id);
  } else if (req.params.platform == 'youtube' && req.params.type == 'live') {
    add("" + req.params.platform + "/" + req.params.type + "", req.params.id);
  }
  let newConst = req.params.platform + "" + req.params.type[0].toUpperCase() + "" + req.params.type.slice(1) + ""
  try {
    eval(newConst).findOne({ id: req.params.id }, (err, item) => {
      if (item) {
        let items = [];
        let tempItem = [];
        let data = item.data;
        let names = [];
        for (let i = 0; i < item.stats.length; i++) {
          names.push(item.stats[i].name);
        }
        for (let i = 0; i < data[0].length; i++) {
          data.forEach(item => {
            tempItem.push([item[0].value, item[i].value]);
          })
          items.push(tempItem);
          tempItem = [];
        }
        items = items.slice(1);
        res.render('main', {
          item: item,
          id: req.params.id,
          title: item.misc[0].value + " - " + req.params.platform[0].toLocaleUpperCase() + "" + req.params.platform.slice(1) + " Stats",
          path: "/" + req.params.platform + "/" + req.params.type + "/",
          getGoal: getGoal,
          img: item.image,
          chart: items,
          chartNames: names,
          table: item.data,
        });
      } else {
        (async () => {
          let newItem = await add("" + req.params.platform + "/" + req.params.type + "", req.params.id);
          if (newItem.error) {
            console.log(newItem.error);
            res.redirect("../../" + req.params.platform + "/" + req.params.type + "");
          } else {
            if (newItem.success) {
              res.render('main', {
                item: newItem,
                id: req.params.id,
                title: newItem.misc[0].value + " - " + req.params.platform[0].toLocaleUpperCase() + "" + req.params.platform.slice(1) + " Stats",
                path: "/" + req.params.platform + "/" + req.params.type + "/",
                getGoal: getGoal,
                img: newItem.image,
                chart: [],
                chartNames: [],
                table: []
              });
            } else {
              res.redirect("../../" + req.params.platform + "/" + req.params.type + "");
            };
          };
        })();
      }
      stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
        if (item) {
          item.site++;
          item.save();
        }
      });
    });
  } catch (e) {
    console.log('catched');
    res.redirect("../../" + req.params.platform + "/" + req.params.type + "");
  }
})

app.get('/compare', (req, res) => {
  res.render('search2', {
    types: all
  });
  stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
    if (item) {
      item.site++;
      item.save();
    }
  });
})

app.get('/compare/:platform1/:type1/:id1/:platform2/:type2/:id2', (req, res) => {
  req.params.type1 = req.params.type1.toLowerCase();
  req.params.platform1 = req.params.platform1.toLowerCase();
  req.params.type2 = req.params.type2.toLowerCase();
  req.params.platform2 = req.params.platform2.toLowerCase();
  if (req.params.platform1 == 'youtube' && req.params.type1 == 'est') {
    add("" + req.params.platform1 + "/" + req.params.type1 + "", req.params.id1);
  } else if (req.params.platform1 == 'youtube' && req.params.type1 == 'live') {
    add("" + req.params.platform1 + "/" + req.params.type1 + "", req.params.id1);
  }
  if (req.params.platform2 == 'youtube' && req.params.type2 == 'est') {
    add("" + req.params.platform2 + "/" + req.params.type2 + "", req.params.id2);
  } else if (req.params.platform2 == 'youtube' && req.params.type2 == 'live') {
    add("" + req.params.platform2 + "/" + req.params.type2 + "", req.params.id2);
  }
  let newConst1 = req.params.platform1 + "" + req.params.type1[0].toUpperCase() + "" + req.params.type1.slice(1) + ""
  let newConst2 = req.params.platform2 + "" + req.params.type2[0].toUpperCase() + "" + req.params.type2.slice(1) + ""
  try {
    eval(newConst1).findOne({ id: req.params.id1 }, (err, item1) => {
      if (item1) {
        try {
          eval(newConst2).findOne({ id: req.params.id2 }, (err, item2) => {
            if (item2) {
              res.render('compare', {
                item1: item1,
                item2: item2,
                id1: req.params.id1,
                id2: req.params.id2,
                title: item1.misc[0].value + " vs " + item2.misc[0].value,
                path1: "/" + req.params.platform1 + "/" + req.params.type1 + "/",
                path2: "/" + req.params.platform2 + "/" + req.params.type2 + "/",
                getGoal: getGoal,
                img1: item1.image,
                img2: item2.image
              });
            } else {
              (async () => {
                let newItem = await add("" + req.params.platform2 + "/" + req.params.type2 + "", req.params.id2);
                if (newItem.error) {
                  res.redirect("../../" + req.params.platform2 + "/" + req.params.type2 + "");
                } else {
                  if (newItem.success) {
                    res.render('compare', {
                      item1: item1,
                      item2: newItem,
                      id1: req.params.id1,
                      id2: req.params.id2,
                      title: item1.misc[0].value + " vs " + newItem.misc[0].value,
                      path1: "/" + req.params.platform1 + "/" + req.params.type1 + "/",
                      path2: "/" + req.params.platform2 + "/" + req.params.type2 + "/",
                      getGoal: getGoal,
                      img1: item1.image,
                      img2: newItem.image
                    });
                  } else {
                    res.redirect("../../" + req.params.platform2 + "/" + req.params.type2 + "");
                  };
                };
              })();
            }
          })
        } catch (e) {
          res.redirect("/compare");
        }
      } else {
        (async () => {
          let newItem = await add("" + req.params.platform1 + "/" + req.params.type1 + "", req.params.id1);
          if (newItem.error) {
            res.redirect("../../" + req.params.platform1 + "/" + req.params.type1 + "");
          } else {
            if (newItem.success) {
              try {
                eval(newConst2).findOne({ id: req.params.id2 }, (err, item2) => {
                  if (item2) {
                    res.render('compare', {
                      item1: newItem,
                      item2: item2,
                      id1: req.params.id1,
                      id2: req.params.id2,
                      title: newItem.misc[0].value + " vs " + item2.misc[0].value,
                      path1: "/" + req.params.platform1 + "/" + req.params.type1 + "/",
                      path2: "/" + req.params.platform2 + "/" + req.params.type2 + "/",
                      getGoal: getGoal,
                      img1: newItem.image,
                      img2: item2.image
                    });
                  } else {
                    (async () => {
                      let newItem2 = await add("" + req.params.platform2 + "/" + req.params.type2 + "", req.params.id2);
                      if (newItem2.error) {
                        res.redirect("../../" + req.params.platform2 + "/" + req.params.type2 + "");
                      } else {
                        if (newItem2.success) {
                          res.render('compare', {
                            item1: newItem,
                            item2: newItem2,
                            id1: req.params.id1,
                            id2: req.params.id2,
                            title: newItem.misc[0].value + " vs " + newItem2.misc[0].value,
                            path1: "/" + req.params.platform1 + "/" + req.params.type1 + "/",
                            path2: "/" + req.params.platform2 + "/" + req.params.type2 + "/",
                            getGoal: getGoal,
                            img1: newItem.image,
                            img2: newItem2.image
                          });
                        } else {
                          res.redirect("../../" + req.params.platform2 + "/" + req.params.type2 + "");
                        };
                      };
                    })();
                  }
                })
              } catch (e) {
                res.redirect("/compare");
              }
            } else {
              res.redirect("../../" + req.params.platform1 + "/" + req.params.type1 + "");
            };
          };
        })();
      }
      stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
        if (item) {
          item.site++;
          item.save();
        }
      });
    });
  } catch (e) {
    res.redirect("/compare");
  }
})

app.get('/:platform/:type', (req, res) => {
  req.params.type = req.params.type.toLowerCase();
  req.params.platform = req.params.platform.toLowerCase();
  const newConst = req.params.platform + "" + req.params.type[0].toUpperCase() + "" + req.params.type.slice(1) + ""
  if (req.params.platform == "youtube" && (req.params.type == "est")) {
    if (req.params.type == "est") {
      res.render('search', {
        platform: req.params.platform,
        type: 'user',
        type2: 'est'
      });
    }
  } else {
    try {
      eval(newConst)
      if (req.params.platform == "mrbeast") {
        res.redirect("/mrbeast/" + req.params.type + "/stats");
      } else {
        res.render('search', {
          platform: req.params.platform,
          type: req.params.type,
          type2: req.params.type
        });
      }
      stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
        if (item) {
          item.site++;
          item.save();
        }
      });
    } catch (e) {
      res.redirect("/");
    }
  }
})

app.get('/embeds/:platform/:type/:id/:type2', (req, res) => {
  req.params.type = req.params.type.toLowerCase();
  req.params.platform = req.params.platform.toLowerCase();
  let newConst = req.params.platform + "" + req.params.type[0].toUpperCase() + "" + req.params.type.slice(1) + ""
  try {
    eval(newConst).findOne({ id: req.params.id }, (err, item) => {
      if (item) {
        if (item.stats[req.params.type2]) {
          res.render('embed', {
            item: item,
            id: req.params.id,
            title: item.misc[0].value + " - " + req.params.platform[0].toLocaleUpperCase() + "" + req.params.platform.slice(1) + " Stats",
            path: "/" + req.params.platform + "/" + req.params.type + "/",
            getGoal: getGoal,
            img: item.image,
            num: req.params.type2
          });
        } else {
          res.redirect("/" + req.params.platform + "/" + req.params.type + "/" + req.params.id);
        }
      } else {
        (async () => {
          let newItem = await add("" + req.params.platform + "/" + req.params.type + "", req.params.id);
          if (newItem.error) {
            res.redirect("../../../../" + req.params.platform + "/" + req.params.type + "");
          } else {
            if (newItem.success) {
              if (newItem.stats[req.params.type2]) {
                res.render('embed', {
                  item: newItem,
                  id: req.params.id,
                  title: newItem.misc[0].value + " - " + req.params.platform[0].toLocaleUpperCase() + "" + req.params.platform.slice(1) + " Stats",
                  path: "/" + req.params.platform + "/" + req.params.type + "/",
                  getGoal: getGoal,
                  img: item.image,
                  num: req.params.type2
                });
              } else {
                res.redirect("/" + req.params.platform + "/" + req.params.type + "/" + req.params.id);
              }
            } else {
              res.redirect("../../../../" + req.params.platform + "/" + req.params.type + "");
            };
          };
        })();
      }
      stats.findOne({ _id: "6327d99f2b01a2e4e499438b" }, (err, item) => {
        if (item) {
          item.site++;
          item.save();
        }
      });
    });
  } catch (e) {
    res.redirect("../../../../" + req.params.platform + "/" + req.params.type + "");
  }
})

app.listen(8080);