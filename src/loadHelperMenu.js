import { menuItemClicked } from './menuItemClicked';
import { openSettings } from './openSettings';
import { cancelBids } from './cancelBids';
import { sellOut } from './sellOut';
import { loadFollowChara } from './loadFollowChara';
import { loadMyICO } from './loadMyICO';
import { loadMyTemple } from './loadMyTemple';
import { loadScratch } from './loadScratch';
import { loadMagic } from './loadMagic';
import { creatTemporaryList } from './creatTemporaryList';
import { loadFollowAuction } from './loadFollowAuction';
import { loadBalance } from './loadBalance';
import { loadAutoBuild } from './loadAutoBuild';
import { loadAutoFillICO } from './loadAutoFillICO';

export function loadHelperMenu() {
  let item = `<li><a href="#" id="helperMenu" class="top">助手</a>
<ul>
<li><a href="#" id="temporaryList">临时列表</a></li>
<li><a href="#" id="followChara">关注角色</a></li>
<li><a href="#" id="followAuction">关注竞拍</a></li>
<li><a href="#" id="myICO">我的ICO</a></li>
<li><a href="#" id="myTemple">我的圣殿</a></li>
<li><a href="#" id="scratch">抽奖</a></li>
<li><a href="#" id="magic">魔法道具</a></li>
<li><a href="#" id="balance">资金日志分类</a></li>
<li><a href="#" id="sell">卖出</a></li>
<li><a href="#" id="autoBuild">自动建塔</a></li>
<li><a href="#" id="autoICO">自动补款</a></li>
<li><a href="#" id="cancelBids">取消买单</a></li>
<li><a href="#" id="settings">设置</a></li>
</ul>
</li>`;
  $( '.timelineTabs' ).append( item );

  $( '#followChara' ).on( 'click', function() {
    menuItemClicked( loadFollowChara );
  } );

  $( '#followAuction' ).on( 'click', function() {
    menuItemClicked( loadFollowAuction );
  } );

  $( '#myICO' ).on( 'click', function() {
    menuItemClicked( loadMyICO );
  } );

  $( '#myTemple' ).on( 'click', function() {
    menuItemClicked( loadMyTemple );
  } );

  $( '#balance' ).on( 'click', function() {
    menuItemClicked( loadBalance );
  } );

  $( '#autoBuild' ).on( 'click', function() {
    menuItemClicked( loadAutoBuild );
  } );

  $( '#autoICO' ).on( 'click', function() {
    menuItemClicked( loadAutoFillICO );
  } );

  $( '#temporaryList' ).on( 'click', function() {
    menuItemClicked( creatTemporaryList );
  } );

  $( '#scratch' ).on( 'click', function() {
    menuItemClicked( loadScratch );
  } );

  $( '#magic' ).on( 'click', function() {
    menuItemClicked( loadMagic );
  } );

  $( '#sell' ).on( 'click', function() {
    menuItemClicked( sellOut );
  } );

  $( '#cancelBids' ).on( 'click', function() {
    menuItemClicked( cancelBids );
  } );

  $( '#settings' ).on( 'click', function() {
    menuItemClicked( openSettings );
  } );
}
