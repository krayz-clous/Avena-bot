module.exports = {

    dashboard: {
        enabled: true,
        secret: "TDNGKZ6BGUmCz1pjqO1_24jcCN0spB0y", // Your discord client secret
		baseURL: "http://localhost:8080", // The base URl of the dashboard
		logs: "853324728747819078", // The channel ID of logs
		port: 8080, // Dashboard port
		expressSessionPassword: "Thuongvu1", // Express session password (it can be what you want)
		failureURL: "http://localhost:8080"
    },

    owner: {
		id: "846637454945419264", // The ID of the bot's owner
		name: "rcong#3456" // And the name of the bot's owner
	},

    votes: {
		port: 5000, // The port for the server
		password: "thuongvu1", // The webhook auth that you have defined on discordbots.org
		channel: "854656311643865098" // The ID of the channel that in you want the votes logs
	},

    apiKeys: {
		// BLAGUE.XYZ: https://blague.xyz/
		blagueXYZ: "https://blague.xyz/",
		// FORTNITE TRN: https://fortnitetracker.com/site-api
		fortniteTRN: "d54f8936-5737-42ee-a362-143ad2d78169",
		// FORTNITE FNBR: https://fnbr.co/api/docs
		fortniteFNBR: "c2838e00ed0e79724166cbaa4e1b540b180aa8976f18f381ada54d50b24b64da6e01e7703d6bdabd704366e66659c31fa2025eeaab46c2ccecd64010c8f2baa2",
		// DBL: https://discordbots.org/api/docs#mybots
		dbl: "XXXXXXXXXXX",
		// AMETHYSTE: https://api.amethyste.moe
		amethyste: "cc9aac4459c538fe9f68e87f69f15b3ee36dd2882379b1bc45cf738728fe7e1b4cf45ba50a34c954359fb472695d446bdc42b8911275d5d9418d28547a3a111b",
		// SENTRY: https://sentry.io (this is not required and not recommended - you can delete the field)
		sentryDSN: "https://b242d1e8172541dbb4da1280ca1986f5@o916761.ingest.sentry.io/5858495"
	},
    embed: {
		color: "#f55d05", // The default color for the embeds
		footer: "Avena#0498" // And the default footer for the embeds
	},
}