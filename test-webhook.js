const { Webhook } = require("svix");
const fetch = require("node-fetch");

const WEBHOOK_SECRET = "whsec_3e0a1HOLRLp2SYSJ5FRYZ37B+rylOYh5"; // Replace with your CLERK_WEBHOOK_SECRET
const payload = { test: "hello", type: "test.event" }; // Raw object
const wh = new Webhook(WEBHOOK_SECRET);
const headers = wh.sign(payload); // Sign raw payload

fetch("https://www.glenmiracle.site/api/webhooks", {
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: JSON.stringify(payload), // Stringify only for the request body
})
  .then((res) => res.text().then((text) => console.log(res.status, text)))
  .catch((err) => console.error(err));