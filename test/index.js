const {Client,Intents} = require('discord.js'),
  client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}),
  discord_page = require("./mod.js");
  discord_page.buttonerror({content:"エラーが発生しました",button:"エラー"});
  const button = discord_page.buttonpage({loop:true,content:["1","2","3","4"],id:"HOGE",customid:{next:"hogenext",back:"hogeback"}});
  const button2 = discord_page.buttonpage({content:["a","b","c","d"],id:"test",customid:{next:"testnext",back:"testback"},name:{next:"次へ",back:"前へ"}});
  client
  .on('messageCreate',message => {
  if(message.content == "!page")message.reply({embeds:[{description:button.content}],components:[button.data]});
    if(message.content=="!page2")message.reply({embeds:[{description:button2.content}],components:[button2.data]});
  })
    .on("interactionCreate",async i=>{
      if(i.customId.startsWith("hoge")){
      await i.deferUpdate();
      const getbtn = discord_page.buttonpush({id:"HOGE",interaction:i});
       i.editReply({embeds:[{description:getbtn.content}],components:[getbtn.data]});
      }
      if(i.customId.startsWith("test")){
       await i.deferUpdate();
      const getbtn = discord_page.buttonpush({id:"test",interaction:i});
       i.editReply({embeds:[{description:getbtn.content+getbtn.page}],components:[getbtn.data]});
      }
    })
  .login(process.env.token);