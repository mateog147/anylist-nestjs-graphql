import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SingupInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  fullname: string;
  @Field(() => String)
  password: string;
}
