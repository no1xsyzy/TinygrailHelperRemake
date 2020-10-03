import $ from 'jquery'
import { getData } from './api.js';
import { closeDialog } from './closeDialog';
import { loadCharacterList } from './loadCharacterList';

export function loadBalance() {
  closeDialog();
  let dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<table align="center" width="98%" cellspacing="0" cellpadding="5" class="settings">
<tr><td>类型：<select id="balanceType" style="width:100px">
<option value="0" selected="selected">全部</option>
<option value="18">魔法道具</option>
<option value="1">彩票刮刮乐</option>
<option value="2">参与ICO</option>
<option value="3">ICO退款</option>
<option value="13">ICO结果</option>
<option value="4">买入委托</option>
<option value="5">取消买入</option>
<option value="6">卖出委托</option>
<option value="8">取消卖出</option>
<option value="7">交易印花税</option>
<option value="9">资产重组</option>
<option value="10">参与竞拍</option>
<option value="11">修改竞拍</option>
<option value="12">竞拍结果</option>
<option value="14">个人所得税</option>
<option value="16">红包</option>
</select></td>
<td>第<input id="page" type="number" style="width:30px" value="1">页</td>
<td>每页<input id="amount" type="number" style="width:50px" value="1000">条</td>
<td><input class="inputBtn" value="查询" id="submit_search" type="submit"></td></tr>
</tbody></table>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>
</div>`;
  $( 'body' ).append( dialog );
  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );
  $( '#TB_overlay' ).on( 'click', closeDialog );
  $( '#submit_search' ).on( 'click', () => {
    let Type = $( '#balanceType' ).val();
    let page = $( '#page' ).val();
    let amount = $( '#amount' ).val();
    let Logs = [];
    getData( `chara/user/balance/${page}/${amount}`, null ).then( ( d ) => {
      closeDialog();
      if ( d.State == 0 ) {
        for ( let i = 0; i < d.Value.Items.length; i++ ) {
          if ( d.Value.Items[ i ].Type == Type || Type == 0 )
            Logs.push( d.Value.Items[ i ] );
        }
        loadCharacterList( Logs, 1, 1, loadBalance, 'balance', false );
        $( '#eden_tpc_list ul li' ).on( 'click', function( e ) {
          var id = $( e.target ).data( 'id' );
          if ( id == null ) {
            var result = $( e.target ).find( 'small.time' ).text().match( /#(\d+)/ );
            if ( result && result.length > 0 )
              id = result[ 1 ];
          }

          if ( id != null && id.length > 0 ) {
            if ( parent.window.innerWidth < 1200 ) {
              $( parent.document.body ).find( "#split #listFrameWrapper" ).animate( {
                left: '-450px'
              } );
            }
            window.open( `/rakuen/topic/crt/${id}?trade=true`, 'right' );
          }
        } );
      }
    } );
  } );
}
