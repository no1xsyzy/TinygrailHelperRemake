export function listItemClicked() {
  let link = $( this ).find( 'a.avatar' ).attr( 'href' );
  if ( link ) {
    if ( parent.window.innerWidth < 1200 ) {
      $( parent.document.body ).find( "#split #listFrameWrapper" ).animate( {
        left: '-450px'
      } );
    }
    window.open( link, 'right' );
  }
}
