export function mergeorderList( orderListHistory ) {
  let mergedorderList = [],
    i = 0;
  mergedorderList.push( orderListHistory[ 0 ] );
  for ( let j = 1; j < orderListHistory.length; j++ ) {
    if ( ( orderListHistory[ j ].Price == mergedorderList[ i ].Price ) && Math.abs( new Date( orderListHistory[ j ].TradeTime ) - new Date( mergedorderList[ i ].TradeTime ) ) < 10 * 1000 ) {
      //10s内同价格订单合并
      mergedorderList[ i ].Amount += orderListHistory[ j ].Amount;
    } else {
      mergedorderList.push( orderListHistory[ j ] );
      i++;
    }
  }
  return mergedorderList;
}
