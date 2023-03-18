import mongoose from 'mongoose';

export class MongoDAO{
    constructor(coleccion, schema){
        this.coleccion = mongoose.model(coleccion, schema);
    };

    async save (obj) {
        try{
            let db = await this.coleccion.find({});
            let objFix
            if (db.length == 0){
                objFix = {
                    idBack: 1,
                    ...obj
                }
                await this.coleccion.create(objFix);
            } else {
                objFix = {
                    idBack: db.length+1,
                    ...obj
                }
                await this.coleccion.create(objFix);
            }
            return objFix.idBack;
        }
        catch(err) {
            console.log(err.message);
        }    
    }

    async getAll () {
        try {
         let db = await this.coleccion.find({});
         return db;
        }
        catch(err) {
         console.log(err.message);
        }
    }

    async findById (idBack) {
        try {
            let idInt = parseInt(idBack);
            let obj = await this.coleccion.find({idBack : idInt});
            if(obj[0] == undefined) throw new Error();
            return obj;
           } catch (err) {
             console.log(err.message);
           }  
        }

    async update (prod, idBack) {
        try {
            let idInt = parseInt(idBack);
            let i = 0;
            for (let key in prod) {
                await this.coleccion.findOneAndUpdate({idBack: idInt},{ [key]: Object.values(prod)[i] });
                i++
            }
        } catch (err) {
            console.log(err.message);
        }  
    }

    async deleteById (idBack) {
        try {
            let idInt = parseInt(idBack)
            await this.coleccion.deleteOne({idBack: idInt});
        } catch (err) {
          console.log(err.message);
        }  
    }
}