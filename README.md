# 🤖 Discord Bot v14 Template (discord.js)

## Requirements
1. Discord Bot Application within Discord Developers portal.
   - Follow this guide [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

## How to use
```
git clone https://github.com/Renoks-Dev/Discord_Bot_v14_Template
cd Discord_Bot_v14_Template
npm install
node index.js
```

## Configurations
Copy and rename `.env-example` to `.env` and fill out the values of your Discord Bot Application from the Discord Developers Portal.

> [!WARNING]
> Never commit or share your values in `.env` with anyone that you don't trust or don't work with on the same bot.

```
{
  TOKEN=
  CLIENT_ID=
  GUILD_ID= (optional)
}
```

## Commands
```
/ping
```
> Bot replies with pong!

## Deployment
You can deploy your slash commands globally or to a specific guild.

### Deploy Slash Commands Globally
- Run `node deploy-commands-global.js`.
- After it is finished, the commands should be updated in all guilds the bot is in.

### Deploy Slash Commands to a specific Guild
- Fill in your **GUILD_ID** in `.env` file.
- Run `node deploy-commands-guild.js`.
- After it is finished, the commands should be updated in all guilds the bot is in.
