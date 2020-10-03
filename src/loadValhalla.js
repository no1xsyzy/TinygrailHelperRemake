import $ from 'jquery'
import { getData } from './api.js';
import { formatNumber } from './formats';

export async function loadValhalla( ids ) {
  for ( let i = 0; i < ids.length; i++ ) {
    let Id = ids[ i ];
    await getData( `chara/user/${Id}/tinygrail/false` ).then( ( d ) => {
      let valhalla = `<small class="even" title="拍卖底价 / 拍卖数量">₵${formatNumber(d.Value.Price, 2)} / ${d.Value.Amount}</small>`;
      $( `.cancel_auction[data-id=${Id}]` ).before( valhalla );
    } );
  }
}
