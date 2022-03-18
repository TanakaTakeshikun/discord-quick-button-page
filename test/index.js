const {Client,Intents} = require('discord.js'),
  client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}),
  discord_page = require("./mod.js");
  discord_page.buttonname({next:"次へ",back:"前へ"});
  discord_page.buttonerror({content:"エラーが発生しました",button:"エラー"});
  const button = discord_page.buttonpage({loop:true,content:["1","2","3","4"],id:"HOGE",customid:{next:"hogenext",back:"hogeback"}});

  client
  .on('messageCreate',message => {
  if(message.content == "!page")message.reply({embeds:[{description:button.content}],components:[button.data]});
  })
    .on("interactionCreate",async i=>{
      if(i.customId.startsWith("hogenext")){
      await i.deferUpdate();
      const getbtn = discord_page.buttonpush({id:"HOGE",interaction:i});
      if(getbtn) i.editReply({embeds:[{description:getbtn.content}],components:[getbtn.data]});
      }
      if(i.customId.startsWith("hogeback")){
      await i.deferUpdate();
      const getbtn = discord_page.buttonpush({id:"HOGE",interaction:i});
      if(getbtn) i.editReply({embeds:[{description:getbtn.content}],components:[getbtn.data]});
      }
    })
  .login(process.env.token);