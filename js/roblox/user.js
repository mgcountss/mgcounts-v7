let config = {
    "name": "Roblox",
    "bottom": "Followers",
    "sideCounts": 2,
    "background": localStorage.getItem('background') || "#141414",
    "backgroundCounter": localStorage.getItem('backgroundCounter') || "#1a1a1a",
    "mainCount": localStorage.getItem('mainCount') || "#FFFFFF",
    "sideCountsColor": localStorage.getItem('sideCounts') || "#FFFFFF",
    "odometerUpColor": localStorage.getItem('odometerUpColor') || "#FFFFFF",
    "odometerDownColor": localStorage.getItem('odometerDownColor') || "#FFFFFF",
    "odometerSpeed": localStorage.getItem('odometerSpeed') || "1.5",
    "graphColor": localStorage.getItem('graphColor') || "#FFFFFF",
    "graphLength": localStorage.getItem('graphLength') || "1500",
    "graphType": localStorage.getItem('graphType') || "line"
}
let params = new URLSearchParams(document.location.search.substring(1));
let url = new URL(window.location.href);
let id = "1";
let last = []
if (url.searchParams.get('id')) {
    id = params.get("id");
}
function load() {
    document.getElementById('embed').value = "https://mgcounts.com/embeds/roblox/user?id="+id+""
    document.title = config.name
    document.body.style.backgroundColor = config.background
    document.getElementById('mainCount').style.backgroundColor = config.backgroundCounter
    document.getElementById('f').innerHTML = config.bottom
    for (let q = 0; q < config.sideCounts; q++) {
        let aa = q + 1
        let a = document.createElement('DIV')
        a.classList = "card"
        let b = document.createElement('h2')
        b.id = "name_" + aa + ""
        b.innerHTML = "Loading"
        b.classList = "b"
        let c = document.createElement('h1')
        c.id = "count_" + aa + ""
        c.innerHTML = "000,000,000"
        c.classList = "odometer c"
        a.style.width = "100%"
        a.appendChild(b)
        a.appendChild(c)
        document.getElementById('sideCounters').appendChild(a)
    }
    load2()
    
}

function embed() {
    window.open(document.getElementById('embed').value)
}

function random(min, max) {
    return Math.random(min, max) * 1000
}

let lastest = 0;
function fetcher() {
    fetch('https://backend.mgcounts.com/roblox/user/' + id + '')
        .then(response => response.json())
        .then(data => {
            if (!data.main) {
                document.getElementById('img').src = data.image
                document.getElementById('banner').src = data.banner
                document.getElementById('name').innerHTML = "Loading"
        } else {
            document.getElementById('count').innerHTML = data.main
            lastest = parseFloat(data.main)
            document.getElementById('name').innerHTML = data.name
            document.getElementById('img').src = data.image
            if (chart.series[0].points.length == config.graphLength) chart.series[0].data[0].remove();
            chart.series[0].addPoint([Date.now(), Math.floor(data.main)])
            if (data.banner == null) {
                document.getElementById('banner').src = data.image
            } else {
                document.getElementById('banner').src = data.banner
            }
            if (data.main < 10) return 10; let x1 = Math.floor(Math.log10(data.main)); let x2 = Math.ceil(data.main / 10 ** x1); let x3 = x2 * 10 ** x1; let goal = x3 - data.main;
            document.getElementById('count_1').innerHTML = goal
            document.getElementById('name_1').innerHTML = "Goal"
            if (config.sideCounts > 1) {
                for (let q = 1; q < config.sideCounts; q++) {
                    let e = q + 1
                    document.getElementById('count_' + e + '').innerHTML = data.sideCounts[q - 1].count
                    document.getElementById('name_' + e + '').innerHTML = data.sideCounts[q - 1].name
                }
            }
        }
        });
}

let chart = new Highcharts.chart({
    chart: {
        renderTo: 'chart',
        type: config.graphType,
        zoomType: 'x',
        backgroundColor: 'transparent',
        plotBorderColor: 'transparent'
    },
    title: {
        text: ' '
    },
    credits: {
        enabled: false,
    }, xAxis: {
        type: 'datetime',
        visible: false
    },
    yAxis: {
        visible: false,
    },
    plotOptions: {
        series: {
            threshold: null,
            fillOpacity: 0.25
        },
        area: {
            fillOpacity: 0.25
        }
    },
    series: [{
        showInLegend: false,
        name: '',
        marker: { enabled: false },
        color: 'white',
        lineColor: config.graphColor,
        lineWidth: 2,
    }]
});

function load2() {
    document.getElementById('BColor').value = config.background
    document.getElementById('CounterBColor').value = config.backgroundCounter
    document.getElementById('MainColor').value = config.mainCount
    document.getElementById('SideColor').value = config.sideCountsColor
    document.getElementById('UpColor').value = config.odometerUpColor
    document.getElementById('DownColor').value = config.odometerDownColor
    document.getElementById('speed').value = config.odometerSpeed
    document.getElementById('graphColor').value = config.graphColor
    document.getElementById('graphLength').value = config.graphLength
    document.getElementById('count').style.color = config.mainCount
    document.getElementById('name').style.color = config.mainCount
    document.getElementById('f').style.color = config.mainCount
    document.querySelectorAll("style").forEach(e => {
        e.innerHTML += `.odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner,
        .odometer.odometer-theme-minimal.odometer-animating-up .odometer-ribbon-inner {
            color: ${config.odometerUpColor} !important;
        }`
    })
    document.querySelectorAll("style").forEach(e => {
        e.innerHTML += `.odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner,
        .odometer.odometer-theme-minimal.odometer-animating-down .odometer-ribbon-inner {
            color: ${config.odometerDownColor} !important;
        }`
    })
    document.querySelectorAll("style").forEach(e => {
        e.innerHTML += `.odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up .odometer-ribbon-inner {
            -webkit-transition: -webkit-transform ${config.odometerSpeed}s;
            -moz-transition: -moz-transform ${config.odometerSpeed}s;
            -ms-transition: -ms-transform ${config.odometerSpeed}s;
            -o-transition: -o-transform ${config.odometerSpeed}s;
            transition: transform ${config.odometerSpeed}s;
          }`
    })
    document.querySelectorAll("style").forEach(e => {
        e.innerHTML += ` .odometer.odometer-auto-theme.odometer-animating-down.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
            -webkit-transition: -webkit-transform ${config.odometerSpeed}s;
            -moz-transition: -moz-transform ${config.odometerSpeed}s;
            -ms-transition: -ms-transform ${config.odometerSpeed}s;
            -o-transition: -o-transform ${config.odometerSpeed}s;
            transition: transform ${config.odometerSpeed}s;
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
            transform: translateY(0);
          }`
    })
    for (let q = 1; q < config.sideCounts + 1; q++) {
        document.getElementById('name_' + q + '').style.color = config.sideCountsColor
        document.getElementById('count_' + q + '').style.color = config.sideCountsColor
    }
    document.body.style.backgroundColor = config.background
    document.getElementById('mainCount').style.backgroundColor = config.backgroundCounter
    chart = new Highcharts.chart({
        chart: {
            renderTo: 'chart',
            type: config.graphType,
            zoomType: 'x',
            backgroundColor: 'transparent',
            plotBorderColor: 'transparent'
        },
        title: {
            text: ' '
        },
        credits: {
            enabled: false,
        }, xAxis: {
            type: 'datetime',
            visible: false
        },
        yAxis: {
            visible: false,
        },
        plotOptions: {
            series: {
                threshold: null,
                fillOpacity: 0.25
            },
            area: {
                fillOpacity: 0.25
            }
        },
        series: [{
            showInLegend: false,
            name: config.bottom,
            marker: { enabled: false },
            color: 'white',
            lineColor: config.graphColor,
            lineWidth: 2,
            data: chart.series[0].userOptions.data
        }]
    });
}

function load3() {
    localStorage.setItem('background', document.getElementById('BColor').value)
    localStorage.setItem('backgroundCounter', document.getElementById('CounterBColor').value)
    localStorage.setItem('mainCount', document.getElementById('MainColor').value)
    localStorage.setItem('sideCounts', document.getElementById('SideColor').value)
    localStorage.setItem('odometerUpColor', document.getElementById('UpColor').value)
    localStorage.setItem('odometerDownColor', document.getElementById('DownColor').value)
    localStorage.setItem('odometerSpeed', document.getElementById('speed').value)
    localStorage.setItem('graphColor', document.getElementById('graphColor').value)
    localStorage.setItem('graphLength', document.getElementById('graphLength').value)
    localStorage.setItem('graphType', document.getElementById('graphType').value)
    config.background = document.getElementById('BColor').value
    config.backgroundCounter = document.getElementById('CounterBColor').value
    config.mainCount = document.getElementById('MainColor').value
    config.sideCountsColor = document.getElementById('SideColor').value
    config.odometerUpColor = document.getElementById('UpColor').value
    config.odometerDownColor = document.getElementById('DownColor').value
    config.odometerSpeed = document.getElementById('speed').value
    config.graphColor = document.getElementById('graphColor').value
    config.graphLength = document.getElementById('graphLength').value
    config.graphType = document.getElementById('graphType').value
    load2()
}

function reset() {
    if (confirm("Are you sure you want to reset these settings? (This will also reset all bookmarks.)") == true) {
        localStorage.clear()
        window.location.href = window.location.href;
    }
}

function set() {
    select.innerHTML = ""
    let array = ["Bookmark 1", "Bookmark 2", "Bookmark 3", "Bookmark 4", "Bookmark 5"];
    let btn = document.createElement("h1");
    select.append(btn);
    btn.innerHTML = "What bookmark would you like to replace?"
    btn.id = "btn33"
    let selectList = document.createElement("select");
    selectList.id = "mySelect";
    select.append(selectList);
    let btn3 = document.createElement("br");
    select.append(btn3);
    let btn2 = document.createElement("button");
    btn2.id = "btn22"
    select.append(btn2);
    btn2.innerHTML = "Submit"
    document.getElementById("btn22").setAttribute("onClick", `  let value = document.getElementById('mySelect').value
    if (value == "Bookmark 1") {
        window.localStorage.setItem('Bookmark 1', document.URL)
    }
    if (value == "Bookmark 2") {
        window.localStorage.setItem('Bookmark 2', document.URL)
    }
    if (value == "Bookmark 3") {
        window.localStorage.setItem('Bookmark 3', document.URL)
    }
    if (value == "Bookmark 4") {
        window.localStorage.setItem('Bookmark 4', document.URL)
    }
    if (value == "Bookmark 5") {
        window.localStorage.setItem('Bookmark 5', document.URL)
    }
  select.innerHTML = ""
  `);
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
    }
}



function search() {
    fetch('https://backend.mgcounts.com/roblox/users/search/' + document.getElementById('search').value + '')
    .then(response => response.json())
    .then(data => {
document.getElementById('name1').title = data.id1
document.getElementById('img1').src = data.img1
document.getElementById('name1').innerHTML = data.name1

document.getElementById('name2').title = data.id2
document.getElementById('img2').src = data.img2
document.getElementById('name2').innerHTML = data.name2

document.getElementById('name3').title = data.id3
document.getElementById('img3').src = data.img3
document.getElementById('name3').innerHTML = data.name3
})
}

fetcher()
setInterval(fetcher, 15000)