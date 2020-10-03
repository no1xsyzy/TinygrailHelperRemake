import $ from 'jquery'
import { getAutoTempleList, setAutoTempleList } from "./storage/autoTempleList";
import { closeDialog } from './closeDialog';
import { autoBuildTemple } from './autoBuildTemple';

export function openBuildDialog( chara ) {
  let autoTempleList = getAutoTempleList();
  let charaId = chara.Id;
  if ( chara.CharacterId )
    charaId = chara.CharacterId;
  let target = 500,
    bidPrice = 10;
  let intempleList = false,
    index = 0;
  for ( let i = 0; i < autoTempleList.length; i++ ) {
    if ( autoTempleList[ i ].charaId == charaId ) {
      target = autoTempleList[ i ].target;
      bidPrice = autoTempleList[ i ].bidPrice;
      intempleList = true;
      index = i;
    }
  }
  let dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="title" title="目标数量 / 买入价格">
自动建塔 - #${charaId} 「${chara.Name}」 ${target} / ₵${bidPrice}</div>
<div class="desc"><p>当已献祭股数+持有股数达到目标数量时将自动建塔</p>
输入 目标数量 / 买入价格(不超过此价格的卖单将自动买入)</div>
<div class="label"><div class="trade build">
<input class="target" type="number" style="width:150px" title="目标数量" value="${target}">
<input class="bidPrice" type="number" style="width:100px" title="卖出下限" value="${bidPrice}">
<button id="startBuildButton" class="active">自动建塔</button><button id="cancelBuildButton">取消建塔</button></div>
<div class="loading" style="display:none"></div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>`;
  $( 'body' ).append( dialog );

  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );

  $( '#cancelBuildButton' ).on( 'click', function() {
    if ( intempleList ) {
      autoTempleList.splice( index, 1 );
      setAutoTempleList( autoTempleList );
      alert( `取消自动建塔${chara.Name}` );
      $( '#autobuildButton' ).text( '[自动建塔]' );
    }
    closeDialog();
  } );

  $( '#startBuildButton' ).on( 'click', function() {
    let info = {};
    info.charaId = charaId.toString();
    info.name = chara.Name;
    info.target = $( '.trade.build .target' ).val();
    info.bidPrice = $( '.trade.build .bidPrice' ).val();
    if ( intempleList ) {
      autoTempleList.splice( index, 1 );
      autoTempleList.unshift( info );
    } else
      autoTempleList.unshift( info );
    setAutoTempleList( autoTempleList );
    alert( `启动自动建塔#${info.charaId} ${info.name}` );
    closeDialog();
    $( '#autobuildButton' ).text( '[自动建塔中]' );
    autoBuildTemple( [ info ] );
  } );
}
