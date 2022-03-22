# discord-quick-button-page

このモジュールはDiscord.jsv13,14で動作を確認しています

(v12,v11はできません)


# sample
```js
const {Client,Intents} = require('discord.js'),
  client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}),
  discord_page = require("discord-quick-button-page"),
  jsondata={
    custom_id:"hage",
    disabled: true,
    label: "捨てる",
    style: 1,
    type: 2,
  };
  discord_page.buttonerror({content:"エラーが発生しました",button:"エラー"});
  const button = discord_page.buttonpage({loop:true,content:["1","2","3","4"],id:"HOGE",customid:{next:"hogenext",back:"hogeback"}});
  const button2 = discord_page.buttonpage({content:["a","b","c","d"],id:"test",customid:{next:"testnext",back:"testback"},name:{next:"次へ",back:"前へ"},json:jsondata});
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
      const getbtn = discord_page.buttonpush({id:"test",interaction:i,json:jsondata});
       i.editReply({embeds:[{description:getbtn.content+getbtn.page}],components:[getbtn.data]});
      }
    })
  .login("YOURTOKEN");
```

# sample(簡易)
```js
const {Client,Intents} = require('discord.js'),
  client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]}),
  discord_page = require("discord-quick-button-page"),
  button = discord_page.buttonpage({content:["1","2","3","4"],id:"HOGE"});
  client
  .on('messageCreate',message => {
  if(message.content == "!page")message.reply({content:button.content,components:[button.data]});
  })
    .on("interactionCreate",async i=>{
      await i.deferUpdate();
      const getbtn = discord_page.buttonpush({id:"HOGE",interaction:i});
     if(getbtn) i.editReply({content:getbtn.content,components:[getbtn.data]});
    })
  .login("YOURTOKEN");
```
# buttonpage
```js
.buttonpage({loop:true,content:["1","2","3","4"],id:"HOGE",customid:{next:"hogenext",back:"hogeback"},name:{next:"nextpage",back:"backpage"},json:{custom_id:"hage",label:"hoge",style: 1,type:2}});
```


`loop:boolean`


loopするかどうかです


書かない場合はfalseになります


`content:arr`


表示するコンテンツを決めます


右から左へページが流れていきます


`id:String`


複数登録する場合IDを変えて使います


書かない場合はエラーが出ます

**customid**

`next:String`

customId(進むボタン)の設定ができます(しない場合はBURInext)

`back:String`

customId(戻るボタン)の設定ができます(しない場合はBURIback)

**name**

ボタンの名前が決められます

`next:String`

`back:String`

初期はnextとbackです

**高度な設定**

`json:discord.js-jsonobj(components[ここの内容])`

オリジナルのボタンを追加するときに設定します

componentsのなかのjsonを入れてください(自動でpushします)

データ型を見るにはまずDiscord.jsで普通にボタンを作成します

作成したクラス.toJSON()でデータが得られます

記入しない場合は何も起こりません

間違えている場合はDiscord.js側でエラーが出ます

(エラーの場合は登録したエラー又は初期設定のエラーが表示されます)

**返り値**

**content**
配列の次のページ数のコンテンツを返します

**data**
ボタンのJSON型のデータを返します

**page**
現在のページ数を返します

# buttonpush
```js
.buttonpush({id:"HOGE",interaction:取得したinteraction})
```

`id:String`


setした時と同じIDを使ってください


一致しない場合エラーボタンに切り替わります


`interaction:interaction-obj`


interactionCreateイベントで取得した情報を入れてください


返り値はcontentが登録した情報のcontentの0番目でdataがボタンの情報です

(エラーの場合は登録したエラー又は初期設定のエラーが表示されます)
**返り値**

**content**
配列の次のページ数のコンテンツを返します

**data**
ボタンのJSON型のデータを返します

**page**
現在のページ数を返します

# buttonname
```js
.buttonname({next:"次へ",back:"前へ"});
```


`next:String,back:String`


ボタンの名前が決めれます


初期設定は`next:next,back:back`です


未設定可

**返り値**

なし

# buttonerror
```js
.buttonerror({content:"エラーが発生しました",button:"エラー"})
```


`content:String,button:String`


IDが一致しない場合に出します


初期設定は`content:notcontent,button:NOTINFO`です


未設定可

**返り値**

なし
```js
.buttoncustomid({next:"hogenext",back:"hogeback"});
```

customIDを決めれます

**注意**

customIDは指定のcustomID+現在のページ番号です

初期はBURInextorback+ページ番号

これの活用方法はcustomIDを指定していちいち関数を呼ばないことで処理の軽減を図れます


