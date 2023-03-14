import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Select, TextField } from "rmwc";
import {
  IdField,
  LazyForeignKeyField,
  NumericField,
  PlainTextField,
  LongTextField,
  Model,
} from "../model-layout-inflator/models";
import {
  CTCTextFields,
  Field,
  Relation,
} from "../model-layout-inflator/models/fields";
import { Typography } from "@mui/material";

class CTCCompoundField extends Field {
  asInputField(value) {
    return <CTCInputs parent={this} />;
  }
}

class JobTypeField extends Field {
  asInputField(value) {
    return <SelectField parent={this} />;
  }
}

export class Job extends Model {
  static get _icon() {
    return "work";
  }

  static id = new IdField("Id", null, false, false, true);
  static title = new PlainTextField("Title", null, true, true);
  static openings = new NumericField("Openings", 0);
  static filled = new NumericField("Filled", 0);
  static description = new LongTextField(
    "Description",
    null,
    false,
    false,
    true
  );
  static ctc = new CTCCompoundField("CTC", "ctc", true);
  static jobType = new JobTypeField("Job Type", "jobType");
}

const CTCInputs = ({ parent }) => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [combined, setCombined] = useState(`${min} - ${max}`);

  useEffect(() => {
    setCombined(`${min} - ${max}`);
  }, [min, max]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography
        sx={{ fontFamily: "", fontSize: "18px", paddingLeft: "10px" }}
      >
        CTC
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <TextField
          value={min}
          onChange={(e) => setMin(e.target.value)}
          key={parent.fieldIdentifier + "min"}
          label={"Min"}
          placeholder="Min CTC"
          style={{ width: "100%" }}
        />
        <TextField
          value={max}
          onChange={(e) => setMax(e.target.value)}
          key={parent.fieldIdentifier + "max"}
          label={"Max"}
          placeholder="Max CTC"
          style={{ width: "100%" }}
        />
        <TextField
          value={combined}
          style={{ display: "none" }}
          name={parent.fieldIdentifier}
          onChange={() => {}}
        />
      </Box>
    </Box>
  );
};

const SelectField = ({ parent }) => {
  const [selected, setSelected] = useState("Full-time");
  return (
    <Box
      sx={{
        marginTop: "10px",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        sx={{ fontFamily: "", fontSize: "18px", paddingLeft: "10px" }}
      >
        Job Type
      </Typography>
      <Select
        value={selected}
        style={{ width: "100%" }}
        name={parent.fieldIdentifier}
        key={parent.fieldIdentifier}
        label={parent.label}
        options={["Full-time", "Part-time", "Internship"]}
        onChange={(e) => setSelected(e.currentTarget.value)}
      />
    </Box>
  );
};
