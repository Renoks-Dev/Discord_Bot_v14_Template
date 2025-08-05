# 🤖 Discord Bot v14 Template (discord.js)

A modern, well-structured Discord.js v14 bot template with slash commands, comprehensive logging, and a clean architecture. This template provides a solid foundation for building feature-rich Discord bots with proper error handling, logging, and development tools.

## ✨ Features

- **Modern Discord.js v14** - Latest Discord.js with all new features
- **Slash Commands** - Full slash command support with proper structure
- **Comprehensive Logging** - Winston-based logging with multiple levels and file output
- **Error Handling** - Robust error handling and graceful shutdown
- **Development Tools** - ESLint, Prettier, and Nodemon for development
- **Modular Architecture** - Clean, organized code structure
- **Environment Configuration** - Flexible environment-based configuration
- **Command Categories** - Organized commands by category (fun, utility, info, design)

## 📋 Requirements

- **Node.js** - Version 20 or higher
- **Discord Bot Application** - Created in the [Discord Developer Portal](https://discord.dev)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/Renoks-Dev/Discord_Bot_v14_Template
cd Discord_Bot_v14_Template
npm install
```

### 2. Configure Environment
Copy `.env-example` to `.env` and fill in your bot credentials:

```env
# Bot Configuration
TOKEN=
CLIENT_ID=
GUILD_ID=

# Environment
NODE_ENV=development

# Logging
LOG_LEVEL=info
```

> ⚠️ **Security Warning**: Never commit your `.env` file or share your bot tokens with anyone.

### 3. Deploy Commands
Choose one of the following deployment methods:

**Global Deployment** (recommended for production):
```bash
npm run deploy-commands-global
```

**Guild Deployment** (faster for development):
```bash
npm run deploy-commands-guild
```

### 4. Start the Bot
```bash
npm start
```

## 🛠️ Development

### Development Mode
Use nodemon for automatic restarts during development:
```bash
npm run dev
```

### Code Quality Tools
```bash
# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run prettier
npm run prettier:fix
```

## 📁 Project Structure

```
src/
├── commands/           # Slash commands organized by category
│   ├── design/        # Design-related commands
│   ├── fun/           # Fun and entertainment commands
│   ├── info/          # Information commands
│   └── utility/       # Utility commands
├── config/            # Configuration files
├── events/            # Discord event handlers
├── utils/             # Utility functions and helpers
├── deploy-commands-global.js
├── deploy-commands-guild.js
└── index.js           # Main bot entry point
```

## 🎮 Available Commands

### 🎨 Design Commands
- **`/randomcolor`** - Generates a random color in HEX, RGB, and HSL formats

### 🎲 Fun Commands
- **`/flip`** - Flips a coin (heads/tails)
- **`/roll`** - Roll custom dice with specified sides and quantity

### ℹ️ Information Commands
- **`/avatar`** - Display user avatars with high-quality images
- **`/serverinfo`** - Show detailed server information
- **`/userinfo`** - Display comprehensive user information

### ⚙️ Utility Commands
- **`/ping`** - Check bot latency, uptime, and connection status
- **`/help`** - Display available commands and usage information

## 🔧 Configuration

### Environment Variables

| Variable    | Required | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| `TOKEN`     | ✅        | Your Discord bot token                         |
| `CLIENT_ID` | ✅        | Your Discord application client ID             |
| `GUILD_ID`  | ❌        | Guild ID for guild-specific command deployment |
| `NODE_ENV`  | ❌        | Environment (development/production)           |
| `LOG_LEVEL` | ❌        | Logging level (error, warn, info, debug)       |

### Logging

The bot uses Winston for comprehensive logging with the following features:
- **Console Output** - Colored, formatted logs for development
- **File Logging** - Separate log files for different levels
- **Error Tracking** - Detailed error logging with stack traces
- **Performance Monitoring** - Uptime and memory usage tracking

Log files are stored in the `logs/` directory:
- `error.log` - Error-level messages
- `warn.log` - Warning-level messages  
- `debug.log` - Debug-level messages
- `combined.log` - All log messages

### Production Considerations

1. **Environment Variables**: Set `NODE_ENV=production`
2. **Logging**: Adjust `LOG_LEVEL` as needed
3. **Process Management**: Use PM2 or similar for production
4. **Security**: Ensure `.env` is not committed to version control

## 🛡️ Security Features

- **Environment Variable Validation** - Required variables are checked on startup
- **Error Boundaries** - Graceful handling of unhandled exceptions
- **Graceful Shutdown** - Proper cleanup on SIGINT/SIGTERM
- **Ephemeral Responses** - Sensitive commands use ephemeral replies
- **Input Validation** - Command options are properly validated

## 📊 Bot Features

- **Real-time Latency Monitoring** - Live ping and connection status
- **Uptime Tracking** - Detailed uptime information
- **Server Statistics** - Guild and user count tracking
- **Memory Usage Monitoring** - Resource usage tracking
- **Comprehensive Error Logging** - Detailed error reporting







---

**Created by Renoks**
