import { getData } from './api.js';
import { getCharaInitPrice, setCharaInitPrice } from "./storage/charaInitPrice";
import { sell_out } from "./sell_out";

export function showInitialPrice( charaId ) {
  let chara_initPrice = getCharaInitPrice();
  if ( chara_initPrice[ charaId ] ) {
    let init_price = chara_initPrice[ charaId ].init_price;
    let time = chara_initPrice[ charaId ].time;
    $( $( '#grailBox .info .text' )[ 1 ] ).append( `<span title="上市时间:${time}">发行价：${init_price}</span>` );
    sell_out( charaId, init_price );
  } else
    getData( `chara/charts/${charaId}/2019-08-08` ).then( ( d ) => {
      let init_price = d.Value[ 0 ].Begin.toFixed( 2 );
      let time = d.Value[ 0 ].Time.replace( 'T', ' ' );
      getCharaInitPrice()
      chara_initPrice[ charaId ] = {
        "init_price": init_price,
        "time": time
      };
      setCharaInitPrice( chara_initPrice );
      $( $( '#grailBox .info .text' )[ 1 ] ).append( `<span title="上市时间:${time}">发行价：${init_price}</span>` );
      sell_out( charaId, init_price );
    } );
}
