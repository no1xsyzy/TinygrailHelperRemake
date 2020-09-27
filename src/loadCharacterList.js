import { getFollowList, setFollowList } from "./storage/followList";
import { listItemClicked } from './listItemClicked';
import { renderBalanceLog } from './render/balanceLog';
import { renderCharacter } from './render/character';
import { fillCosts } from "./fillCosts";

let lastEven = false;

export function loadCharacterList( list, page, total, more, type, showCancel ) {
  let followList = getFollowList();
  $( '#eden_tpc_list ul .load_more' ).remove();
  if ( page === 1 )
    $( '#eden_tpc_list ul' ).html( '' );
  //console.log(list);
  for ( let i = 0; i < list.length; i++ ) {
    let item = list[ i ];
    //console.log(item);
    if ( type == 'balance' ) {
      let log = renderBalanceLog( item, lastEven );
      $( '#eden_tpc_list ul' ).append( log );
    } else {
      let chara = renderCharacter( item, type, lastEven, showCancel );
      $( '#eden_tpc_list ul' ).append( chara );
    }
    lastEven = !lastEven;
  }
  $( '.cancel_auction' ).on( 'click', ( e ) => {
    //if (!confirm('确定取消关注？')) return;
    let id = $( e.target ).data( 'id' ).toString();
    if ( type == 'chara' )
      followList.charas.splice( followList.charas.indexOf( id ), 1 );
    else if ( type == 'auction' )
      followList.auctions.splice( followList.auctions.indexOf( id ), 1 );
    setFollowList( followList );
    $( `#eden_tpc_list li[data-id=${id}]` ).remove();
  } );

  $( '.fill_costs' ).on( 'click', ( e ) => {
    let id = $( e.target ).data( 'id' );
    let lv = $( e.target ).data( 'lv' );
    let cost = $( e.target ).data( 'cost' );
    fillCosts( id, lv, cost );
    $( e.target ).remove();
  } );

  $( '#eden_tpc_list .item_list' ).on( 'click', listItemClicked );
  if ( page != total && total > 0 ) {
    let loadMore = `<li class="load_more"><button id="loadMoreButton" class="load_more_button" data-page="${page + 1}">[加载更多]</button></li>`;
    $( '#eden_tpc_list ul' ).append( loadMore );
    $( '#loadMoreButton' ).on( 'click', function() {
      let page = $( this ).data( 'page' );
      if ( more )
        more( page );
    } );
  } else {
    let noMore = '暂无数据';
    if ( total > 0 )
      noMore = '加载完成';

    $( '#eden_tpc_list ul' ).append( `<li class="load_more sub">[${noMore}]</li>` );
  }
}
