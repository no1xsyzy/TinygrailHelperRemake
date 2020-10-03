import $ from 'jquery'
import { formatNumber } from './formats';

export function loadUserAuctions( d ) {
  d.Value.forEach( ( a ) => {
    if ( a.State != 0 ) {
      let userAuction = `<span class="user_auction auction_tip" title="竞拍人数 / 竞拍数量">${formatNumber(a.State, 0)} / ${formatNumber(a.Type, 0)}</span>`;
      $( `.item_list[data-id=${a.CharacterId}] .time` ).after( userAuction );
      $( `#auctionHistoryButton` ).before( userAuction );
      $( '#TB_window.dialog .desc' ).append( userAuction );
    }
    if ( a.Price != 0 ) {
      let myAuction = `<span class="my_auction auction_tip" title="出价 / 数量">₵${formatNumber(a.Price, 2)} / ${formatNumber(a.Amount, 0)}</span>`;
      $( `.item_list[data-id=${a.CharacterId}] .time` ).after( myAuction );
      $( `#auctionHistoryButton` ).before( myAuction );
      $( '#TB_window.dialog .desc' ).append( myAuction );
    }
  } );
}
