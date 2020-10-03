import $ from 'jquery'
import { getData, postData } from '../api.js';
import { caculateICO } from './calculate';
import { ICO_standard } from './standard';
import { closeDialog } from '../closeDialog';

export async function fullfillICO( icoList ) {
  var dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="info_box">
<div class="title">自动补款检测中</div>
<div class="result" style="max-height:500px;overflow:auto;"></div>
</div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>
</div>`;
  if ( !$( '#TB_window' ).length )
    $( 'body' ).append( dialog );
  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );
  $( '#TB_overlay' ).on( 'click', closeDialog );
  for ( let i = 0; i < icoList.length; i++ ) {
    let Id = icoList[ i ].Id;
    let charaId = icoList[ i ].charaId;
    let targetlv = icoList[ i ].target;
    let target = ICO_standard( targetlv );
    await getData( `chara/${charaId}` ).then( ( d ) => {
      if ( d.State == 0 ) {
        let predicted = caculateICO( d.Value );
        if ( predicted.Level >= targetlv ) {
          console.log( charaId + '总额:' + d.Value.Total + ',已达标，无需补款' );
          $( '.info_box .result' ).prepend( `<div class="row">#${charaId} 目标: lv${targetlv} 总额: ${d.Value.Total} ,已达标，无需补款</div>` );
        } else if ( predicted.Users <= 0 ) {
          let offer = predicted.Next - d.Value.Total;
          if ( d.Value.Users >= target.Users ) {
            offer = target.Total - d.Value.Total;
          }
          offer = Math.max( offer, 5000 );
          postData( `chara/join/${Id}/${offer}`, null ).then( ( d ) => {
            if ( d.State === 0 ) {
              $( '.info_box .result' ).prepend( `<div class="row">#${charaId} 目标: lv${targetlv} 补款: ${offer}</div>` );
              console.log( charaId + '补款:' + offer );
            } else {
              $( '.info_box .result' ).prepend( `<div class="row">#${charaId} ${d.Message}</div>` );
              console.log( d.Message );
            }
          } );
        } else {
          $( '.info_box .result' ).prepend( `<div class="row">#${charaId} 目标: lv${targetlv} 人数: ${d.Value.Users}, 人数不足，未补款</div>` );
          console.log( charaId + '人数:' + d.Value.Users + ',人数不足，未补款' );
        }
      }
    } );
  }
}
