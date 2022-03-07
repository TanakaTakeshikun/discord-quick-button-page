# discord-quick-button-page
このモジュールはDiscord.jsv13で動作を確認しています
(v12,v11はできません)
v14は未確認

# sample

```js
const {Client,Intents} = require('discord.js'),
  client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}),
  discord_page = require("discord-quick-button-page");
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
  .login("YOURTOKEN");
```

# buttonpage
```js
buttonpage({loop:true,content:["1","2","3","4"],id:"HOGE"});
```
`loop:(boolean)`
loopするかどうかです
書かない場合はfalseになります

`content:arr`
表示するコンテンツを決めます
右から左へページが流れていきます

`id:好きなID`
複数登録する場合IDを変えて使います
書かない場合はエラーが出ます

返り値はcontentが登録した情報のcontentの0番目でdataがボタンの情報です(エラーの場合は登録したエラー又は初期設定のエラーが表示されます)
# buttonpush
```js
buttonpush({id:"HOGE",interaction:取得したinteraction})
```
`id:好きなID`
setした時と同じIDを使ってください
一致しない場合エラーボタンに切り替わります

`interaction:取得したintaraction`
interactionCreateイベントで取得した情報を入れてください

# buttonname
ボタンの名前が決めれます
決めない場合はnextとbackです

返り値はcontentが登録した情報のcontentの0番目でdataがボタンの情報です(エラーの場合は登録したエラー又は初期設定のエラーが表示されます)
# buttonerror
```js
buttonerror({content:"エラーが発生しました",button:"エラー"})
```
IDが一致しない場合に出します
初期設定はcontent:notcontent,button:NOTINFOです


