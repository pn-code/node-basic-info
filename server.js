const http = require("http");
const path = require("path");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    // Create File Path
    const filePath =
        req.url === "/"
            ? path.join(__dirname, "public", "index.html")
            : path.join(__dirname, "public", `${req.url}.html`);

    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, data) => {
                        if (err) throw err;
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.end(data);
                    }
                );
            } else {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end(`Server error: ${err}.`);
            }
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
