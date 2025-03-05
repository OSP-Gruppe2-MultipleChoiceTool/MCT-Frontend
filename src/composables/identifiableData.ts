
export class IdentifiableData<T> {
  id: string;
  data: T;

  constructor(data: T) {
    this.id = crypto.randomUUID();
    this.data = data;
  }
}
