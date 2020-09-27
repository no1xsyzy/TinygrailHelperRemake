import { openTradeHistoryDialog } from "./openTradeHistoryDialog";

export function showTradeHistory( chara ) {
  $( '#kChartButton' ).after( '<button id="tradeHistoryButton" class="text_button">[交易记录]</button>' );
  $( '#tradeHistoryButton' ).on( 'click', () => {
    openTradeHistoryDialog( chara );
  } );
}
