import { getData, postData } from './api.js';
import { formatAskPrice } from './formats';
import { remove_empty } from "./remove_empty";
import { removeBuildTemple } from "./removeBuildTemple";

export async function autoBuildTemple( charas ) {
  function buildTemple( chara, amount ) {
    postData( `chara/sacrifice/${chara.charaId}/${amount}/false`, null ).then( ( d ) => {
      if ( d.State == 0 ) {
        console.log( `#${chara.charaId} ${chara.name} 献祭${amount} 获得金额 ₵${d.Value.Balance.toFixed(2)}` );
        $( '#autobuildButton' ).text( '[自动建塔]' );
        removeBuildTemple( chara.charaId );
      } else {
        console.log( `${d.Message}` );
      }
    } );
  }

  function postBid( chara, price, amount, Amount, Sacrifices ) {
    postData( `chara/bid/${chara.charaId}/${price}/${amount}`, null ).then( ( d ) => {
      if ( d.Message )
        console.log( `#${chara.charaId} ${chara.name} ${d.Message}` );
      else {
        console.log( `买入成交 #${chara.charaId} ${chara.name} ${price}*${amount}` );
        if ( ( Amount + Sacrifices + amount ) >= chara.target ) { //持股达到数量，建塔
          buildTemple( chara, chara.target - Sacrifices );
        }
      }
    } );
  }

  function getAskin( Asks, low_price ) {
    let [ price, amount ] = [ 0, 0 ];
    for ( let i = 0; i < Asks.length; i++ ) {
      if ( Asks[ i ].Price > 0 && Asks[ i ].Price <= low_price ) {
        amount += Asks[ i ].Amount;
        price = Asks[ i ].Price;
      }
    }
    return [ price, amount ];
  }

  function remove_myAsks( Asks, myAsks ) {
    for ( let i = 0; i < Asks.length; i++ ) {
      for ( let j = 0; j < myAsks.length; j++ ) {
        if ( formatAskPrice( Asks[ i ].Price ) == formatAskPrice( myAsks[ j ].Price ) )
          Asks[ i ].Amount -= myAsks[ j ].Amount;
      }
      if ( Asks[ i ].Amount == 0 )
        delete Asks[ i ];
    }
    Asks = remove_empty( Asks );
    return Asks;
  }
  for ( let i = 0; i < charas.length; i++ ) {
    let chara = charas[ i ];
    console.log( `自动建塔 check #${chara.charaId} ${chara.name}` );
    await getData( `chara/user/${chara.charaId}` ).then( ( d ) => {
      let myAsks = d.Value.Asks;
      let Amount = d.Value.Amount;
      let Sacrifices = d.Value.Sacrifices;
      if ( Sacrifices >= chara.target ) {
        removeBuildTemple( chara.charaId );
      } else if ( ( Amount + Sacrifices ) >= chara.target ) { //持股达到数量，建塔
        buildTemple( chara, chara.target - Sacrifices );
      } else
        getData( `chara/depth/${chara.charaId}` ).then( ( d ) => {
          let Asks = d.Value.Asks;
          Asks = remove_myAsks( Asks, myAsks );
          //console.log(Asks);
          let AskPrice = Asks[ 0 ] ? Asks[ 0 ].Price : 0;
          if ( AskPrice && AskPrice <= chara.bidPrice ) { //最低卖单低于买入上限，买入
            let [ price, amount ] = getAskin( Asks, chara.bidPrice );
            postBid( chara, price, Math.min( amount, chara.target - Amount - Sacrifices ), Amount, Sacrifices );
          }
        } );
    } );
  }
}
