import React, { useEffect, useState } from "react";
import { toCamelCase } from "../utils";
import {
  TextField,
  DataTableHeadCell,
  DataTableCell,
  Typography,
  ListDivider,
  CircularProgress,
} from "rmwc";
import { Link } from "react-router-dom";
import {
  SingleSelectDropdown,
  MultiSelectDropdown,
} from "../components/dropdowns";
import { ModelMaterialDataTable } from "../module";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";

export class Field {
  static htmlType = "text";
  constructor(
    label,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false
  ) {
    this.label = label;
    this.required = required;
    this.fieldIdentifier = fieldIdentifier
      ? fieldIdentifier
      : toCamelCase(label);
    this.isPrimaryLabel = isPrimaryLabel;
  }

  processOnDisplay(value) {
    return value;
  }

  processOnDeserialize(value) {
    return value;
  }

  processOnSerialize(value) {
    return value;
  }

  asInputField(value) {
    return (
      <TextField
        style={{ width: "100%", margin: "15px 6px" }}
        required={this.required}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }

  asHeaderField(moduleContext) {
    return <DataTableHeadCell>{this.label}</DataTableHeadCell>;
  }

  asCellField(id, value, moduleContext) {
    if (this.isPrimaryLabel) {
      return (
        <DataTableCell>
          <Link to={`${moduleContext.constructor.basePath}/${id}`}>
            {value}
          </Link>
        </DataTableCell>
      );
    }
    return <DataTableCell>{value}</DataTableCell>;
  }
}

export class IdField extends Field {
  constructor(
    label,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false,
    hidden = false
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    this.hidden = hidden;
  }
  asInputField(value) {
    return (
      <TextField
        disabled
        style={{ width: "100%", margin: "15px 6px" }}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }

  asHeaderField(moduleContext) {
    if (this.hidden) return;
    return <DataTableHeadCell>{this.label}</DataTableHeadCell>;
  }

  asCellField(id, value, moduleContext) {
    if (this.hidden) return;
    if (this.isPrimaryLabel) {
      return (
        <DataTableCell>
          <Link to={`${moduleContext.constructor.basePath}/${id}`}>
            {value}
          </Link>
        </DataTableCell>
      );
    }
    return <DataTableCell>{value}</DataTableCell>;
  }
}

export class PlainTextField extends Field {}

export class LongTextField extends Field {
  constructor(
    label,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false,
    hidden = false
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    this.hidden = hidden;
  }

  asInputField(value) {
    return (
      <TextField
        textarea
        rows={8}
        resizeable
        style={{ width: "100%", margin: "15px 6px" }}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }

  asHeaderField(moduleContext) {
    if (this.hidden) return;
    return <DataTableHeadCell>{this.label}</DataTableHeadCell>;
  }

  asCellField(id, value, moduleContext) {
    if (this.hidden) return;
    if (this.isPrimaryLabel) {
      return (
        <DataTableCell>
          <Link to={`${moduleContext.constructor.basePath}/${id}`}>
            {value}
          </Link>
        </DataTableCell>
      );
    }
    return <DataTableCell>{value}</DataTableCell>;
  }
}

export class NumericField extends Field {
  static htmlType = "number";
  constructor(
    label,
    min = null,
    max = null,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    this.min = min;
    this.max = max;
  }

  asInputField(value) {
    return (
      <TextField
        min={this.min}
        max={this.max}
        style={{ width: "100%", margin: "15px 6px" }}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }
}

export class EagerForeignKeyField extends Field {
  constructor(
    label,
    fetchValues = async () => {},
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false,
    nestedParameter = "id",
    buildUrl = null,
    lazyFetch = null
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    this.nestedParameter = nestedParameter;
    this.buildUrl = buildUrl;
    this.fetchValues = fetchValues;
  }
}

export class LazyForeignKeyField extends Field {
  //TODO: Transfer generation of this into ModelBasedModule. Can be then associated as LazyForeignKeyField('someId', module={()=>new ModelBasedModule()})
  //buildurl   (id)=>id or (id)=>""
  constructor(
    label,
    model,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false,
    nestedParameter = false
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    //If nested param is true value is Id, else value[nestedParameter] is the id.
    this.model = model;
    this.nestedParameter = nestedParameter;
    this.buildUrl = (id) => model.getUrl(id);
    this.fetchValues = () => model.service.search("");
    this.lazyFetch = (id) => this.model.service.get(id);
    // this.lazyFetch = this.model.service.get.bind(this.model.service);
  }

  processOnDisplay(value) {
    return (
      <LazyForeignKeyData
        id={value}
        lazyFetch={this.lazyFetch}
        buildUrl={this.buildUrl}
      />
    );
  }

  asInputField(value) {
    return (
      <SingleSelectDropdown
        fetchUsing={this.fetchValues}
        style={{ width: "100%", margin: "15px 6px" }}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }

  processOnDeserialize(value) {
    if (this.nestedParameter === false) {
      return value;
    }
    return value[this.nestedParameter];
  }

  asCellField(id, value, moduleContext) {
    return (
      <DataTableCell>
        {" "}
        <LazyForeignKeyData
          id={value}
          lazyFetch={this.lazyFetch}
          buildUrl={this.buildUrl}
        />
      </DataTableCell>
    );
  }
}

export class ForeignKeyField extends Field {
  constructor(
    label,
    model,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    this.model = model;
    this.buildUrl = (id) => model.getUrl(id);
    this.fetchValues = () => model.service.search("");
    this.lazyFetch = (id) => this.model.service.get(id);

    //this.lazyFetch = model.service.get;
  }

  processOnDisplay(value) {
    return (
      <LazyForeignKeyData
        id={value}
        lazyFetch={this.lazyFetch}
        buildUrl={this.buildUrl}
      />
    );
  }

  asInputField(value) {
    return (
      <SingleSelectDropdown
        postSelectProcess={async (id) => this.model.service.get(id)}
        fetchUsing={this.fetchValues}
        style={{ width: "100%", margin: "15px 6px" }}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }

  processOnDeserialize(value) {
    return this.model.deserialize(value);
  }

  asCellField(id, value, moduleContext) {
    return (
      <DataTableCell>
        {" "}
        <Link to={this.buildUrl(id)}>{value}</Link>
      </DataTableCell>
    );
  }
}

export class LazyRelation extends Field {}

export class Relation extends Field {
  constructor(
    label,
    model,
    fieldIdentifier = null,
    required = false,
    isPrimaryLabel = false,
    filterParameter = null
  ) {
    super(label, fieldIdentifier, required, isPrimaryLabel);
    this.model = model;
    this.buildUrl = (id) => model.getUrl(id);
    this.fetchValues = () => model.service.search("");
    this.lazyFetch = (id) => this.model.service.get(id);
    this.filterParameter =
      filterParameter !== null
        ? filterParameter
        : `${toCamelCase(this.model._name)}Id`;
    const parent = this;
    this.fetchRelated = (ids) => {
      // const filters = {};
      // filters[parent.filterParameter] = parentId;
      // console.log(model._pluralName)
      return model.service.getBulk(ids);
    };
  }

  asInputField(value) {
    return (
      <MultiSelectDropdown
        fetchUsing={this.fetchValues}
        style={{ width: "100%", margin: "15px 6px" }}
        key={this.fieldIdentifier}
        name={this.fieldIdentifier}
        label={this.label}
        type={this.constructor.htmlType}
        value={value}
      />
    );
  }

  asHeaderField(moduleContext) {
    return <></>;
  }

  asCellField(id, value, moduleContext) {
    return <></>;
  }

  processOnDisplay(value, parent) {
    return <LazyRelatedFieldData field={this} parent={parent} value={value} />;
  }
}

const LazyRelatedFieldData = ({ field, parent }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      console.log(
        field.fieldIdentifier,
        parent,
        parent[field.fieldIdentifier],
        parent[field.fieldIdentifier].split(",")
      );
      field
        .fetchRelated(parent[field.fieldIdentifier].split(","))
        .then((data) => {
          if (data === null) {
            setLoading(false);
          } else {
            console.log(data);
            setValue(data);
          }
        });
    }
  }, [loading]);

  useEffect(() => {
    if (value !== null) {
      setLoading(false);
    }
  }, [value]);

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
  }, [location]);
  return (
    <div style={{ width: "100%" }}>
      <br />
      <Typography use={"headline4"} theme={["primary"]}>
        {field.model._pluralName}
      </Typography>
      <ListDivider />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {value !== null && value !== undefined ? (
          value.length > 0 ? (
            <ModelMaterialDataTable
              refreshCallBack={() => setLoading(true)}
              moduleContext={field.model.module}
              model={field.model}
              data={value}
            />
          ) : (
            <Typography
              style={{
                justifyContent: "center",
                width: "100%",
                display: "flex",
              }}
              use={"subtitle1"}
            >
              No results to display
            </Typography>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const LazyForeignKeyData = ({ id, lazyFetch, buildUrl }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      lazyFetch(id).then((data) => {
        if (data === null) {
          setLoading(false);
        } else {
          setValue(data.getDisplayText());
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    if (value !== null) {
      setLoading(false);
    }
  }, [value]);

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
  }, [location]);
  if (loading) {
    return (
      <>
        {" "}
        <CircularProgress /> Loading...
      </>
    );
  }
  if (value === null || value === undefined || value === "") {
    return <></>;
  }
  if (buildUrl == null) {
    return <>{value}</>;
  }
  return <Link to={buildUrl(id)}>{value}</Link>;
};
