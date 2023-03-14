import { ModelCrudService } from "../service";
import { Field, LazyForeignKeyField } from "./fields";
import { ModelBasedModule } from "../module";
export {
  Field,
  LazyForeignKeyField,
  LongTextField,
  PlainTextField,
  IdField,
  NumericField,
} from "./fields";

export class DataModel {
  // static _name = `${this.name}`;

  static get _icon() {
    return "icon";
  }

  static get _searchField() {
    return "id";
  }

  static get _name() {
    return this.name;
  }
  static get _pluralName() {
    return `${this._name}s`;
  }

  getDisplayText() {
    return this[
      this.constructor
        .getFields()
        .find((value) => this.constructor[value].isPrimaryLabel)
    ];
  }

  static getFields() {
    const keys = [];
    for (var key of [...Object.keys(Model), ...Object.keys(this)]) {
      if (this[key] instanceof Field) {
        keys.push(key);
      }
    }
    console.log(keys);
    return keys;
  }
}

export class SerializableModel extends DataModel {
  static deserialize(data) {
    const newObject = new this();
    for (var key of Object.keys(this)) {
      if (this[key] instanceof Field) {
        if (this[key] instanceof LazyForeignKeyField) {
          newObject[key] = this[key].processOnDeserialize(
            data[this[key].fieldIdentifier]
          );
        } else if (data[key] !== undefined) {
          newObject[key] = this[key].processOnDeserialize(
            data[this[key].fieldIdentifier]
          );
          //newObject[key] = this[key].processOnDeserialize(data[key]);
        } else {
          if (this[key].required) {
            throw new Error(`Required Field ${this[key].label} is empty`);
          }
        }
      }
    }
    console.log(newObject);
    return newObject;
  }
}

export class ServiceBasedModel extends SerializableModel {
  static get service() {
    const model = this;
    const modelServiceClass = class ModelServiceClass extends ModelCrudService {
      static model = model;
      static searchField = model._searchField;
    };

    return new modelServiceClass();
  }
}

export class RenderableServiceBasedModel extends ServiceBasedModel {
  static get module() {
    const _model = this;
    const module = class ModelModule extends ModelBasedModule {
      static model = _model;
      static icon = _model._icon;
      static service = _model.service;
    };
    return new module(true, true, true, true);
  }

  static get baseUrl() {
    return;
  }

  static getUrl(id) {
    return `${this.module.constructor.basePath}/${id}`;
  }
}

export class Model extends RenderableServiceBasedModel {}
