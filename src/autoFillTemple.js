import { getData, postData } from './api.js';
import { getSettings } from "./storage/settings";
import { getItemsSetting } from "./storage/itemsSetting"

let ItemsSetting = getItemsSetting()

//自动补塔
export function autoFillTemple() {
  if ( getSettings().auto_fill_temple != 'on' )
    return;
  async function autoFillCosts( autoFillCostList ) {
    for ( let i = 0; i < autoFillCostList.length; i++ ) {
      let id = autoFillCostList[ i ].id;
      let supplyId = autoFillCostList[ i ].supplyId;
      let cost = autoFillCostList[ i ].cost;
      await postData( `magic/stardust/${supplyId}/${id}/${cost}/true`, null ).then( ( d ) => {
        if ( d.State == 0 )
          console.log( `自动补塔 #${id} ${d.Value}` );
        else
          console.log( `自动补塔 #${id} ${d.Message}` );
      } );
    }
  }

  function checkLostTemple( currentPage ) {
    let autoFillCostList = [];
    getData( `chara/user/temple/0/${currentPage}/500` ).then( ( d ) => {
      if ( d.State == 0 ) {
        for ( let i = 0; i < d.Value.Items.length; i++ ) {
          let info = {};
          let lv = d.Value.Items[ i ].CharacterLevel;
          info.id = d.Value.Items[ i ].CharacterId;
          info.supplyId = ItemsSetting.stardust ? ItemsSetting.stardust[ lv ] : null;
          info.cost = d.Value.Items[ i ].Sacrifices - d.Value.Items[ i ].Assets;
          if ( info.cost >= 100 && info.cost <= 250 && info.id != info.supplyId && info.supplyId ) {
            autoFillCostList.push( info );
          }
        }
        autoFillCosts( autoFillCostList );
        if ( currentPage < d.Value.TotalPages ) {
          checkLostTemple( currentPage + 1 );
        }
      }
    } );
  }
  checkLostTemple( 1 );
};
