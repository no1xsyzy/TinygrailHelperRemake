import { getData } from './api.js';
import { formatNumber, formatDate } from './formats';
import { closeDialog } from './closeDialog';

export function openTradeHistoryDialog( chara ) {
  var dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="title">交易历史记录 - #${chara.Id} 「${chara.Name}」 ₵${formatNumber(chara.Current, 2)} / ${formatNumber(chara.Total, 0)}</div>
<div class="result" style="display:none; max-height: 500px; overflow: auto;"></div>
<div class="desc" style="display:none"></div>
<div class="loading"></div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>`;
  $( 'body' ).append( dialog );

  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );
  $( '#TB_overlay' ).on( 'click', closeDialog );
  let tradeHistory, totalPages;
  getData( `chara/charts/${chara.Id}/2019-08-08` ).then( ( d ) => {
    if ( d.State == 0 ) {
      tradeHistory = d.Value.reverse();
      totalPages = Math.ceil( d.Value.length / 50 );
      loadTradeHistory( 1 );
    }
  } );

  function loadTradeHistory( page ) {
    $( `#TB_window .loading` ).hide();
    $( `#TB_window .result` ).show();
    $( `#TB_window .result` ).html( '' );
    let records = tradeHistory.slice( 50 * ( page - 1 ), 50 * page );
    if ( records.length ) {
      for ( let i = 0; i < records.length; i++ ) {
        var record = `<div class="row">
<span class="time" title="交易时间">${formatDate(records[i].Time)}</span>
<span class="price" title="价格">₵${formatNumber((records[i].Price / records[i].Amount), 2)}</span>
<span class="amount" title="数量">${formatNumber(records[i].Amount, 0)}</span>
<span class="price" title="交易额">₵${formatNumber(records[i].Price, 2)}</span>
</div>`;
        $( `#TB_window .result` ).append( record );
      }
      $( `#TB_window .desc` ).html( '' );
      $( `#TB_window .desc` ).text( `共有${tradeHistory.length}条记录，当前 ${page} / ${totalPages} 页` );

      for ( let i = 1; i <= totalPages; i++ ) {
        let pager = `<span class="page" data-page="${i}">[${i}]</span>`;
        $( `#TB_window .desc` ).append( pager );
      }

      $( `#TB_window .desc .page` ).on( 'click', ( e ) => {
        let page = $( e.target ).data( 'page' );
        loadTradeHistory( page );
      } );

      $( `#TB_window .result` ).show();
    } else {
      $( `#TB_window .desc` ).text( '暂无交易记录' );
    }
    $( `#TB_window .desc` ).show();
  }
}
