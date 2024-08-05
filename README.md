# 🤖 Discord Bot v14 Template (discord.js)

## Requirements
1. Discord Bot Application within Discord Developers portal.
   - Follow this guide [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
2. Node - Version 20.

## How to use
```
git clone https://github.com/Renoks-Dev/Discord_Bot_v14_Template
cd Discord_Bot_v14_Template
npm install
npm start
```

### Development Mode
Use `npm run dev` to have nodemon restart the discord bot application for you, whenever you save a file.

## Configurations
Copy and rename `.env-example` to `.env` and fill out the values of your Discord Bot Application from the Discord Developers Portal.

> [!WARNING]
> Never commit or share your values in `.env` with anyone that you don't trust or don't work with on the same bot.

> [!TIP]
> **GUILD_ID** is optional. Currently it's only used for deploying commands to a specific Guild. You can leave it empty if you're not going to be deploying commands to a specific Guild.

```
{
  TOKEN=
  CLIENT_ID=
  GUILD_ID=
}
```

## Commands

### Fun
1. `/flip`
   - Flips a coin.
2. `/roll`
   - Roll a dice.

### Information
1. `/avatar`
   - Display your avatar or another user's avatar.
2. `/serverinfo`
   - Display some of the server's information.
3. `/userinfo`
   - Display some user information about your account or another user's account.

### Utility
1. `/ping`
   - Bot replies with pong!

## Deployment
You can deploy your slash commands globally or to a specific guild.

### Deploy Slash Commands Globally
- Run `node deploy-commands-global.js`.
- After it is finished, the commands should be updated in all guilds the bot is in.

### Deploy Slash Commands to a Specific Guild
- Fill in your **GUILD_ID** in `.env` file.
- Run `node deploy-commands-guild.js`.
- After it is finished, the commands should be updated in all guilds the bot is in.
