const { clear } = require("console");

const Store = require("electron-store"),
    { connect, updateActivity, clearActivity } = require("../managers/discord.js"),
    config = new Store({}),
    appData = new Store({name: "data"}),
    http = require("http");

const requestListener = function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.writeHead(200);
        res.end("req", req);

        if (req.headers["ame-track"]) {
            console.log("[AME Server] Received data");

            const track = JSON.parse(req.headers["ame-track"]);

            if (track.type === "paused") clearActivity();
            else if (track.type === "playing") {
                updateActivity(track.type, {
                    name: track.name,
                    artist: track.artist,
                    album: track.album,
                    duration: track.duration,
                    endTime: track.endTime
                }, "ame");
            }
        }
    },
    server = http.createServer(requestListener);

server.listen(941, "localhost", () => {
    console.log("[AME Server] Listening on port 941");
});