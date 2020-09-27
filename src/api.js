const API = 'https://tinygrail.com/api/';

export function getData( url ) {
  if ( !url.startsWith( 'http' ) ) url = API + url;
  return new Promise( ( resovle, reject ) => {
    $.ajax( {
      url: url,
      type: 'GET',
      xhrFields: {
        withCredentials: true
      },
      success: res => {
        resovle( res )
      },
      error: err => {
        reject( err )
      }
    } );
  } );
}

export function postData( url, data ) {
  let d = JSON.stringify( data );
  if ( !url.startsWith( 'http' ) ) url = api + url;
  return new Promise( ( resovle, reject ) => {
    $.ajax( {
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: d,
      xhrFields: {
        withCredentials: true
      },
      success: res => {
        resovle( res )
      },
      error: err => {
        reject( err )
      }
    } );
  } );
}
