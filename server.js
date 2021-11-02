let express = require('express');
const { getAudioURL } = require('./sound');
let app = express();
const cors = require('cors')


let PORT = process.env.PORT | 3000;


let answearString = "";
app.use(
    cors()
)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//må ha for å sende req.body
app.use(express.static('public'));



app.put('/',async (req, res)=>{
    let data = await req.body
    console.log(`${data.data}`)
    answearString = data.data
})

app.get('/',async (req, res)=>{
    let url = await getAudioURL(`${answearString}`)
    res.send(url)
})

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})