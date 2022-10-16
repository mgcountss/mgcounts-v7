const axios = require('axios').default;

function add(path, userid) {
    if (path == "youtube/est") {
        return new Promise(resolve => {
            axios.get("http://localhost:8080/api/" + path + "/" + userid + "")
                .then(function (response) {
                        axios.get("http://localhost:8080/api/youtube/user/" + userid + "")
                            .then(function (response2) {
                                resolve({
                                    "success": true,
                                    "id": response2.data.id,
                                    "stats": response.data.stats,
                                    "misc": response2.data.misc,
                                    "image": "round",
                                });
                            }).catch(function (error) {
                                resolve(error.response.data);
                            })
                }).catch(function (error) {
                    resolve(error.response.data);
                })
        });
//    } else if (path == "youtube/live") {

    } else {
        return new Promise(resolve => {
            axios.get("http://localhost:8080/api/" + path + "/" + userid + "")
                .then(function (response) {
                    resolve(response.data);
                }).catch(function (error) {
                    resolve(error.response.data);
                })
        });
    }
};

module.exports = add;