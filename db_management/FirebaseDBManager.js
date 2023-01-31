// CRUD Firebase
export default class CRUD_Firebase {
    constructor(_db) {
        this.db = _db;
    }

    async create(collection, data) {
        return await this.db.collection(collection).add(data);
    }

    async readAll(collection) {
        return await this.db.collection(collection).get();
    }

    async update(collection, docId, data) {
        return await this.db.collection(collection).doc(docId).update(data);
    }

    async delete(collection, docId) {
        return await this.db.collection(collection).doc(docId).delete();
    }
}
