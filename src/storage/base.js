export function defineStorage( name, default_value ) {
  if ( !( name in localStorage ) ) {
    localStorage.setItem( name, JSON.stringify( default_value ) );
  }

  function getter() {
    return JSON.parse( localStorage.getItem( name ) );
  }

  function setter( v ) {
    localStorage.setItem( name, JSON.stringify( v ) );
  }
  return [ getter, setter ];
}
