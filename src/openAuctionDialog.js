import { formatNumber } from './formats';
import { closeDialog } from './closeDialog';
import { loadUserAuctions } from './loadUserAuctions';
import { cancelAuction } from './cancelAuction';
import { bidAuction } from "./bidAuction";
import { getSettings } from './storage/settings';

export function openAuctionDialog( chara, auction ) {
  let auction_num = chara.State;
  if ( getSettings().auction_num == 'one' )
    auction_num = 1;
  let price = Math.ceil( chara.Price * 100 ) / 100;
  let total = formatNumber( price * chara.State, 2 );
  let dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="title" title="拍卖底价 / 竞拍数量 / 流通股份">股权拍卖 - #${chara.Id} 「${chara.Name}」 ₵${formatNumber(chara.Price, 2)} / ${chara.State} / ${chara.Total}</div>
<div class="desc">
<button id="fullfill_auction" class="text_button" title="当竞拍数量未满时补满数量">[补满]</button>
<button id="change_amount" class="text_button" title="按修改后的价格确定数量，保持总价不变">[改量]</button>
<button id="change_price" class="text_button" title="按修改后的数量确定价格，保持总价不变">[改价]</button>
</div><div class="label">
<span class="input">价格</span><span class="input">数量</span><span class="total">合计 -₵${total}</span>
</div><div class="trade auction">
<input class="price" type="number" style="width: 100px" min="${price}" value="${price}">
<input class="amount" type="number" style="width: 100px" min="1" max="${chara.State}" value="${auction_num}">
<button id="bidAuctionButton" class="active">确定</button><button id="cancelAuctionButton" style="display: none">取消竞拍</button></div>
<div class="loading" style="display:none"></div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>`;
  $( 'body' ).append( dialog );
  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );

  $( '.assets_box .auction_tip' ).remove();
  loadUserAuctions( auction );

  $( '#cancelAuctionButton' ).on( 'click', function() {
    cancelAuction( chara );
  } );
  $( '#bidAuctionButton' ).on( 'click', function() {
    bidAuction( chara );
  } );

  if ( !auction.Value.length ) {
    auction.Value = [ {
      "Price": 0,
      "Amount": 0,
      "Type": 0,
      "State": 0
    } ];
  }

  if ( auction.Value[ 0 ].Price ) {
    $( '.trade.auction .price' ).val( auction.Value[ 0 ].Price );
    $( '.trade.auction .amount' ).val( auction.Value[ 0 ].Amount );
    let total = formatNumber( auction.Value[ 0 ].Price * auction.Value[ 0 ].Amount, 2 );
    $( "#TB_window .label .total" ).text( `合计 -₵${total}` );
    $( '#cancelAuctionButton' ).show();
  }

  $( '#TB_window .auction input' ).on( 'keyup', () => {
    let price = $( '.trade.auction .price' ).val();
    let amount = $( '.trade.auction .amount' ).val();
    let total = formatNumber( price * amount, 2 );
    $( "#TB_window .label .total" ).text( `合计 -₵${total}` );
  } );
  $( '#fullfill_auction' ).on( 'click', function() {
    let total_auction = chara.State;
    let amount = total_auction - auction.Value[ 0 ].Type + auction.Value[ 0 ].Amount;
    let price = Math.ceil( chara.Price * 100 ) / 100;
    $( '.trade.auction .price' ).val( price );
    $( '.trade.auction .amount' ).val( amount );
    $( "#TB_window .label .total" ).text( `合计 -₵${formatNumber(price * amount, 2)}` );
  } );
  $( '#change_amount' ).on( 'click', function() {
    let price = parseFloat( $( '.trade.auction .price' ).val() );
    let total = auction.Value[ 0 ].Price * auction.Value[ 0 ].Amount;
    let amount = Math.ceil( total / price );
    $( '.trade.auction .amount' ).val( amount );
    $( "#TB_window .label .total" ).text( `合计 -₵${formatNumber(price * amount, 2)}` );
  } );
  $( '#change_price' ).on( 'click', function() {
    let amount = parseInt( $( '.trade.auction .amount' ).val() );
    let total = auction.Value[ 0 ].Price * auction.Value[ 0 ].Amount;
    let price = Math.ceil( total / amount * 100 ) / 100;
    $( '.trade.auction .price' ).val( price );
    $( "#TB_window .label .total" ).text( `合计 -₵${formatNumber(price * amount, 2)}` );
  } );
}
