const { MessageActionRow, MessageButton } = require('discord.js');
let buttonname,
error,
content = [],
loop = [];
const buttonfunc = (nextid,backid) =>{
  const data = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId(`BURIback${backid}`)
      .setLabel(buttonname?.back||"back")
      .setStyle('PRIMARY')
  )
  .addComponents(
    new MessageButton()
      .setCustomId(`BURInext${nextid}`)
      .setLabel(buttonname?.next||"next")
      .setStyle('PRIMARY')
  );
  return data;
},
  errorbutton = ()=>{
    const data = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId(`BURINOTCONTENTLOAD`)
      .setLabel(error.button||"NOTINFO")
      .setStyle('DANGER')
  );
    return data
  }
module.exports = {
    buttonerror: e => error = e,
    buttonname: b=>buttonname=b,
    buttonpage: a =>{
      if(!a.id) throw new Error('dont know id');
    content[a.id] = a.content||["notcontent"];
    loop[a.id] = a.loop||false;
    const buttondata = buttonfunc(1,(loop[a.id])?content[a.id].length-1:0)
      return {content:content[a.id][0],data:buttondata};
    },
    buttonpush:obj=>{
      if(!obj.interaction?.customId)return;
      if(!content[obj.id])return{content:error?.content||"notcontent",data:errorbutton()};
      const id = obj.interaction.customId.replace(/[^0-9]/g, ''),
       number = Number(id);
      if(obj.interaction.customId.startsWith("BURInext")){
       const buttondata = buttonfunc((number+1>=content[obj.id].length)?(loop[obj.id])?0:number:number+1,number-1);
       return {content:content[obj.id][number],data:buttondata};
      }
      if(obj.interaction.customId.startsWith("BURIback")){
        const buttondata = buttonfunc((content[obj.id].length-1==number)?0:number+1,(number-1<0)?(loop[obj.id])?content[obj.id].length-1:0:number-1);
        return {content:content[obj.id][number],data:buttondata};
       }
       if(obj.interaction.customId.startsWith("BURINOTCONTENTLOAD"))return{content:error?.content||"notcontent",data:errorbutton()};
    }
  };