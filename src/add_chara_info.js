import { getData } from './api.js';
import { launchObserver } from './launchObserver';
import { fixAuctions } from './fixAuctions';
import { showAuctionHistory } from './showAuctionHistory';
import { showTradeHistory } from './showTradeHistory';
import { showInitialPrice } from './showInitialPrice';
import { showGallery } from './showGallery';
import { showPrice } from './showPrice';
import { priceWarning } from './priceWarning';
import { showOwnTemple } from './showOwnTemple';
import { showOwnLink } from './showOwnLink';
import { showTempleRate } from './showTempleRate';
import { changeTempleCover } from './changeTempleCover';
import { mergeorderListHistory } from './mergeorderListHistory';
import { setBuildTemple } from './setBuildTemple';
import { followChara } from './followChara';
import { followAuctions } from './followAuctions';

export function add_chara_info() {
  let charaId = $( '#grailBox .title .name a' )[ 0 ].href.split( '/' ).pop();
  followChara( charaId ); //关注角色
  followAuctions( charaId ); //关注竞拍情况
  showInitialPrice( charaId ); //显示发行价
  priceWarning(); //买入价格过高提醒
  mergeorderListHistory( charaId ); //合并同一时间订单历史记录
  launchObserver( {
    parentNode: document.body,
    selector: '#lastTemples .item',
    successCallback: () => {
      showOwnTemple(); //显示自己的圣殿
      changeTempleCover( charaId ); //修改他人圣殿封面
    },
  } );
  launchObserver( {
    parentNode: document.body,
    selector: '#lastLinks .link.item',
    successCallback: () => {
      showOwnLink(); //前置自己的连接
    },
  } );
  showGallery(); //查看画廊
  getData( `chara/${charaId}` ).then( ( d ) => {
    let chara = d.Value;
    showAuctionHistory( chara ); //历史拍卖
    showTradeHistory( chara ); //交易记录
    showPrice( chara ); //显示评估价
    showTempleRate( chara ); //显示各级圣殿数量及股息计算值
    setBuildTemple( chara ); //自动建塔
    fixAuctions( chara ); //修改默认拍卖底价和数量
  } );
}
