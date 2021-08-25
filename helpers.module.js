/*
  *** BEGIN ASCII ART ***
        ___       __   ___  __   __
  |__| |__  |    |__) |__  |__) /__`
  |  | |___ |___ |    |___ |  \ .__/

  *** END ASCII ART ***

  "Look for the Helpers" -- Mr. Rogers

*/

//random gnar char generator
export function getNewID() {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}

export function getValuesFromURL(URL = window.location.href ){
  const search_params = new URLSearchParams(URL)
  let options = {
  }
  for (const [key, unparsed_value] of search_params) {
    if(key !== window.location.origin + window.location.pathname + '?' ){
      try {
        const value = JSON.parse(decodeURI(unparsed_value))
        options[key] = value
      } catch {
        options[key] = decodeURI(unparsed_value)
      }
    }
  }
  return options
}

export function parseCoord(coord){
  return `${coord.x.toFixed(4)} ${coord.y.toFixed(4)} ${coord.z.toFixed(4)}`
}

export function getAndClearCookie(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

  return ""
}


/*

  *** begin ascii art ***

    8888b.  88 .dP"Y8 88""Yb    db    888888  dP""b8 88  88
     8I  Yb 88 `Ybo." 88__dP   dPYb     88   dP   `" 88  88
     8I  dY 88 o.`Y8b 88"""   dP__Yb    88   Yb      888888
    8888Y"  88 8bodP' 88     dP""""Yb   88    YboodP 88  88

  *** end ascii art ***


  dispatches a custom event with a detail to the application.
  

*/

export function dispatch(name, detail = {}, div = document){
  const initialize_event = new CustomEvent(name, {detail: detail})
  div.dispatchEvent(initialize_event)
}


/*

  Create New Div with the options set as attributes

*/

const input_types = ["button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week"]

export function createNewDiv(divopt){
  let div
  if(input_types.indexOf(divopt.type) > -1){
    div = document.createElement('input')
    div.type = divopt.type
  } else {
    div = document.createElement(divopt.type ? divopt.type : 'div')
  }
  delete divopt.type
  Object.keys(divopt).forEach(key => {
    div.setAttribute(key, divopt[key])
  })
  return div
}

/*
    
    READY

    Use Like:

    ready(event => {
      
    })

*/

export function ready(callbackFunction){
  if(document.readyState != 'loading')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}


export function getURLValues(URL = window.location.href ){
  const search_params = new URLSearchParams(URL)
  let options = {}
  for (const [key, unparsed_value] of search_params) {
    if(key !== window.location.origin + window.location.pathname + '?' ){
      try {
        const value = JSON.parse(decodeURI(unparsed_value))
        options[key] = value
      } catch {
        options[key] = decodeURI(unparsed_value)
      }
    }
  }
  return options
}

export function setURLValues(obj){
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    url += `&${key}=${obj[key]}`
  })
  history.pushState(obj, '', url)
}
