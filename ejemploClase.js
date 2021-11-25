let express = require('express')
let app = express()
const PORT = 3000


app.get('/productos',(req,res,next) => {
    res.send(handlerDocs.getProds())
})

app.get('/', (req,res,next)=>{
    console.log(req.query);


    
})

app.listen(PORT, () => {
    console.log(`visto desde http://localhost:${PORT}`);
})