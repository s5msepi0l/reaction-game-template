const express = require("express");
const cookie_parser = require("cookie-parser");
var fs = require("fs");

const server = express();

const port = 4444;

server.use(cookie_parser());
server.use(express.urlencoded());
server.use(express.json());
server.use(express.static("client"));
server.listen(port);
// load stats.json into memory, sort it by fastest time then send to user
server.get("/fetch_stats", (req, res) => {
    let data = JSON.parse(fs.readFileSync("stats.json"));

    data.stats.sort((a,b) => {
        return a.reaction_time - b.reaction_time;
    });

    Array
    console.log(data.stats);
    /*
    var i, j, min_idx;

    for (i = 0; i < data.stats.length-1; i++) {
        min_idx = i;
        for (j = i + 1; j < data.stats.length; j++)
        if (data.stats[j].reaction_time < data.stats[min_idx].reacion_time)
            min_idx = j;
        let temp = data.stats[min_idx].reacion_time;
        data.stats[min_idx].reacion_time = data.stats[i].reaction;
        data.stats[i].reacion_time = temp;
    }
*/
    res.json(data);
});

server.post("/post_stats", (req, res) => {
    let user_data = req.body;
    let server_data = JSON.parse(fs.readFileSync("stats.json"));
    console.log(user_data);
    server_data.stats.push({
        username: user_data.username,
        reaction_time: user_data.reacion_time
    })

    fs.writeFileSync("stats.json", JSON.stringify(server_data));
});