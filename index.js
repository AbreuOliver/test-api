const express = require("express");
const cors = require("cors");
const { param } = require("express/lib/request");
const axios = require("axios").default;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

const baseUrl = "https://192.75.185.44/VehicleSearch/v1/vehicle-encounters";
const username = "itreapi";
const password = "dCtERX4H9Q2kcvsYEO6R";
const auth =
	"Basic " + Buffer.from(`${username}:${password}`).toString("base64");

const date = new Date();
const todayDate = date.toISOString();
console.log("Today:", todayDate);
let pastDate = new Date(date);
pastDate.setDate(pastDate.getDate() - 14);
console.log("Past Date", pastDate);

let plate;
let state;
let startDateTime;
let endDateTime;

const sessionUrl = `${baseUrl}?plate=${plate}&state${state}=&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;

const config = {
	timeout: 120000,
	port: 443,
	headers: {
		Authorization: auth,
		"Content-Type": "application/json",
		"User-Agent": "PostmanRuntime/7.29.0",
		Accept: "*/*",
		"Cache-Control": "no-cache",
		Host: "192.75.185.44",
		"Accept-Encoding": "gzip, deflate, br",
		Connection: "keep-alive",
	},
};

app.listen(4444, () => {
	console.log(`Running on localhost: 4444`);
});

app.get("/", function (req, res) {
	res.send(`Up and running!`);
});

app.get("/:paramDetails", cors(), async (request, response) => {
	const paramDetails = request.params.paramDetails.split(",");
	const plate = paramDetails[0];
	const state = paramDetails[1];
	const startDateTime = paramDetails[2];
	const endDateTime = paramDetails[3];
	console.log("\n ============== \n Paramters: \n  \n ");
	console.log("Plate: ", plate);
	console.log("State:", state);
	const api_url = `${baseUrl}?plate=${plate}&state=${state}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
	console.log(`\n ============== \n 
				Begin Request
				\n ============== \n `);
	const fetch_response = await axios
		.get(api_url, config)
		.then((response) => {
			console.log("\n Successful response: \n ", response.data);
			return response.data;
		})
		.catch((error) => {
			console.error("\n Error: \n", error);
			return error;
		});
	response.send(fetch_response);
});
