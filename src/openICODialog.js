import { getFillICOList, setFillICOList } from "./storage/fillICOList";
import { closeDialog } from './closeDialog';
import { fullfillICO } from './ico/fullfill';

export function openICODialog( chara ) {
  let fillicoList = getFillICOList();
  let target = 1;
  let inorder = false,
    index = 0;
  for ( let i = 0; i < fillicoList.length; i++ ) {
    if ( fillicoList[ i ].Id == chara.Id ) {
      target = fillicoList[ i ].target;
      inorder = true;
      index = i;
    }
  }
  let dialog = `<div id="TB_overlay" class="TB_overlayBG TB_overlayActive"></div>
<div id="TB_window" class="dialog" style="display:block;max-width:640px;min-width:400px;">
<div class="title">自动补款 - #${chara.CharacterId} 「${chara.Name}」 lv${target}</div>
<div class="desc">目标等级：<input type="number" class="target" min="1" max="10" step="1" value="${target}" style="width:50px"></div>
<div class="label"><div class="trade ico">
<button id="startfillICOButton" class="active">自动补款</button>
<button id="fillICOButton" style="background-color: #5fda15;">立即补款</button>
<button id="cancelfillICOButton">取消补款</button></div>
<div class="loading" style="display:none"></div>
<a id="TB_closeWindowButton" title="Close">X关闭</a>
</div>`;
  $( 'body' ).append( dialog );

  $( '#TB_closeWindowButton' ).on( 'click', closeDialog );

  $( '#cancelfillICOButton' ).on( 'click', function() {
    if ( inorder ) {
      alert( `取消自动补款${chara.Name}` );
      $( '#followICOButton' ).text( '[自动补款]' );
      fillicoList.splice( index, 1 );
      setFillICOList( fillicoList );
    }
    closeDialog();
    console.log( fillicoList );
  } );

  $( '#startfillICOButton' ).on( 'click', function() {
    let target = parseFloat( $( '.desc .target' ).val() );
    if ( target <= 0 || !Number.isInteger( target ) ) {
      alert( '请输入正整数！' );
      return;
    }
    let info = {};
    info.Id = chara.Id.toString();
    info.charaId = chara.CharacterId.toString();
    info.name = chara.Name;
    info.target = target;
    info.end = chara.End;
    if ( inorder ) {
      fillicoList[ index ] = info;
    } else
      fillicoList.push( info );
    setFillICOList( fillicoList );
    alert( `启动自动补款#${chara.Id} ${chara.Name}` );
    $( '#followICOButton' ).text( '[自动补款中]' );
    closeDialog();
    console.log( fillicoList );
  } );

  $( '#fillICOButton' ).on( 'click', function() {
    let target = parseFloat( $( '.desc .target' ).val() );
    if ( target <= 0 || !Number.isInteger( target ) ) {
      alert( '请输入正整数！' );
      return;
    }
    let info = {};
    info.Id = chara.Id.toString();
    info.charaId = chara.CharacterId.toString();
    info.name = chara.Name;
    info.target = target;
    info.end = chara.End;
    closeDialog();
    if ( confirm( `立即补款#${chara.Id} ${chara.Name} 至 lv${target}` ) ) {
      fullfillICO( [ info ] );
    }
  } );
}
