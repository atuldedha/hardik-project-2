import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  IdField,
  LazyForeignKeyField,
  NumericField,
  PlainTextField,
  LongTextField,
  Model,
} from "../model-layout-inflator/models";
import { Field, Relation } from "../model-layout-inflator/models/fields";
import { College } from "./college";
import { Job } from "./jobs";
import { Student } from "./student";
import { Checkbox, TextField, Typography } from "rmwc";

// class that renders the start and end date inputs
class DatePick extends Field {
  asInputField(value) {
    return <DatePickComponent parent={this} />;
  }
}

// class to render checkbox compoent
class OnCmapusCheck extends Field {
  asInputField(value) {
    return <CampusCheckComponent parent={this} />;
  }
}

export class Drive extends Model {
  static get _icon() {
    return "work";
  }

  static id = new IdField("Id", null, false, false, true);
  static title = new PlainTextField("Title", null, true, true);
  static openings = new NumericField("Openings", 0);
  static filled = new NumericField("Filled", 0);
  static startDate = new DatePick("Start Date - End Date", "date");
  static description = new LongTextField(
    "Description",
    null,
    false,
    false,
    true
  );
  static college = new LazyForeignKeyField("College", College);
  static jobDescriptions = new Relation("Job Descriptions", Job);
  static students = new Relation("Students", Student);
  static onCampus = new OnCmapusCheck("On Campus", "onCampus");
}

// added start and end date inputs
const DatePickComponent = ({ parent }) => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
  );

  const [combined, setCombined] = useState(`${startDate}-${endDate}`);

  useEffect(() => {
    setCombined(`${startDate}-${endDate}`);
  }, [startDate, endDate]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingLeft: "10px",
          margin: "15px 0",
        }}
      >
        <Typography>Start Date</Typography>
        <input
          type="date"
          style={{
            padding: "5px",
            borderRadius: "6px",
            border: "1px solid var(--gray2)",
          }}
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingLeft: "10px",
        }}
      >
        <Typography>End Date</Typography>
        <input
          type="date"
          style={{
            padding: "5px",
            borderRadius: "6px",
            border: "1px solid var(--gray2)",
          }}
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Box>
      <TextField
        value={combined}
        style={{ display: "none" }}
        name={parent.fieldIdentifier}
        onChange={() => {}}
      />
    </Box>
  );
};

// on campus off campus checkbox component
const CampusCheckComponent = ({ parent }) => {
  const [onCampus, setOnCampus] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "space-evenly",
      }}
    >
      <Checkbox
        label="On Campus"
        checked={onCampus}
        onChange={(e) => setOnCampus(e.currentTarget.checked)}
      />
      <Checkbox
        label="Off Campus"
        checked={!onCampus}
        onChange={(e) => setOnCampus(!e.currentTarget.checked)}
      />
      <TextField
        value={onCampus}
        style={{ display: "none" }}
        name={parent.fieldIdentifier}
        onChange={() => {}}
      />
    </Box>
  );
};
