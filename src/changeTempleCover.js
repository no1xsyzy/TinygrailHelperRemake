import $ from 'jquery'
import { postData } from './api.js';
import { getFollowList } from "./storage/followList";

export function changeTempleCover( charaId ) {
  $( '#lastTemples' ).on( 'click', '.card', ( e ) => {
    console.log( `thr: card clicked`, e );
    let followList = getFollowList();
    let me = followList.user;
    let temple = $( e.currentTarget ).parent().data( 'temple' );
    let user = temple.Name;
    if ( user == me )
      setChaosCube( temple );
    else
      addButton( temple, user );
  } );

  //   function setChaosCube(temple){
  //     $('#chaosCubeButton').on('click', () => {
  //       let templeId = temple.CharacterId;
  //       ItemsSetting.chaosCube = templeId;
  //       setItemsSetting(ItemsSetting)
  //     });
  //   }
  function addButton( temple, user ) {
    $( '#TB_window .action' ).append( `<button id="changeCoverButton2" class="text_button" title="修改圣殿封面">[修改]</button>
<button id="copyCoverButton" class="text_button" title="复制圣殿图片为自己圣殿的封面">[复制]</button>` );

    $( '#changeCoverButton2' ).on( 'click', () => {
      let cover = prompt( "图片url(你可以复制已有圣殿图片的url)：" );
      let url = 'https://tinygrail.oss-cn-hangzhou.aliyuncs.com/' + cover.match( /cover\/\S+\.jpg/ )[ 0 ];
      postData( `chara/temple/cover/${charaId}/${temple.UserId}`, url ).then( ( d ) => {
        if ( d.State == 0 ) {
          alert( "更换封面成功。" );
          $( '#TB_window img.cover' ).attr( 'src', cover );
          $( '#grailBox .assets_box .assets .item' ).each( function() {
            if ( user == this.querySelector( '.name a' ).href.split( '/' ).pop() )
              $( this ).find( 'div.card' ).css( {
                "background-image": "url(https://tinygrail.mange.cn/" + cover.match( /cover\/\S+\.jpg/ )[ 0 ] + "!w150)"
              } );
          } );
        } else {
          alert( d.Message );
        }
      } );
    } );

    $( '#copyCoverButton' ).on( 'click', () => {
      let cover = $( '#TB_window .container .cover' ).attr( 'src' );
      let url = 'https://tinygrail.oss-cn-hangzhou.aliyuncs.com/' + cover.match( /cover\/\S+\.jpg/ )[ 0 ];
      postData( `chara/temple/cover/${charaId}`, url ).then( ( d ) => {
        if ( d.State == 0 ) {
          alert( "更换封面成功。" );
          location.reload();
        } else {
          alert( d.Message );
        }
      } );
    } );
  }
}
