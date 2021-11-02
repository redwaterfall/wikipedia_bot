let text = document.querySelector('#textInput');
let mp3 = document.querySelector('#autoMp3')
let mp3Source = document.querySelector('#Mp3source')
let sendButton = document.querySelector('#send')



sendButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    console.log(text.value);
    postData('http://localhost:3000/',text.value)
    let URLaudio = await getURLaudio()
    console.log(URLaudio)
    mp3.setAttribute('src',URLaudio);
    mp3.load()
    mp3.play()
})

async function postData(url,data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-type': 'text/plain',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({data:data})//JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  async function getURLaudio(){
    return  fetch('http://localhost:3000')
    .then(response => response.text())
    .then((data) => {
        return data; 
    });
   

 
  }