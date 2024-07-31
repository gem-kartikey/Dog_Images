const express = require('express')

const app = express()

async function getImage()
{
    const API = 'https://dog.ceo/api/breeds/image/random'
    let response = await fetch(API)
    let result = await response.json()
    return result
}

app.get('/',async(req,res)=>{
    let image = await getImage();
    console.log(image)
    res.send(`<div style="height: 100vh; width: 100vw; display: grid; place-items: center;">
    <div style="height: 400px; width: 400px; background-image: url('${image.message}'); background-size: cover; background-position: center;"></div>
</div>`)
})

app.listen(4000,(err)=>{
    (err)?console.log(err.message):console.log(`server is online at http://localhost:4000`)
})