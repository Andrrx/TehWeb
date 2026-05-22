const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || process.argv[2] || 8080);
const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
    ".webmanifest": "application/manifest+json",
    ".xml": "application/xml",
    ".svg": "image/svg+xml",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
};

http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") {
        urlPath = "/index.html";
    }

    const filePath = path.join(root, urlPath);
    if (!filePath.startsWith(root)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream"
        });
        res.end(data);
    });
}).listen(port, "127.0.0.1", () => {
    console.log(`BBallStore static server: http://localhost:${port}`);
});
