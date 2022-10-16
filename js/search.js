var url1 = ""
var url2 = ""
document.getElementById("select1").addEventListener('change', function () {
    if (document.getElementById('select1').value == 'mrbeast/teamseas') {
        document.getElementById('search1').remove()
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'mrbeast/teamtrees') {
        document.getElementById('search1').remove()
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'discord/server') {
        if (document.getElementById('search1')) { } else {
            if (document.getElementById('search1')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search1"
                document.getElementById('query1').append(a)
            }
        }
        document.getElementById('search1').placeholder = "Server Invite ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'roblox/user') {
        if (document.getElementById('search1')) { } else {
            if (document.getElementById('search1')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search1"
                document.getElementById('query1').append(a)
            }
        }
        document.getElementById('search1').placeholder = "User ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'roblox/games') {
        if (document.getElementById('select1')) { } else {
            if (document.getElementById('select1')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search1"
                document.getElementById('query1').append(a)
            }
        }
        document.getElementById('select1').placeholder = "User ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'roblox/groups') {
        if (document.getElementById('search1')) { } else {
            if (document.getElementById('search1')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search1"
                document.getElementById('query1').append(a)
            }
        }
        document.getElementById('search1').placeholder = "Group ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'gab/user') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Username"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'gab/post') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Post ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'globalClicker/v') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "V: "
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'storyfire/user') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "User ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'twitch/user') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Username"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'twitch/streams') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Streamer Username"
        document.getElementById('img1').style.width = "15vw"
        document.getElementById('img1').style.height = "10vw"
        document.getElementById('img1').style.borderRadius = "20px"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'reddit/subreddit') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "R/ "
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'youtubeapi/user') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Search"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'youtube/user-est') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Search"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'youtube/videos') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Search"
        document.getElementById('img1').style.width = "15vw"
        document.getElementById('img1').style.height = "10vw"
        document.getElementById('img1').style.borderRadius = "20px"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'storyfire/videos') {
        if (document.getElementById('search1')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search1"
            document.getElementById('query1').append(a)
        }
        document.getElementById('search1').placeholder = "Video ID"
        document.getElementById('img1').style.width = "15vw"
        document.getElementById('img1').style.height = "10vw"
        document.getElementById('img1').style.borderRadius = "20px"
        document.getElementById('inputa').remove()
    }
    if (document.getElementById('select1').value == 'discord/mee6') {
        document.getElementById('search1').placeholder = "Server ID"
        document.getElementById('img1').style.width = "10vw"
        document.getElementById('img1').style.borderRadius = "10vw"
        var b = document.createElement('INPUT')
        b.id = "inputa"
        b.placeholder = "Username"
        document.getElementById('query1').append(b)
    }
})
document.getElementById("select2").addEventListener('change', function () {
    if (document.getElementById('select2').value == 'mrbeast/teamseas') {
        document.getElementById('search2').remove()
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'mrbeast/teamtrees') {
        document.getElementById('search2').remove()
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'discord/server') {
        if (document.getElementById('search2')) { } else {
            if (document.getElementById('search2')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search2"
                document.getElementById('query2').append(a)
            }
        }
        document.getElementById('search2').placeholder = "Server Invite ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'roblox/user') {
        if (document.getElementById('search2')) { } else {
            if (document.getElementById('search2')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search2"
                document.getElementById('query2').append(a)
            }
        }
        document.getElementById('search2').placeholder = "User ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'roblox/games') {
        if (document.getElementById('search2')) { } else {
            if (document.getElementById('search2')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search2"
                document.getElementById('query2').append(a)
            }
        }
        document.getElementById('search2').placeholder = "User ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'roblox/groups') {
        if (document.getElementById('search2')) { } else {
            if (document.getElementById('search2')) { } else {
                var a = document.createElement('INPUT')
                a.id = "search2"
                document.getElementById('query2').append(a)
            }
        }
        document.getElementById('search2').placeholder = "Group ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'gab/user') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Username"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'gab/post') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Post ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'globalClicker/v') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "V: "
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'storyfire/user') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "User ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'twitch/user') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Username"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'twitch/streams') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Streamer Username"
        document.getElementById('img1').style.width = "15vw"
        document.getElementById('img1').style.height = "10vw"
        document.getElementById('img1').style.borderRadius = "20px"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'reddit/subreddit') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "R/ "
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'youtubeapi/user') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Search"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'youtube/user-est') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Search"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'youtube/videos') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Search"
        document.getElementById('img1').style.width = "15vw"
        document.getElementById('img1').style.height = "10vw"
        document.getElementById('img1').style.borderRadius = "20px"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'storyfire/videos') {
        if (document.getElementById('search2')) { } else {
            var a = document.createElement('INPUT')
            a.id = "search2"
            document.getElementById('query2').append(a)
        }
        document.getElementById('search2').placeholder = "Video ID"
        document.getElementById('img1').style.width = "15vw"
        document.getElementById('img1').style.height = "10vw"
        document.getElementById('img1').style.borderRadius = "20px"
        document.getElementById('inputb').remove()
    }
    if (document.getElementById('select2').value == 'discord/mee6') {
        document.getElementById('search2').placeholder = "Server ID"
        document.getElementById('img2').style.width = "10vw"
        document.getElementById('img2').style.borderRadius = "10vw"
        var b = document.createElement('INPUT')
        b.id = "inputb"
        b.placeholder = "Username"
        document.getElementById('query2').append(b)
    }
})

function search1() {
    let link = ""
    let value = ""
    if (document.getElementById('select1').value !== "mrbeast/teamtrees" && document.getElementById('select1').value !== "mrbeast/teamseas") {
        value = document.getElementById('search1').value
    }
    if (document.getElementById('select1').value == 'youtube/user-est') {
        link = "/youtube/user/search/"
    }
    if (document.getElementById('select1').value == 'youtube/user') {
        link = "/youtube/user/search/"
    }
    if (document.getElementById('select1').value == 'youtube/videos') {
        link = "/youtube/videos/search/"
    }
    if (document.getElementById('select1').value == 'youtube/comments') {
        link = "/youtube/comments/"
    }
    if (document.getElementById('select1').value == 'youtube/streams') {
        link = "/videos/search/"
    }
    if (document.getElementById('select1').value == 'twitch/user') {
        link = "/twitch/user/"
    }
    if (document.getElementById('select1').value == 'twitch/stream') {
        link = "/twitch/stream/"
    }
    if (document.getElementById('select1').value == 'mrbeast/teamtrees') {
        link = "/mrbeast/teamtrees/"
    }
    if (document.getElementById('select1').value == 'mrbeast/teamseas') {
        link = "/mrbeast/teamseas/"
    }
    if (document.getElementById('select1').value == 'storyfire/user') {
        link = "/storyfire/user/"
    }
    if (document.getElementById('select1').value == 'storyfire/videos') {
        link = "/storyfire/videos/"
    }
    if (document.getElementById('select1').value == 'roblox/user') {
        link = "/roblox/user/"
    }
    if (document.getElementById('select1').value == 'roblox/groups') {
        link = "/roblox/groups/"
    }
    if (document.getElementById('select1').value == 'roblox/games') {
        link = "/roblox/games/"
    }
    if (document.getElementById('select1').value == 'globalClicker/v') {
        link = "/globalClicker/v"
    }
    if (document.getElementById('select1').value == 'gab/user') {
        link = "/gab/user/"
    }
    if (document.getElementById('select1').value == 'gab/post') {
        link = "/gab/post/"
    }
    if (document.getElementById('select1').value == 'reddit/user') {
        link = "/reddit/user/"
    }
    if (document.getElementById('select1').value == 'changeorg/changeorg') {
        link = "/changeorg/"
    }
    if (document.getElementById('select1').value == 'reddit/subreddit') {
        link = "/reddit/subreddit/"
    }
    if (document.getElementById('select1').value == 'discord/server') {
        link = "/discord/server/"
    }
    if (document.getElementById('select1').value == 'discord/mee6') {
        link = "/discord/mee6/"
        value = document.getElementById('search1').value + "/" + document.getElementById('inputa').value
    }
    fetch('https://backend.mgcounts.com' + link + '' + value + '')
        .then(response => response.json())
        .then(data => {
            document.getElementById('name1').innerHTML = data.name1 || data.name
            document.getElementById('img1').src = data.img1 || data.image
            id = data.id1 || value
            url1 = document.getElementById('select1').value + "=" + id + ""
            if (link == "/mrbeast/teamtrees/") {
                url1 = "/mrbeast/teamtrees=true"
            }
            if (link == "/mrbeast/teamseas/") {
                url1 = "/mrbeast/teamseas=true"
            }
            if (link == "/globalClicker/v") {
               url1 = "globalClicker/v"+id+""
            }
        })
}

function search2() {
    let link = ""
    let value = ""
    console.log(document.getElementById('select2').value)
    if (document.getElementById('select2').value !== "mrbeast/teamtrees" && document.getElementById('select2').value !== "mrbeast/teamseas") {
        value = document.getElementById('search2').value
    }
    if (document.getElementById('select2').value == 'youtube/user-est') {
        link = "/youtube/user/search/"
    }
    if (document.getElementById('select2').value == 'youtube/user') {
        link = "/youtube/user/search/"
    }
    if (document.getElementById('select2').value == 'youtube/videos') {
        link = "/youtube/videos/search/"
    }
    if (document.getElementById('select2').value == 'youtube/comments') {
        link = "/youtube/comments/"
    }
    if (document.getElementById('select2').value == 'youtube/streams') {
        link = "/videos/search/"
    }
    if (document.getElementById('select2').value == 'twitch/user') {
        link = "/twitch/user/"
    }
    if (document.getElementById('select2').value == 'twitch/stream') {
        link = "/twitch/stream/"
    }
    if (document.getElementById('select2').value == 'mrbeast/teamtrees') {
        link = "/mrbeast/teamtrees/"
    }
    if (document.getElementById('select2').value == 'mrbeast/teamseas') {
        link = "/mrbeast/teamseas/"
    }
    if (document.getElementById('select2').value == 'storyfire/user') {
        link = "/storyfire/user/"
    }
    if (document.getElementById('select2').value == 'storyfire/videos') {
        link = "/storyfire/videos/"
    }
    if (document.getElementById('select2').value == 'roblox/user') {
        link = "/roblox/user/"
    }
    if (document.getElementById('select2').value == 'roblox/groups') {
        link = "/roblox/groups/"
    }
    if (document.getElementById('select2').value == 'roblox/games') {
        link = "/roblox/games/"
    }
    if (document.getElementById('select2').value == 'globalClicker/v') {
        link = "/globalClicker/v"
    }
    if (document.getElementById('select2').value == 'gab/user') {
        link = "/gab/user/"
    }
    if (document.getElementById('select2').value == 'gab/post') {
        link = "/gab/post/"
    }
    if (document.getElementById('select2').value == 'reddit/user') {
        link = "/reddit/user/"
    }
    if (document.getElementById('select2').value == 'changeorg/changeorg') {
        link = "/changeorg/"
    }
    if (document.getElementById('select2').value == 'reddit/subreddit') {
        link = "/reddit/subreddit/"
    }
    if (document.getElementById('select2').value == 'discord/server') {
        link = "/discord/server/"
    }
    if (document.getElementById('select2').value == 'discord/mee6') {
        link = "/discord/mee6/"
        value = document.getElementById('search2').value + "/" + document.getElementById('inputb').value
    }
    console.log(link, value)
    fetch('https://backend.mgcounts.com' + link + '' + value + '')
        .then(response => response.json())
        .then(data => {
            document.getElementById('name2').innerHTML = data.name1 || data.name
            document.getElementById('img2').src = data.img1 || data.image
            id = data.id1 || value
            url2 = document.getElementById('select2').value + "=" + id + ""
            if (link == "/mrbeast/teamtrees/") {
                url2 = "/mrbeast/teamtrees=true"
            }
            if (link == "/mrbeast/teamseas/") {
                url2 = "/mrbeast/teamseas=true"
            }
            if (link == "/globalClicker/v") {
               url2 = "globalClicker/v"+id+""
            }
        })
}


function start() {
    var url = "https://mgcounts.com/compare?" + url1 + "&" + url2 + ""
    window.location.href = url
}