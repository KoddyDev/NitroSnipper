const { Client } = require('discord.js');

const fetch = require('superagent')

const { yourFakeAccountToken, yourToken } = require('./config.json');

const client = new Client({
    _tokenType: ''
});

client.on("message", async (message) => {
    if(!message.content.includes("discord.gift/")) return;
    const code = message.content.slice(message.content.split("discord.gift/")[0].length).trim().split(/ +/)[0].split('/')[1]
    console.log(code);

    fetch.post(`https://discord.com/api/v6/entitlements/gift-codes/${code}/redeem`).set("Authorization", yourToken).end((err, f) => {
        if(f.body.code) {
            if(f.body.code === 50050) return console.log(code + ' ja foi utilizado.');
            if(f.body.code === 10038) return console.log(code + ' é inexistente');
        }  
    })

})

client.on("ready", () => console.log("a"))


client.login(yourFakeAccountToken)