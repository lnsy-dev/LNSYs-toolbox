# lnsys-toolbox
Snippets, shims and notes that I have gathered together over the years. 


## Snippets and Ideas

```javascript
 let div_array = [...document.querySelectorAll('div')]

 while(div_array.length > 0){
  const div = div_array.pop()
  console.log(div)
 }

```

You could use a forEach or Map, but this is really useful for queuing in an asynchronous system.
```javascript
let div_array = [...document.querySelectorAll('div')]

async function blah_generator(){
 while(div_array.length > 0){
  const div = div_array.pop()
  const res = await fetch('blah').then(res => res.json())
  // do something to this specific div
  // this function will wait for this specific
  // item to be finished before moving onto the next
 }
}

blah_generator()

```

I use this in webworkers a lot to handle a largish queus of processor heavy items. 
