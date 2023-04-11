import { Deserializable } from '../../common/model/deserializable.model';

export class Registration implements Deserializable {

  username: string;
  password: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

