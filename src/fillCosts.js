import { postData } from './api.js';
import { getItemsSetting, setItemsSetting } from "./storage/itemsSetting";
import { closeDialog } from './closeDialog';

export function fillCosts( id, lv, cost ) {
  closeDialog();
  let ItemsSetting = getItemsSetting();
  let supplyId = ItemsSetting.stardust ? ItemsSetting.stardust[ lv ] : '';
  let dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="title" title="用一个角色的活股或固定资产，给另一个角色的圣殿消耗进行补充，目标人物的等级要小于或等于发动攻击圣殿的人物等级">星光碎片</div>
<div class="desc" style="display:none"></div>
<table align="center" width="98%" cellspacing="0" cellpadding="5" class="settings">
<tr><td>能源：<input id="supplyId" type="number" style="width:60px" value="${supplyId}"></td>
<td>目标：<input id="toSupplyId" type="number" style="width:60px" value="${id}"></td></tr>
<td>类型：<select id="isTemple" style="width:60px"><option value="false">活股</option><option value="true" selected="selected">塔股</option></select></td>
<td>数量：<input id="amount" type="number" style="width:60px" value="${cost}"></td></tr>
<tr><td><input class="inputBtn" value="充能" id="submit_stardust" type="submit"></td></tr>
</tbody></table>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>
</div>`;

  $( 'body' ).append( dialog );
  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );
  $( '#TB_overlay' ).on( 'click', closeDialog );
  if ( !supplyId ) {
    $( '#TB_window .desc' ).text( `当前等级的能源角色id未设定，补充过一次之后会记住此等级的能源角色id` );
    $( '#TB_window .desc' ).show();
  }
  $( '#submit_stardust' ).on( 'click', () => {
    let supplyId = $( '#supplyId' ).val();
    let toSupplyId = $( '#toSupplyId' ).val();
    let isTemple = $( '#isTemple' ).val();
    let amount = $( '#amount' ).val();
    if ( supplyId ) {
      if ( !ItemsSetting.stardust )
        ItemsSetting.stardust = {};
      ItemsSetting.stardust[ lv ] = supplyId;
      setItemsSetting( ItemsSetting );
      postData( `magic/stardust/${supplyId}/${toSupplyId}/${amount}/${isTemple}`, null ).then( ( d ) => {
        closeDialog();
        if ( d.State == 0 )
          alert( d.Value );
        else
          alert( d.Message );
      } );
    } else
      alert( '角色id不能为空' );
  } );
}
