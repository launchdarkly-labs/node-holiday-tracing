const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const { init } = require("@launchdarkly/node-server-sdk");
const {
  Observability,
  LDObserve,
} = require("@launchdarkly/observability-node");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const client = init(process.env.LAUNCHDARKLY_SDK_KEY, {
  plugins: [
    new Observability({
      serviceName: "expressjs-launchdarkly-starter",
    }),
  ],
});

app.get("/", (req, res) => {
  const { span } = LDObserve.startWithHeaders("homepage.render", req.headers);
  // INSERT_YOUR_CODE
  const user = { key: "anonymous-user" };
  client.waitForInitialization(5).then(() => {
    client
      .variation("show-enterprise-site", user, false)
      .then((showEnterprise) => {
        if (showEnterprise) {
          res.sendFile(path.join(__dirname, "public", "enterprise.html"));
        } else {
          res.sendFile(path.join(__dirname, "public", "student.html"));
        }
      })
      .catch((err) => {
        console.error("Error evaluating LaunchDarkly flag:", err);
        res.status(500).send("Internal server error");
      });
  });
  span.end();
});

const port = 3000;
const server = app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    observability.flush();
    observability.close();
    console.log("Process terminated");
    process.exit(0);
  });
});
