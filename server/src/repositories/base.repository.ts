import { Document, Model, UpdateQuery } from "mongoose";
import { Repository } from "../interfaces/repository.interface";

export abstract class BaseRepository<T extends Document> implements Repository<T> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async findAll(): Promise<T[]> {
        return await this.model.find().exec();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data as UpdateQuery<T>, { new: true }).exec();
    }
}
