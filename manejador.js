const { profileEnd } = require("console");
const fs = require("fs")

class HandlerProds{
    constructor(url) {
        this.url = url
    }
    getProds() {
       try {
        let showProds = fs.readFileSync(this.url,"utf-8")    
        return showProds
       } catch (error) {
           console.log('Error en getProd');
       } 
    }

    getXProd(idP) {
        let data = fs.readFileSync('./prods.json')
        let prods = JSON.parse(data)
        console.log(idP.id);
        try {
            let contador = 0
            prods.forEach(element => {
                if (Number(element.id) === Number(idP.id) ) {
                    contador++
                }
            });
            if (contador != 0) {
                let prodX = prods.filter(prod => Number(prod.id) === Number(idP.id))
                return prodX
            } else {
                return 'error al ingresar el id'
            }
            
        } catch (error) {
            console.log('Error en GetXProd');
        }
    }

    newProducto(newProd){
        let data = fs.readFileSync('./prods.json')
        let arrayProds = JSON.parse(data)
        
        try {
            let mayorId=0
            for (let i = 0; i < arrayProds.length; i++) {
                const element = arrayProds[i];
                // console.log(arrayProds[i]);
                if (mayorId <= element.id){
                    mayorId =  (element.id+1)
                }
            }
            newProd.precio = Number(newProd.precio)
            let idNewProd = {id: Number(mayorId)}

            let prodAdd = Object.assign(idNewProd, newProd)
            console.log(prodAdd);
            arrayProds.push(prodAdd)
            let jsonData = JSON.stringify(arrayProds,null,2)
            let escribe = fs.writeFileSync('./prods.json', jsonData)
            return prodAdd;
        } catch (error) {
            return 'Error en NewProd'
        }
    }

    modifProd(idMod, objMod){
        let data = fs.readFileSync('./prods.json')
        let arrayProds = JSON.parse(data)
        let num = Number(idMod.id)
        let posicion
        try {
            let status = false
            for (let i = 0; i < arrayProds.length; i++) {
                if(num === arrayProds[i].id) {
                    let idEnco = {id: num}
                    let modificador = Object.assign(idEnco, objMod)
                    arrayProds[i] = modificador
                    status = true 
                    console.log(arrayProds[i]);
                    posicion = i
                }
            }

            let jsonData = JSON.stringify(arrayProds,null,2)
            console.log(jsonData);
            let escribe = fs.writeFileSync('./prods.json', jsonData)
            return arrayProds[posicion]

            if (status === false) {
                return 'No se encontró id'
            }
            
        } catch (error) {
            return error
        }
    }


    deleteProd(idDel){
        let data = fs.readFileSync('./prods.json')
        let arrayProds = JSON.parse(data)
        let num = Number(idDel.id)
        let posicion
        let eliminado
        try {
            for (let i = 0; i < arrayProds.length; i++) {
            if (num === arrayProds[i].id) {
                console.log(arrayProds[posicion]);
                eliminado = arrayProds.splice(i,1)
                posicion = i
            }
            
        }    
            let jsonData = JSON.stringify(arrayProds,null,2)
            // console.log(jsonData);
            let escribe = fs.writeFileSync('./prods.json', jsonData)
            return eliminado
        } catch (error) {
            return error   
        }


        

    }


}



module.exports = HandlerProds