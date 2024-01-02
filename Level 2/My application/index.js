const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

const port = args.port;

let homeContent = "";
let projectContent = "";
let registerContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) throw err;
  homeContent = home;
});

fs.readFile("projects.html", (err, projects) => {
  if (err) throw err;
  projectContent = projects;
});

fs.readFile("registration.html", (err, reg) => {
  if (err) throw err;
  registerContent = reg;
});

http
  .createServer((req, res) => {
    let url = req.url;
    res.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/projects":
        res.write(projectContent);
        res.end();
        break;
      case "/registration":
        res.write(registerContent);
        res.end();
        break;
      default:
        res.write(homeContent);
        res.end();
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server Listening to the port ${port}`);
  });
