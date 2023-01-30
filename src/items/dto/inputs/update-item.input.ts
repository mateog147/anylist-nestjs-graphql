import { CreateItemInput } from './create-item.input';
import { InputType, Field, Int, PartialType, ID, Float } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  id: string;
  //como estamos extendiendo como partial type nos va a traer todo de alla pero como opcional
}
