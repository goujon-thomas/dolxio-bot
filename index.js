const Discord = require("discord.js");
const token = require("./token.json");
const fs = require("fs");
const bdd = require("./bdd.json");
const fetch = require('node-fetch');
const queue = new Map();
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const PREFIX = "!";


bot.on("ready", async () => {
    
    console.log("Le bot est allumé")
    bot.user.setStatus("online");
    bot.user.setActivity("L'amour de Dolce et Foxio", {type: "WATCHING"})
    })



function doKissAction() {
    var rand = [
        'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
        'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
        'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
        'https://media.giphy.com/media/jR22gdcPiOLaE/giphy.gif',
        'https://media.giphy.com/media/wOtkVwroA6yzK/giphy.gif',
        'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
        'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
        'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
        'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif',
        'https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif',
        'https://media.giphy.com/media/Ka2NAhphLdqXC/giphy.gif',
        'https://media.giphy.com/media/Gj8bn4pgTocog/giphy.gif',
        'https://media.giphy.com/media/w9xag7QUzLgLC/giphy.gif',
        'https://media.giphy.com/media/H8XZI3PJm258c/giphy.gif',
        'https://media.giphy.com/media/U9lRsXbwlbL4k/source.gif'
    ]
    return rand[Math.floor(Math.random() * rand.length)];
};

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
                   case 'kiss':
                const personTagged = message.mentions.members.first();
 
                if(!args[1]) {
                    message.channel.send('Tu as oublié de ping une personne !')
                }else{
                    message.channel.send('`' + message.author.username + '`' + ' a embrassé ' + personTagged.displayName + ' ' + doKissAction())
                }
 
            break;
 
   }
})

module.exports = {
    name: "love",
    aliases: ["affinity"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    usage: "[mention | id | username]",
    run: async (client, message, args) => {
        // Get a member from mention, id, or username
        let person = getMember(message, args[0]);

        // If no person is found
        // It's going to default to the author
        // And we don't want to love ourself in this command
        // So we filter out our ID from the server members
        // And get a random person from that collection
        if (!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        // love is the percentage
        // loveIndex is a number from 0 to 10, based on that love variable
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.displayName}** loves **${message.member.displayName}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }
}
bot.login(token.token);