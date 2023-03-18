export class Service {
    constructor(dao){
        this.dao = dao;
    }

    save = async(obj) => {
        let id = await this.dao.save(obj);
        let result = await this.findById(id);
        return result;
    }

    getAll = async() => {
        return await this.dao.getAll();
    }

    findById = async(idBack) => {
        return await this.dao.findById(idBack);
    }

    update = async(idBack, prod) => {
        return await this.dao.update(prod, idBack);
    }

    deleteById = async(idBack) => {
        await this.dao.deleteById(idBack); 
        return await this.getAll();
    }
}