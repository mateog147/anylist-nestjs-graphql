import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemInput } from './dto/inputs';
import { UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}
  async create(createItemInput: CreateItemInput) {
    const newItem = new Item();
    newItem.name = createItemInput.name;
    newItem.quantity = createItemInput.quantity;
    newItem.quantityUnits = createItemInput.quantityUnits;
    return await this.repository.save(newItem);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    const item = this.repository.findOneByOrFail({ id: id });
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    /*const item = await this.findOne(id);
    if (updateItemInput.name) {
      item.name = updateItemInput.name;
    }

    if (updateItemInput.quantity) {
      item.quantity = updateItemInput.quantity;
    }

    if (updateItemInput.quantityUnits) {
      item.quantityUnits = updateItemInput.quantityUnits;
    }*/

    //o mejor

    const item = await this.repository.preload(updateItemInput);

    return await this.repository.save(item);
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);
    await this.repository.remove(item);
    //return `Item with Id ${id} deleted successfully`;
    return { ...item, id };
  }
}
