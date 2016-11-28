var filesystem = require('fs');
var Client = require('node-rest-client').Client;
var client = new Client();
// secrets format: { "customer_id": 1111, "api_key": "string" }
var secrets = require('./secrets.json');
var authtoken = "";
var trait = "BIG5,Satisfaction_Life,Intelligence,Age,Female,Gay,Lesbian,Concentration,Politics,Religion,Relationship";
var uid = 4; //this is Mark Zuckerberg's unique Facebook ID
var args = {
    data: ["18807449704", "215982125159841", "223649167822693", "38246844868", "193081554406", "49799578922", "115384328477363", "90642806830", "321331447886601", "199504240099510", "31732483895", "102099916530784", "10429446003", "1520899351541003", "114752870145", "38508744012", "5878552155", "124955570892789", "38635663260", "489536651069106"],
    headers: {
        "X-Auth-Token": authtoken,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

function getPrediction() {
    client.post("http://api-v2.applymagicsauce.com/like_ids?traits=" + trait + "&uid=" + uid, args, function(data, response) {
        console.log(response.statusCode);
        if (response.statusCode == 403) {
            console.log("Authtoken expired, get new token!");
            getNewToken(getPrediction);
        } else {
            console.log(data);
        }
    });
}


function getNewToken(callback) {
    var getTokenArgs = {
        data: {
            "customer_id": secrets.customer_id,
            "api_key": secrets.api_key
        },
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    client.post("http://api-v2.applymagicsauce.com/auth", getTokenArgs, function(data, response) {
        console.log(data);
        authtoken = data.token;
        console.log("New token: " + authtoken);
        callback(authtoken);
    });
}

// getPrediction(authtoken);
console.log(secrets);
