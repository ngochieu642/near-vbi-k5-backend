import { Model } from 'mongoose';
import { GenericRepository } from '../../../domain/abstracts/GenericRepository';

export class MongoGenericRepository<T> implements GenericRepository<T> {
  private _repository: Model<T>;
  private readonly _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getAll(): Promise<T[]> {
    // Typescript suck. We have to cast this to our own type, or it will throw errors
    const results = (await this._repository.find().lean().populate(this._populateOnFind).exec()) as T[];
    return results;
  }

  get(id: any): any {
    return this._repository.findById(id).populate(this._populateOnFind).exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T): any {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
