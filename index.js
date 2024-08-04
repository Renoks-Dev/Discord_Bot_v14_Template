import dotenv from "dotenv";
import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Client, Collection, GatewayIntentBits } from "discord.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

(async () => {
  const commandsFolderPath = join(__dirname, "commands");
  const commandFolders = readdirSync(commandsFolderPath);

  for (const folder of commandFolders) {
    const commandsPath = join(commandsFolderPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const fileUrl = pathToFileURL(filePath).href;
      const command = await import(fileUrl);

      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  const eventsPath = join(__dirname, "events");
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const fileUrl = pathToFileURL(filePath).href;
    const event = await import(fileUrl);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  client.login(process.env.TOKEN);
})();
