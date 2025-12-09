## ❄️ Tracing the impact of holiday styling in your Node.js app, LaunchDarkly style

Example [Express](https://expressjs.com/) app that can be integrated with [LaunchDarkly's Node.js Observability SDK](https://launchdarkly.com/docs/sdk/observability/node-js)).

### How to get started:

clone this repo on to your local machine:

`git clone https://github.com/launchdarkly-labs/node-holiday-tracing

Log in to your [LaunchDarkly](https://launchdarkly.com/) account (or [sign up for a free one here](https://launchdarkly.com/).) Copy your SDK key. Paste the key into the `.env.example` file. Rename `.env.example` file to .env

With this setup, the LaunchDarkly SDK can access the credentials locally but you won’t accidentally commit them to source control and compromise your security.

Install dependencies using the following command:

`npm install`

Run the server:

`npm start`

If you load http://127.0.0.1:3000/ in the browser, you should see a starter page. 

Follow along with the rest of the tutorial: https://docs.launchdarkly.com/tutorials/observability-holiday-tracing

## License

[[Apache 2.0](https://choosealicense.com/licenses/mit/](https://www.apache.org/licenses/LICENSE-2.0 )
