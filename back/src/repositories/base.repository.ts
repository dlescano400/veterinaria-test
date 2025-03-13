import { Repository, EntityTarget, DeepPartial, DataSource, FindOptionsWhere } from "typeorm";

// Interfaz para asegurar que T tiene un campo id
interface HasId {
    id: string;
}

export class BaseRepository<T extends HasId> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>, dataSource: DataSource) {
        this.repository = dataSource.getRepository(entity);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<T | null> {
        return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
    }

    async update(id: string, data: DeepPartial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (!entity) return null;
        
        Object.assign(entity, data);
        return await this.repository.save(entity);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
