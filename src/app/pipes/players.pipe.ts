import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'players',
  standalone: false
})
export class PlayersPipe implements PipeTransform {

  transform(player: any, report:any, p:any): any {

    if (report) {
      let pl = report.players.find((x:any)=>x.player_id == player.id);

      if (!pl) {
        return false;
      }

      if (pl.punctuation == p) {
        return true;
      }

      return false;
    }
  }

}
