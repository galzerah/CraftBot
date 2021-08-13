const Discord = require('discord.js');

exports.run = async (client, message, args, guild) => {
  connection = await require('../Data/db')
    message.delete();


    let canal = message.mentions.channels.first()
    if(!canal) return message.reply("O Canal nao existe");

    if (!(message.member.hasPermission('ADMINISTRATOR'))) {
        return await message.channel.send('<:errado:739528758456877146> Comando restrito para os **Administradores**').then(msg => msg.delete({ timeout: 5000}));;
      };
// COMANDO ---------------------

        if (canal) {
          try{
            await connection.query(
            `UPDATE guildconfig SET logs = '${canal.id}' WHERE guildId = '${message.guild.id}'`
            )
            let embed = new Discord.MessageEmbed()

            .setColor("RANDOM")
            .setTitle(`${message.author.username}`) 
            .setDescription(`**Canal de logs foi setado com sucesso! <a:verify:687759351330766901> \n \n  O canal setado como: **\n${canal}`)
                .setFooter("Atenciosamente " + message.guild.name , client.user.avatarURL)
                .setTimestamp();
                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000}));;
          } catch (err) {
            console.log(err)
          }
      }
    }
