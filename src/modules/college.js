import {
  IdField,
  LazyForeignKeyField,
  NumericField,
  PlainTextField,
  LongTextField,
  Model,
} from "../model-layout-inflator/models";
import { Relation } from "../model-layout-inflator/models/fields";

export class College extends Model {
  static get _icon() {
    return "school";
  }

  static id = new IdField("Id", null, false, false, true);
  static title = new PlainTextField("Name", "title", true, true);
  static description = new LongTextField("Description");
  static location = new PlainTextField("Location", "location");
  static pointOfContact = new PlainTextField(
    "Point of Contact",
    "pointOfContact"
  );
}
