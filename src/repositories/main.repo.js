class MainRepository {
    constructor(model){
        this.model = model
    }

    async get(){
        const getOp = await this.model.find({});
        return getOp;
    }

    async getById(id){
        return await this.model.findById(id)
    }

    async getManyByCriteria(data){
        return await this.model.find(data)
    }

    async getOneByCriteria(data){
        return await this.model.findOne(data)
    }

    async update(id, data){
        return await this.model.findByIdAndUpdate(id, data)
    }

    async delete(id){
        return await this.model.findByIdAndDelete(id)
    }
}


module.exports = MainRepository