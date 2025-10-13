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

app.use(serveStatic(path.join(__dirname, "public")));

const client = init(process.env.LAUNCHDARKLY_SDK_KEY, {
  plugins: [
    new Observability({
      serviceName: "expressjs-launchdarkly-starter",
    }),
  ],
});

app.get("/", (req, res) => {
  const { span } = LDObserve.startWithHeaders("homepage.render", req.headers);

  res.send("Hello World!");
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
