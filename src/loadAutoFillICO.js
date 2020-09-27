import { postData } from './api.js';
import { getFillICOList } from "./storage/fillICOList";
import { loadCharacterList } from './loadCharacterList';
import { loadAutoBuild } from './loadAutoBuild';

export function loadAutoFillICO( page ) {
  let fillicoList = getFillICOList();
  let charas = [];
  for ( let i = 0; i < fillicoList.length; i++ )
    charas.push( fillicoList[ i ].charaId );
  let start = 50 * ( page - 1 );
  let ids = charas.slice( start, start + 50 );
  let totalPages = Math.ceil( charas.length / 50 );
  postData( 'chara/list', ids ).then( ( d ) => {
    if ( d.State === 0 ) {
      loadCharacterList( d.Value, page, totalPages, loadAutoBuild, 'chara_ico', false );
    }
  } );
}
