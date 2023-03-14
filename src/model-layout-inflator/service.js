import { Model } from "./models";

export class ModelCrudService {
  static masterData = {};

  static model = Model;
  //static mockedData = {};
  static searchField = "id";

  static get mockedData() {
    console.log(this.model);
    if (
      this.masterData[this.model._name] == undefined ||
      this.masterData[this.model._name] == null
    ) {
      this.masterData[this.model._name] = {};
    }
    return this.masterData[this.model._name];
  }

  constructor(mocked = false) {
    this.mocked = mocked;
  }

  async search(query) {
    return Object.keys(this.constructor.mockedData)
      .filter((key) =>
        String(
          this.constructor.mockedData[key][this.constructor.searchField]
        ).includes(query)
      )
      .map((key) =>
        this.constructor.model.deserialize(this.constructor.mockedData[key])
      );
  }

  async save(instance) {
    if (instance.id === null || instance.id === undefined) {
      instance.id = Object.keys(this.constructor.mockedData).length;
    }
    this.constructor.mockedData[instance.id] = instance;
    return this.constructor.model.deserialize(instance);
  }

  async get(id) {
    if (this.constructor.mockedData[id] === undefined) {
      return null;
    }
    return this.constructor.model.deserialize(this.constructor.mockedData[id]);
  }

  async delete(id) {
    if (this.constructor.mockedData[id] !== undefined) {
      delete this.constructor.mockedData[id];
    } else {
      throw new Error("Id does not exist");
    }
  }

  async filter(filters) {
    let data = Object.keys(this.constructor.mockedData).map(
      (key) => this.constructor.mockedData[key]
    );
    for (let key in filters) {
      data = data.filter((record) => record[key] === filters[key]);
    }
    return data.map((record) => this.constructor.model.deserialize(record));
  }

  async getBulk(ids) {
    let data = Object.keys(this.constructor.mockedData).map(
      (key) => this.constructor.mockedData[key]
    );
    data = data.filter((record) => ids.includes(`${record.id}`));
    return data.map((record) => this.constructor.model.deserialize(record));
  }
}
