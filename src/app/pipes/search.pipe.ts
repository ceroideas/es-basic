import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, query: any, field:any = null, equipo:any = null): any {
      console.log(equipo);
      if(!query && !equipo)return value;

      if (!query) {
        query = "";
      }

      if (equipo) {
        value = value.filter((x:any)=>x.team.name == equipo);
      }

      console.log(value);

      if (!field) {
        return value.filter(function(item:any){
          return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
        });
      }
      return value.filter((x:any)=>x[field].toLowerCase().includes(query.toLowerCase()));
  }

}
