import $ from 'jquery'
const API = 'https://tinygrail.com/api/'

export function getData (url) {
  if (!url.startsWith('http')) url = API + url
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      xhrFields: {
        withCredentials: true
      },
      success: res => {
        resolve(res)
      },
      error: err => {
        reject(err)
      }
    })
  })
}

export function postData (url, data) {
  const d = JSON.stringify(data)
  if (!url.startsWith('http')) url = API + url
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: d,
      xhrFields: {
        withCredentials: true
      },
      success: res => {
        resolve(res)
      },
      error: err => {
        reject(err)
      }
    })
  })
}
