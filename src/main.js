import './style.css'

import { launchObserver } from './launchObserver'
import { autoFillTemple } from './autoFillTemple'
import { autoTemple } from './autoTemple'
import { fillICO } from './ico/fill'
import { getShareBonus } from './getShareBonus'
import { hideBonusButton } from './hideBonusButton'
import { loadHelperMenu } from './loadHelperMenu'
import { showGallery } from './showGallery'
import { showHideGrailBox } from './showHideGrailBox'
import { showTopWeek } from './showTopWeek'
import { add_chara_info } from './add_chara_info'
import { add_ico_info } from './add_ico_info'

//=======================================================================================================//

setInterval( autoFillTemple, 60 * 60 * 1000 );
setInterval( autoTemple, 60 * 60 * 1000 );
setInterval( fillICO, 30 * 1000 );

// character page
if ( location.pathname.startsWith( '/rakuen/topic/crt' ) || location.pathname.startsWith( '/character' ) ) {
  let parentNode = document.getElementById( 'subject_info' ) || document.getElementById( 'columnCrtB' );
  // charater trade info
  let chara_fetched = false;
  launchObserver( {
    parentNode: parentNode,
    selector: '#grailBox .assets_box',
    failCallback: () => {
      chara_fetched = false
    },
    successCallback: () => {
      if ( chara_fetched ) return;
      chara_fetched = true;
      add_chara_info();
    },
    stopWhenSuccess: false,
  } );
  // charater ico info
  let ico_fetched = false;
  launchObserver( {
    parentNode: parentNode,
    selector: '#grailBox .trade .money',
    failCallback: () => {
      ico_fetched = false
    },
    successCallback: () => {
      if ( ico_fetched ) return;
      ico_fetched = true;
      add_ico_info();
    },
    stopWhenSuccess: false,
  } );
}
// rakuen homepage
else if ( location.pathname.startsWith( '/rakuen/home' ) ) {
  //周六未领取股息则自动领取
  if ( settings.get_bonus == 'on' ) getShareBonus();
  launchObserver( {
    parentNode: document.body,
    selector: '#topWeek',
    successCallback: () => {
      hideBonusButton(); //隐藏签到
      showTopWeek(); //显示萌王榜排名数值
      showGallery(); //显示画廊
    },
  } );
  let chara_fetched = false;
  launchObserver( {
    parentNode: document.body,
    selector: '#grailBox .assets_box',
    failCallback: () => {
      chara_fetched = false
    },
    successCallback: () => {
      if ( chara_fetched ) return;
      chara_fetched = true;
      add_chara_info();
    },
    stopWhenSuccess: false,
  } );
}
// menu page
else if ( location.pathname.startsWith( '/rakuen/topiclist' ) ) {
  setTimeout( function() {
    loadHelperMenu()
  }, 500 );
}
// user homepage
else if ( location.pathname.startsWith( '/user' ) ) {
  launchObserver( {
    parentNode: document.body,
    selector: '#grail',
    successCallback: () => {
      showHideGrailBox();
      showGallery();
    },
  } );
  let chara_fetched = false;
  launchObserver( {
    parentNode: document.body,
    selector: '#grailBox .assets_box',
    failCallback: () => {
      chara_fetched = false
    },
    successCallback: () => {
      if ( chara_fetched ) return;
      chara_fetched = true;
      add_chara_info();
    },
    stopWhenSuccess: false,
  } );
}
