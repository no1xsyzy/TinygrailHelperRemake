import { postData } from './api.js';
import { getAutoTempleList } from "./storage/autoTempleList";
import { loadCharacterList } from './loadCharacterList';
import { autoBuildTemple } from './autoBuildTemple';

export function loadAutoBuild( page ) {
  let autoTempleList = getAutoTempleList();
  autoBuildTemple( autoTempleList );
  let charas = [];
  for ( let i = 0; i < autoTempleList.length; i++ )
    charas.push( autoTempleList[ i ].charaId );
  let start = 50 * ( page - 1 );
  let ids = charas.slice( start, start + 50 );
  let totalPages = Math.ceil( charas.length / 50 );
  postData( 'chara/list', ids ).then( ( d ) => {
    if ( d.State === 0 ) {
      loadCharacterList( d.Value, page, totalPages, loadAutoBuild, 'chara', false );
    }
  } );
}
