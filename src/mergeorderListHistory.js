import $ from 'jquery'
import { getData } from './api.js';
import { formatNumber, formatDate } from './formats';
import { mergeorderList } from './mergeorderList';
import { getSettings } from './storage/settings';

export function mergeorderListHistory( charaId ) {
  let settings = getSettings();
  if ( settings.merge_order == 'on' ) {
    getData( `chara/user/${charaId}` ).then( ( d ) => {
      if ( d.State === 0 && d.Value ) {
        $( `.ask .ask_list li[class!=ask]` ).hide();
        let askHistory = mergeorderList( d.Value.AskHistory );
        for ( let i = 0; i < askHistory.length; i++ ) {
          let ask = askHistory[ i ];
          if ( ask )
            $( '.ask .ask_list' ).prepend( `<li title="${formatDate(ask.TradeTime)}">₵${formatNumber(ask.Price, 2)} / ${formatNumber(ask.Amount, 0)} / +${formatNumber(ask.Amount * ask.Price, 2)}<span class="cancel">[成交]</span></li>` );
        }
        $( `.bid .bid_list li[class!=bid]` ).hide();
        let bidHistory = mergeorderList( d.Value.BidHistory );
        for ( let i = 0; i < bidHistory.length; i++ ) {
          let bid = bidHistory[ i ];
          if ( bid )
            $( '.bid .bid_list' ).prepend( `<li title="${formatDate(bid.TradeTime)}">₵${formatNumber(bid.Price, 2)} / ${formatNumber(bid.Amount, 0)} / -${formatNumber(bid.Amount * bid.Price, 2)}<span class="cancel">[成交]</span></li>` );
        }

      }
    } );
  }
}
