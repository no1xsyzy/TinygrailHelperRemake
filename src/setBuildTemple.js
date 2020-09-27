import { openBuildDialog } from './openBuildDialog';
import { getAutoTempleList, setAutoTempleList } from './storage/autoTempleList';

export function setBuildTemple( chara ) {
  let in_TempleList = false;
  let charaId = chara.Id;
  let autoTempleList = getAutoTempleList();
  if ( chara.CharacterId )
    charaId = chara.CharacterId;
  for ( let i = 0; i < autoTempleList.length; i++ ) {
    if ( autoTempleList[ i ].charaId == charaId )
      in_TempleList = true;
  }
  setAutoTempleList( autoTempleList )
  let button;
  if ( in_TempleList ) {
    button = `<button id="autobuildButton" class="text_button">[自动建塔中]</button>`;
  } else {
    button = `<button id="autobuildButton" class="text_button">[自动建塔]</button>`;
  }
  if ( $( '#buildButton' ).length )
    $( '#buildButton' ).after( button );
  else
    $( '#grailBox .title .text' ).after( button );

  $( '#autobuildButton' ).on( 'click', () => {
    openBuildDialog( chara );
  } );
}
