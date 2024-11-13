import {NameEntry} from "@/types/type_general";

export function getFirstPart(name: string): string {
    return name.split(" ")[0];
}
export   const buildDataNameEntry=(data:any[],name:string,code:string,status:string):NameEntry[]=>{
    let ls:NameEntry[]=[];
    for(let i in data){
        let row = data[i]
        let rec = row as {[index:string]:any}
        ls.push({
            code: rec[code],
            name:rec[name],
            status:rec[status],
            avatar:"",
        })
    }
    return ls
}
