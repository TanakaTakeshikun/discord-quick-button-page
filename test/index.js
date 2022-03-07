const {Client,Intents} = require('discord.js'),
  client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}),
  discord_page = require("../index.js");
  discord_page.buttonname({next:"次へ",back:"前へ"});
  discord_page.buttonerror({content:"エラーが発生しました",button:"エラー"});
  const button = discord_page.buttonpage({loop:true,content:["1","2","3","4"],id:"HOGE"});

  client
  .on('messageCreate',message => {
  if(message.content == "!page")message.reply({embeds:[{description:button.content}],components:[button.data]});
  })
    .on("interactionCreate",async i=>{
      await i.deferUpdate();
      const getcontent = discord_page.buttonpush({id:"HOGE",interaction:i});
      i.editReply({embeds:[{description:getcontent.content}],components:[getcontent.data]})
    })
  .login(process.env.token);