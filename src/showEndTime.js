import $ from 'jquery'
export function showEndTime( chara ) {
  let endTime = ( chara.End ).slice( 0, 19 );
  $( '#grailBox .title .text' ).append( `<div class="sub" style="margin-left: 20px">结束时间: ${endTime}</div>` );
}
