import $ from 'jquery'
import { getData } from './api.js';

export function sell_out( charaId, init_price ) {
  $( $( '#grailBox .info .text' )[ 1 ] ).append( `<button id="sell_out" class="text_button" title="以发行价全部卖出">[全部卖出]</button>` );
  $( '#sell_out' ).on( 'click', function() {
    getData( `chara/user/${charaId}` ).then( ( d ) => {
      let amount = d.Value.Amount;
      $( `.ask .price` ).val( init_price );
      $( `.ask .amount` ).val( d.Value.Amount );
    } );
  } );
}
