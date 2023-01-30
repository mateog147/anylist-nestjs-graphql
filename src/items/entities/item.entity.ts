import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'items' })
export class Item {
  @Field(() => ID, { description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'item name' })
  @Column()
  name: string;

  @Field(() => Float)
  @Column()
  quantity: number;

  @Field(() => String)
  @Column()
  quantityUnits: string;
}
