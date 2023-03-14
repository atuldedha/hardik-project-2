import { IdField, LazyForeignKeyField, NumericField, PlainTextField, LongTextField, Model } from "../model-layout-inflator/models";
import { Relation } from "../model-layout-inflator/models/fields";
import { College } from "./college";

export class Student extends Model {

    static get _icon() {
        return "person";
    } 

    static id = new IdField("Id");
    static title = new PlainTextField('Name', 'title', true, true);
    static bio = new LongTextField('Bio');
    static college = new LazyForeignKeyField('College', College);
}