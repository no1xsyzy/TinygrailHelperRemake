import { getData } from './api.js';
import { getWeeklyShareBonus } from './getWeeklyShareBonus';

export function getShareBonus() {
  let asiaTime = new Date().toLocaleString( "en-US", {
    timeZone: "Asia/Shanghai"
  } );
  asiaTime = new Date( asiaTime );
  let Day = asiaTime.getDay();
  if ( Day == 6 ) {
    getData( 'event/share/bonus/check' ).then( ( d ) => {
      if ( d.State === 0 ) {
        getWeeklyShareBonus();
      }
    } );
  }
}
