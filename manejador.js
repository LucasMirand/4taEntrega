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
                if (mayorId < arrayProds[i].id){
                    mayorId =  (arrayProds[i].id+1)
                }
            }
            let idNewProd = {id: mayorId}
            let prodAdd = Object.assign(idNewProd, newProd)
            arrayProds.push(prodAdd)
            
            let jsonData = JSON.stringify(arrayProds,null,2)
            console.log(jsonData);
            let escribe = fs.writeFileSync(this.url, jsonData)
            return prodAdd;
        } catch (error) {
            return 'Error en NewProd'
        }
    }

    modifProd(prodAMod){
        let data = fs.readFileSync('./prods.json')
        let arrayProds = JSON.parse(data)
        try {
            let status = false
            for (let i = 0; i < arrayProds.length; i++) {
                
                if (Number(prodAMod.id) === arrayProds[i].id){
                   arrayProds[i] = prodAMod
                   status = true
                }
            }

            if (status === true) {
                let jsonData = JSON.stringify(arrayProds,null,2)
                console.log(jsonData);
                let escribe = fs.writeFileSync(this.url, jsonData)
                return prodAMod;
            } else {
                return 'Error Modificando'
            }
        } catch (error) {
            return 'Error en Modificador'
        }
    }
}



module.exports = HandlerProds