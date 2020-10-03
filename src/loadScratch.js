import $ from 'jquery'
import { getData, postData } from './api.js';
import { getItemsSetting } from "./storage/itemsSetting";
import { loadCharacterList } from './loadCharacterList';

export function loadScratch() {
  let ItemsSetting = getItemsSetting();
  $( '#eden_tpc_list ul' ).html( '' );
  $( '#eden_tpc_list ul' ).append( `<li class="line_odd item_list" style="text-align: center;">[刮刮乐]</li>` );
  let scratch_results = [],
    scratch_ids = [],
    chaosCube_results = [],
    chaosCube_ids = [];
  scratch();

  function scratch() {
    getData( 'event/scratch/bonus2' ).then( ( d ) => {
      if ( d.State == 0 ) {
        for ( let i = 0; i < d.Value.length; i++ ) {
          scratch_results.push( d.Value[ i ] );
          scratch_ids.push( d.Value[ i ].Id );
        }
        if ( !d.Value.length ) {
          scratch_results.push( d.Value );
          scratch_ids.push( d.Value.Id );
        }
        scratch();
      } else {
        postData( 'chara/list', scratch_ids ).then( ( d ) => {
          for ( let i = 0; i < d.Value.length; i++ ) {
            d.Value[ i ].Sacrifices = scratch_results[ i ].Amount;
            d.Value[ i ].Current = scratch_results[ i ].SellPrice;
          }
          loadCharacterList( d.Value, 2, 2, loadScratch, 'chara', false );
          $( '#eden_tpc_list ul' ).append( `<li class="line_odd item_list" style="text-align: center;">[混沌魔方]</li>` );
          chaosCube();
        } );
      }
    } );
  }

  function chaosCube() {
    let templeId = ItemsSetting.chaosCube;
    if ( templeId ) {
      postData( `magic/chaos/${templeId}`, null ).then( ( d ) => {
        console.log( d );
        if ( d.State == 0 ) {
          for ( let i = 0; i < d.Value.length; i++ ) {
            chaosCube_results.push( d.Value[ i ] );
            chaosCube_ids.push( d.Value[ i ].Id );
          }
          if ( !d.Value.length ) {
            chaosCube_results.push( d.Value );
            chaosCube_ids.push( d.Value.Id );
          }
          chaosCube();
        } else {
          if ( d.Message != '今日已超过使用次数限制或资产不足。' ) {
            alert( d.Message );
            chaosCube();
          } else
            postData( 'chara/list', chaosCube_ids ).then( ( d ) => {
              for ( let i = 0; i < d.Value.length; i++ ) {
                d.Value[ i ].Sacrifices = chaosCube_results[ i ].Amount;
                d.Value[ i ].Current = chaosCube_results[ i ].SellPrice;
              }
              loadCharacterList( d.Value, 2, 2, loadScratch, 'chara', false );
            } );
        }
      } );
    } else
      alert( '未设置施放混沌魔方的圣殿，请先在角色圣殿施放一次混沌魔方即可完成预设' );
  }
}
