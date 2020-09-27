export function menuItemClicked( callback ) {
  $( '.timelineTabs a' ).removeClass( 'focus' );
  $( '.timelineTabs a' ).removeClass( 'top_focus' );
  $( '#helperMenu' ).addClass( 'focus' );
  if ( callback )
    callback( 1 );
}
