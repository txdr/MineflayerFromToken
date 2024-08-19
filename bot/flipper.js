const mineflayer = require("mineflayer");
const { v4: uuidv4 } = require("uuid");
const {Authflow:PrismarineAuth} = require("prismarine-auth");
const axios = require('axios');

function fetchUsernameFromMinecraftWebsite(ssid) {
    return axios
        .get('https://api.minecraftservices.com/minecraft/profile', {
            headers: {
                Authorization: 'Bearer ' + ssid,
            },
        })
        .then((response) => response.data)
        .catch(() => {

        });
}

class Flipper {

    /**
     * Multiple instances of this class can be opened in order to
     * achieve quicker and less detectable sniping.
     *
     * @param username
     * @param token
     */
    constructor(username, token) {
        (async () => {
            this.init(username, token);
        })();
    }

    async init(u, t) {
        const {name, id } = await fetchUsernameFromMinecraftWebsite(t);
        const uid = uuidv4();
        this.bot = mineflayer.createBot({
            host: "play.minecadia.com",
            username: name,
            auth: "mojang",
            skipValidation: true,
            session: {
                accessToken: t,
                clientToken: id,
                selectedProfile: {
                    id: id,
                    name: name
                }
            }
        });
        this.bot.on("spawn", () => {
            console.log("woah")
        });
    }



}

module.exports = Flipper;