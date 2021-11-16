/*
  *** BEGIN ASCII ART ***
        ___       __   ___  __   __
  |__| |__  |    |__) |__  |__) /__`
  |  | |___ |___ |    |___ |  \ .__/

  *** END ASCII ART ***

  "Look for the Helpers" -- Mr. Rogers

*/

//random gnar char generator
function getNewID() {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}

function getValuesFromURL(URL = window.location.href ){
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

function getAndClearCookie(cname) {
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

For Express.js setting a cookie looks something like this:

app.get('/',(req,res) => { 
  res.cookie('chaka', JSON.stringify({
    GITHUB_KEY: process.env.GITHUB_PERSONAL_TOKEN,
    GITHUB_USERNAME: process.env.GITHUB_USER_NAME
  }));

  res.sendFile(`${__dirname}/blah.html`)
})

*/


/*

  *** begin ascii art ***

    8888b.  88 .dP"Y8 88""Yb    db    888888  dP""b8 88  88
     8I  Yb 88 `Ybo." 88__dP   dPYb     88   dP   `" 88  88
     8I  dY 88 o.`Y8b 88"""   dP__Yb    88   Yb      888888
    8888Y"  88 8bodP' 88     dP""""Yb   88    YboodP 88  88

  *** end ascii art ***


  dispatches a custom event with a detail to the application.
  

*/

function dispatch(name, detail = {}, div = document){
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

function createNewDiv(divopt){
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

function ready(callbackFunction){
  if(document.readyState != 'loading')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}


function getURLValues(URL = window.location.href ){
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

function setURLValues(obj){
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    url += `&${key}=${obj[key]}`
  })
  history.pushState(obj, '', url)
}

// I always end up including this anyway: 

/**
 * Created by Jacob Strieb
 * May 2020
 */

var b64 = (function() {

  // Generate a dictionary with {key: val} as {character: index in input string}
  function generateIndexDict(a) {
    let result = {};
    for (let i = 0; i < a.length; i++) {
      result[a[i]] = i;
    }
    return result;
  }

  // Decode URL safe even though it is not the primary encoding mechanism
  const _a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const _aRev = generateIndexDict(_a);
  _aRev["-"] = _aRev["+"];
  _aRev["_"] = _aRev["/"];

  const _enc = new TextEncoder("utf-8");
  const _dec = new TextDecoder("utf-8");

  return {

    // Encode a string as base64
    decode: function(s) {
      return this.binaryToAscii(this.base64ToBinary(s));
    },

    // Decode base64 to a string
    encode: function(s) {
      return this.binaryToBase64(this.asciiToBinary(s));
    },

    // Convert a string to a Uint8Array
    // FIXME: TextEncoding and TextDecoding are not actually inverses
    asciiToBinary: function(text) {
      return _enc.encode(text);
    },


    // Convert a Uint8Array to a string
    // FIXME: TextEncoding and TextDecoding are not actually inverses
    binaryToAscii: function(binary) {
      return _dec.decode(binary);
    },


    // Return a base64-encoded string from a Uint8Array input
    binaryToBase64: function(originalBytes) {
      // Pad the output array to a multiple of 3 bytes
      let length = originalBytes.length;
      let added = (length % 3 == 0) ? 0 : (3 - length % 3);
      let bytes = new Uint8Array(length + added);
      bytes.set(originalBytes);

      let output = "";
      for (let i = 0; i < bytes.length; i += 3) {
        // Convert 3 8-bit bytes into 4 6-bit indices and get a character from
        // the master list based on each 6-bit index
        //    3 x 8-bit:  |------ --|---- ----|-- ------|
        // => 4 x 6-bit:  |------|-- ----|---- --|------|

        // Get the first 6 bits of the first byte
        output += _a[ bytes[i] >>> 2 ];
        // Merge the end 2 bits of the first byte with the first 4 of the second
        output += _a[ ((bytes[i] & 0x3) << 4) | (bytes[i + 1] >>> 4) ];
        // Merge the end 4 bits of the second byte with the first 2 of the third
        output += _a[ ((bytes[i + 1] & 0xF) << 2) | (bytes[i + 2] >>> 6) ];
        // Get the last 6 bits of the third byte
        output += _a[ bytes[i + 2] & 0x3F ];
      }

      // Turn the final "A" characters into "=" depending on necessary padding
      if (added > 0) {
        output = output.slice(0, -added) + ("=".repeat(added));
      }

      return output;
    },


    // Takes a Base64 encoded string and returns a decoded Uint8Array. Throws
    // an error if the input string does not appear to be a valid base64
    // encoding. Attempts to add padding to un-padded base64 strings.
    base64ToBinary: function(s) {
      let bytes = [];

      // Base64 strings have at most 2 padding characters to make their length
      // a multiple of 4, so they could be missing up to 2 characters and still
      // be valid. But if 3 padding characters would be needed, the input
      // cannot be valid. Try and add padding characters if necessary/possible.
      if (s.length % 4 == 1) {
        throw "Invalid base64 input";
      } else if (s.length % 4 != 0) {
        s += "=".repeat(4 - (s.length % 4));
      }

      for (let i = 0; i <= (s.length - 4); i += 4) {
        // Check that each character in this group of 4 is valid
        for (let j = 0; j < 4; j++) {
          if (s[i + j] != "=" && !(s[i + j] in _aRev)) {
            throw "Invalid base64 input";
          } else if (s[i + j] == "=" && Math.abs(s.length - (i + j)) > 2) {
            throw "Invalid base64 input";
          }
        }

        // Convert 4 6-bit indices into 3 8-bit bytes by finding the index of
        // each 6-bit character in the master list and combining
        //    4 x 6-bit:  |------|-- ----|---- --|------|
        // => 3 x 8-bit:  |------ --|---- ----|-- ------|

        // Get all 6 bits of the first byte and first 2 bits of the second byte
        bytes.push((_aRev[s[i]] << 2) | (_aRev[s[i + 1]] >>> 4));
        if (s[i + 2] != "=") {
          // If not padding, merge end 4 bits of the second byte and first 4 of
          // the third
          bytes.push(((_aRev[s[i + 1]] & 0xF) << 4) | (_aRev[s[i + 2]] >>> 2));
        }
        if (s[i + 3] != "=") {
          // If not padding, take the last 2 bits of the third byte and all 6 of
          // the fourth. Note that if the fourth byte is padding, then certainly
          // the third byte is, so we only have to check the fourth
          bytes.push(((_aRev[s[i + 2]] & 0x3) << 6) | _aRev[s[i + 3]]);
        }
      }

      return new Uint8Array(bytes);
    }

  }
})();
