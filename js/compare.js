let config = {
    "name": "Compare",
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
function load() {
    document.title = config.name
    document.body.style.backgroundColor = config.background
    document.getElementById('mainCount').style.backgroundColor = config.backgroundCounter
    document.getElementById('mainCount2').style.backgroundColor = config.backgroundCounter
    load2()
    
}

function embed() {
    window.open(document.getElementById('embed').value)
}

function random(min, max) {
    return Math.random(min, max) * 1000
}

let url1 = document.URL.split('?')[1].split('&')[0].replace('=', '/')
let url2 = document.URL.split('&')[1].replace('=', '/')
if (url1 == "/mrbeast/teamseas/true") {
    url1 = "mrbeast/teamseas"
}
if (url2 == "/mrbeast/teamseas/true") {
    ur2 = "mrbeast/teamseas"
}
if (url1 == "/mrbeast/teamtrees/true") {
    url1 = "mrbeast/teamtrees"
}
if (url2 == "/mrbeast/teamtrees/true") {
    url2 = "mrbeast/teamtrees"
}
if (url1 == "changeorg/changeorg") {
    url1 = "changeorg/"
}
if (url2 == "changeorg/changeorg") {
    url2 = "changeorg/"
}
let lastest = 0;
function fetcher() {
    fetch('https://backend.mgcounts.com/' + url1 + '')
        .then(response => response.json())
        .then(data => {
            document.getElementById('count').innerHTML = data.main
            lastest = parseFloat(data.main)
            document.getElementById('name').innerHTML = data.name
            document.getElementById('img').src = data.image
            if (chart.series[0].points.length == config.graphLength) chart.series[0].data[0].remove();
            chart.series[0].addPoint([Date.now(), Math.floor(data.main)])
            if (data.banner.bannerExternalUrl) {
                document.getElementById('banner').src = data.banner.bannerExternalUrl
            } else if (data.banner == ""){
                document.getElementById('banner').src = data.image
            } else {
                document.getElementById('banner').src = data.banner
            }

            fetch('https://backend.mgcounts.com/' + url2 + '')
                .then(response => response.json())
                .then(data2 => {
                    document.getElementById('count2').innerHTML = data2.main
                    lastest = parseFloat(data2.main)
                    document.getElementById('name2').innerHTML = data2.name
                    document.getElementById('img2').src = data2.image
                    if (chart2.series[0].points.length == config.graphLength) chart2.series[0].data[0].remove();
                    chart2.series[0].addPoint([Date.now(), Math.floor(data2.main)])
                    if (data2.banner.bannerExternalUrl) {
                        document.getElementById('banner2').src = data2.banner.bannerExternalUrl
                    } else if (data2.banner == ""){
                        document.getElementById('banner2').src = data2.image
                    } else {
                        document.getElementById('banner2').src = data2.banner
                    }
                    document.getElementById('difference').innerHTML = Math.floor(parseFloat(data.main) - parseFloat(data2.main))
                });
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
let chart2 = new Highcharts.chart({
    chart: {
        renderTo: 'chart2',
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
    document.getElementById('count2').style.color = config.mainCount
    document.getElementById('name2').style.color = config.mainCount
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
    document.body.style.backgroundColor = config.background
    document.getElementById('mainCount').style.backgroundColor = config.backgroundCounter
    document.getElementById('mainCount2').style.backgroundColor = config.backgroundCounter
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

    chart2 = new Highcharts.chart({
        chart: {
            renderTo: 'chart2',
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
            data: chart2.series[0].userOptions.data
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

fetcher()
setInterval(fetcher, 2000)