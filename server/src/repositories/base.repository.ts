import { Document, Model, UpdateQuery } from "mongoose";
import { Repository } from "../interfaces/repository.interface";

export abstract class BaseRepository<T extends Document> implements Repository<T> {
    constructor(protected readonly _model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return await this._model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id).exec();
    }

    async findAll(): Promise<T[]> {
        return await this._model.find().exec();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this._model.findByIdAndUpdate(id, data as UpdateQuery<T>, { new: true }).exec();
    }
}
