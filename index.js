//createbyBURI
let buttonname=[],
error,
content = [],
loop = [],
customid=[];
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
          disabled: false,
          label: button.backlabel,
          style: 1,
          type: 2,
        },
        {
          custom_id: button.nextid,
          disabled: false,
          label: button.nextlabel,
          style: 1,
          type: 2,
        }
      ],
      type: 1
    };
    if(button.json){
      data.components.push(button.json)
    }
    return data;
  }
  }
module.exports = {
    buttonerror: e => error = e,
    buttonpage: a =>{
      if(!a.id) throw new Error('dont know id');
    content[a.id] = a.content||["notcontent"];
    loop[a.id] = a.loop||false,
    customid[a.id]=a.customid,
    buttonname[a.id]=a.name;
    const buttondata = buttonfunc(1,(loop[a.id])?content[a.id].length-1:0,{back:a.customid?.back||"BURIback",next:a.customid?.next||"BURInext"},{next:a.name?.next||"next",back:a.name?.back||"back"},a.json)
      return {content:content[a.id][0],data:buttondata,page:1};
    },
    buttonpush:obj=>{
      if (!obj.interaction.isButton())return 0;
      if(!obj.id) throw new Error('dont know id');
 if(!content[obj.id])return{content:error?.content||"notcontent",data:errorbutton(),page:0};
      const id = obj.interaction.customId.replace(/[^0-9]/g, ''),
       number = Number(id);
      if(obj.interaction.customId.startsWith(customid[obj.id]?.next||"BURInext")){
       const buttondata = buttonfunc((number+1>=content[obj.id].length)?(loop[obj.id])?0:number:number+1,number-1,{back:customid[obj.id]?.back||"BURIback",next:customid[obj.id]?.next||"BURInext"},{next:buttonname[obj.id]?.next||"next",back:buttonname[obj.id]?.back||"back"},obj.json);
       return {content:content[obj.id][number],data:buttondata,page:number+1};
      }
      if(obj.interaction.customId.startsWith(customid[obj.id]?.back||"BURIback")){
        const buttondata = buttonfunc((content[obj.id].length-1==number)?0:number+1,(number-1<0)?(loop[obj.id])?content[obj.id].length-1:0:number-1,{back:customid[obj.id]?.back||"BURIback",next:customid[obj.id]?.next||"BURInext"},{next:buttonname[obj.id]?.next||"next",back:buttonname[obj.id]?.back||"back"},obj.json);
        return {content:content[obj.id][number],data:buttondata,page:number+1};
       }
    }
  };