import { getData, postData } from './api.js';
import { loadUserAuctions } from './loadUserAuctions';
import { openAuctionDialog } from "./openAuctionDialog";

export function fixAuctions( chara ) {
  getData( `chara/user/${chara.Id}/tinygrail/false` ).then( ( d ) => {
    chara.Price = d.Value.Price;
    chara.State = d.Value.Amount;
    let button = `<button id="auctionButton2" class="text_button">[萌王投票]</button>`;
    if ( d.State == 0 && d.Value.Amount > 0 )
      button = `<button id="auctionButton2" class="text_button">[参与竞拍]</button>`;
    $( '#buildButton' ).before( button );
    $( '#auctionButton' ).hide();
    postData( 'chara/auction/list', [ chara.Id ] ).then( ( d ) => {
      loadUserAuctions( d );
      $( '#auctionButton2' ).on( 'click', () => {
        openAuctionDialog( chara, d );
      } );
    } );
  } );
}
