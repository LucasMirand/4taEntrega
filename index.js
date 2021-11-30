let HandlerProds = require("./manejador")
let handlerDocs = new HandlerProds("prods.json")
const express = require('express')
let app = express();
let cors = require('cors');
const {Router} = express;
let path = require('path')
const PORT = 3000;

//Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public','html')))

app.use(cors('*'))



//Routers
let router = new Router
let router2 = new Router

//Mostrar Prods
router.get('/',(req,res,next) => {
    res.send(handlerDocs.getProds())
})
//Mostrar por ID
router.get('/:id',(req,res,next) => {
    res.send(handlerDocs.getXProd(req.params))

})
//Agregar con postman
router.post('/',(req,res,next) =>{
    res.send(handlerDocs.newProducto(req.body))
})

//Agregar con html
router2.post('/',(req,res,next)=>{    
    res.send(handlerDocs.newProducto(req.body))
})

//Modificar por Id
router.put('/:id',(req,res,next) => {
    res.send(handlerDocs.modifProd(req.params , req.body))
})

//Eliminar por id
router.delete('/:id',(req,res,next) => {
    res.send(handlerDocs.deleteProd(req.params))
})


app.use('/productos', router)
app.use('/',router2)

app.listen(PORT, ()=> {
    console.log(`Server escuchando desde http://localhost:${PORT}`);
})
