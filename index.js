//createbyBURI
let buttonname,
error,
content = [],
loop = [];
const buttonfunc = (nextid,backid) => {
  return buttonobj({nextid:`BURInext${nextid}`,nextlabel:buttonname?.next||"next",backid:`BURIback${backid}`,backlabel:buttonname?.back||"back"})
};
  errorbutton = ()=>{
    return buttonobj({errorlabel:error.button||"NOTINFO"})
  },
  buttonobj = button =>{
    if(button.errorlabel){
     return {
      components: [
        {
          custom_id: 'BURINOTCONTENTLOAD',
          disabled: false,
          emoji: null,
          label: button.errorlabel,
          style: 4,
          type: 2,
          url: null
        }
      ],
      type: 1
    }
    }else{
      return {
        components: [
          {
            custom_id:button.backid,
            disabled: false,
            emoji: null,
            label: button.backlabel,
            style: 1,
            type: 2,
            url: null
          },
          {
            custom_id: button.nextid,
            disabled: false,
            emoji: null,
            label: button.nextlabel,
            style: 1,
            type: 2,
            url: null
          }
        ],
        type: 1
      };
    }
  }
module.exports = {
    buttonerror: e => error = e,
    buttonname: b=>buttonname=b,
    buttonpage: a =>{
      if(!a.id) throw new Error('dont know id');
    content[a.id] = a.content||["notcontent"];
    loop[a.id] = a.loop||false;
    const buttondata = buttonfunc(1,(loop[a.id])?content[a.id].length-1:0)
      return {content:content[a.id][0],data:buttondata,page:1};
    },
    buttonpush:obj=>{
      if(!obj.interaction?.customId)return;
      if(!content[obj.id])return{content:error?.content||"notcontent",data:errorbutton()};
      const id = obj.interaction.customId.replace(/[^0-9]/g, ''),
       number = Number(id);
      if(obj.interaction.customId.startsWith("BURInext")){
       const buttondata = buttonfunc((number+1>=content[obj.id].length)?(loop[obj.id])?0:number:number+1,number-1);
       return {content:content[obj.id][number],data:buttondata,page:number+1};
      }
      if(obj.interaction.customId.startsWith("BURIback")){
        const buttondata = buttonfunc((content[obj.id].length-1==number)?0:number+1,(number-1<0)?(loop[obj.id])?content[obj.id].length-1:0:number-1);
        return {content:content[obj.id][number],data:buttondata,page:number+1};
       }
       if(obj.interaction.customId.startsWith("BURINOTCONTENTLOAD"))return{content:error?.content||"notcontent",data:errorbutton()};
    }
  };