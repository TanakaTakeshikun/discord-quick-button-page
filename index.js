//createbyBURI
let error,
 data=[];
const buttonfunc = (nextid,backid,obj,name,json) => {
  return buttonobj({nextid:`${obj.next}${nextid}`,nextlabel:name.next,backid:`${obj.back}${backid}`,backlabel:name.back,json:json})
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
          disabled: true,
          label: button.errorlabel,
          style: 4,
          type: 2,
        }
      ],
      type: 1
    }
    }else{
     let data = { components: [
        {
          custom_id:button.backid,
          label: button.backlabel,
          style: 1,
          type: 2,
        },
        {
          custom_id: button.nextid,
          label: button.nextlabel,
          style: 1,
          type: 2,
        }
      ],
      type: 1
    };
    if(button.json)data.components.push(button.json);
    return data;
  }
  }
module.exports = {
    buttonerror: e => error = e,
    buttonpage: a =>{
      if(!a.id) throw new Error('dont know id');
    data[a.id]={buttonname:a.name||{next:"next",back:"back"},customid:a.customid||{next:"BURInext",back:"BURIback"},loop:a.loop||false,content:a.content||["not cotent"]}
    const buttondata = buttonfunc(1,(data[a.id].loop)?data[a.id].content.length-1:0,{back:data[a.id].customid.back,next:data[a.id].customid.next},{next:data[a.id].name.next,back:data[a.id].name.back},a.json)
      return {content:data[a.id].content[0],data:buttondata,page:1};
    },
    buttonpush:obj=>{
      if (!obj.interaction.isButton())return 0;
      if(!obj.id) throw new Error('dont know id');
      if(!data[obj.id])return{content:error?.content||"not content",data:errorbutton(),page:0};
      const id = obj.interaction.customId.replace(/[^0-9]/g, ''),
       number = Number(id);
      if(obj.interaction.customId.startsWith(data[obj.id].customid.next)){
       const buttondata = buttonfunc((number+1>=data[obj.id].content.length)?(data[obj.id].loop)?0:number:number+1,number-1,{back:data[obj.id].customid.back,next:data[obj.id].customid.next},{next:data[obj.id].buttonname.next,back:data[obj.id].buttonname.back},obj.json);
       return {content:data[obj.id].content[number],data:buttondata,page:number+1};
      }
      if(obj.interaction.customId.startsWith(data[obj.id].customid.back)){
        const buttondata = buttonfunc((data[obj.id].content.length-1==number)?0:number+1,(number-1<0)?(data[obj.id].loop)?data[obj.id].content.length-1:0:number-1,{back:data[obj.id].customid.back,next:data[obj.id].customid.next},{next:data[obj.id].buttonname.next,back:data[obj.id].buttonname.back},obj.json);
        return {content:data[obj.id].content[number],data:buttondata,page:number+1};
       }
    }
  };