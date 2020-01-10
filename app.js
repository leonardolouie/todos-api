const express =require('express')

const app = express();


app.get('/', (req, res) => {

    res.send('we are home')
})

app.listen('3000', (err)=> { 
     
    if(err) { 
        console.log(err)
    }

})