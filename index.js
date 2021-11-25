let HandlerProds = require("./manejador")
let handlerDocs = new HandlerProds("prods.json")
const express = require('express')
let app = express();
const {Router} = express;
let router = new Router
let path = require('path')
const PORT = 3000;

//Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname,'html')))


app.get('/',(req,res,next) => {
    res.send('Bienvenidos')
})

router.get('/',(req,res,next) => {
    res.send(handlerDocs.getProds())
})

router.post('/',(req,res,next) =>{
    let {newProd} = req.body;
    console.log(newProd);
    res.send(handlerDocs.newProducto(newProd))
})

router.get('/:id',(req,res,next) => {
    //console.log(req.params);
    res.send(handlerDocs.getXProd(req.params))
    // res.send(handlerDocs.getXProd())
})
router.get('/productoss/:id',(req,res,next) => {

    res.send(handlerDocs.modifProd(req.params))
})

app.use('/productos', router)

app.listen(PORT, ()=> {
    console.log(`Server escuchando desde http://localhost:${PORT}`);
})
