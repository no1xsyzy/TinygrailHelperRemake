import $ from 'jquery'
import { openHistoryDialog } from "./openHistoryDialog";

export function showAuctionHistory( chara ) {
  let button = `<button id="auctionHistorys" class="text_button">[往期拍卖]</button>`;
  $( '#auctionHistoryButton' ).after( button );
  $( '#auctionHistoryButton' ).hide();
  $( '#auctionHistorys' ).on( 'click', () => {
    openHistoryDialog( chara, 1 );
  } );
}
