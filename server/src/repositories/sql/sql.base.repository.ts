import { Model, ModelStatic, WhereOptions } from "sequelize";

export abstract class SqlBaseRepository<
    T extends Model,
    CA extends object = object
> {
    constructor(protected readonly _model: ModelStatic<T>) { }

    async create(data: CA): Promise<T> {
        return this._model.create(data as any);
    }

    async findById(id: number): Promise<T | null> {
        return this._model.findByPk(id);
    }

    async findByMongoId(mongoId: string): Promise<T | null> {
        return this._model.findOne({ where: { mongoId } as WhereOptions });
    }

    async findAll(): Promise<T[]> {
        return this._model.findAll();
    }

    async update(id: number, data: Partial<CA>): Promise<T | null> {
        const record = await this._model.findByPk(id);
        if (!record) return null;
        return record.update(data as any);
    }

    async updateByMongoId(mongoId: string, data: Partial<CA>): Promise<T | null> {
        const record = await this._model.findOne({
            where: { mongoId } as WhereOptions,
        });
        if (!record) return null;
        return record.update(data as any);
    }

    async deleteByMongoId(mongoId: string): Promise<void> {
        await this._model.destroy({ where: { mongoId } as WhereOptions });
    }
}
