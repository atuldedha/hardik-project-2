import React, { useEffect, useState } from "react";
import {
  Chip,
  ChipSet,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Select,
  Button,
  List,
  ListItem,
  ListItemMeta,
  Checkbox,
} from "rmwc";
import { Model } from "../models";

export const SingleSelectDropdown = ({
  fetchUsing = async () => [],
  postSelectProcess = async (id) => id,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [value, setValue] = React.useState(props.value ? props.value : null);
  useEffect(() => {
    if (loading) {
      fetchUsing()
        .then((data) => {
          setData(
            data.map((record) => {
              if (record instanceof Model) {
                return {
                  label: record.getDisplayText(),
                  value: record.id,
                };
              }
              return record;
            })
          );
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [loading]);
  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);
  const rootProps = {
    style: {
      ...props.style,
      width: `calc(${props.style.width} - ${loading ? "3em" : "0px"})`,
    },
  };

  if (loading) {
    return (
      <>
        <CircularProgress />
        <Select {...props} rootProps={rootProps} disabled={true}></Select>{" "}
      </>
    );
  }
  if (data === null) {
    return (
      <>
        <Select
          {...props}
          disabled
          rootProps={rootProps}
          helpText={"Error fetching data"}
          enhanced
        />
      </>
    );
  }
  return (
    <>
      <Select
        value={value}
        {...props}
        onChange={(evt) =>
          postSelectProcess(evt.currentTarget.value).then((value) =>
            setValue(value)
          )
        }
        rootProps={rootProps}
        enhanced
        options={data}
      />
      <input
        onReset={() => setLoading(true)}
        style={{ display: "none" }}
        name={props.name}
        value={value}
      />
    </>
  );
};

export const MultiSelectDropdown = ({
  fetchUsing = async () => [],
  postSelectProcess = async (id) => id,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [value, setValue] = React.useState(props.value ? props.value : "");
  useEffect(() => {
    if (loading) {
      fetchUsing()
        .then((data) => {
          setData(
            data.map((record) => {
              if (record instanceof Model) {
                return {
                  label: record.getDisplayText(),
                  value: record.id,
                };
              }
              return record;
            })
          );
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [loading]);
  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);
  const rootProps = {
    style: {
      ...props.style,
      width: `calc(${props.style.width} - ${loading ? "3em" : "0px"})`,
    },
  };

  if (loading) {
    return (
      <>
        <CircularProgress />
        <Select {...props} rootProps={rootProps} disabled={true}></Select>{" "}
      </>
    );
  }
  if (data === null) {
    return (
      <>
        <Select
          {...props}
          disabled
          rootProps={rootProps}
          helpText={"Error fetching data"}
          enhanced
        />
      </>
    );
  }
  return (
    <>
      <MultiSelect
        onChange={(values) => setValue(values.join(","))}
        data={data}
        value={value.split(",")}
        {...props}
      />
      <input
        readOnly
        onReset={() => setLoading(true)}
        style={{ display: "none" }}
        name={props.name}
        value={value}
      />
    </>
  );
};

export const MultiSelect = ({
  data = [],
  onChange = (value) => value,
  ...props
}) => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const dataMap = data.reduce((prev, curr) => {
    prev[curr.value] = curr;
    return prev;
  }, {});
  useEffect(() => {
    onChange(selected);
  }, [selected]);
  return (
    <div style={{ display: "flex", flexFlow: "row", ...props.style }}>
      <label style={{ alignSelf: "center" }}>{props.label}:</label>
      <ChipSet
        style={{
          display: "flex",
          width: "calc(100% - 48px)",
          overflowX: "auto",
        }}
      >
        {selected.length > 0 ? (
          selected.map((record, index) => {
            return (
              <Chip key={index} selected={true} label={dataMap[record].label} />
            );
          })
        ) : (
          <div style={{ alignSelf: "center" }}>No records selected</div>
        )}
      </ChipSet>
      <IconButton
        style={{ float: "right" }}
        onClick={(evt) => {
          evt.preventDefault();
          setOpen(true);
        }}
        icon={"add"}
      />
      <MultiSelectOptions
        data={data}
        open={open}
        onSubmit={(data) => setSelected(data)}
        onClose={(action) => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export const MultiSelectOptions = ({
  open,
  onClose,
  selectedValues = [],
  onSubmit = (value) => value,
  data = [],
  ...props
}) => {
  const [selected, setSelected] = useState(new Set(selectedValues));
  const onCloseAction = (action) => {
    if (action === "select") {
      onSubmit([...selected]);
    }
    onClose(action);
  };

  const onChange = (key, value) => {
    const newSet = new Set(selected);
    if (value) {
      newSet.add(key);
    } else {
      newSet.delete(key);
    }
    setSelected(newSet);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Select records to include</DialogTitle>
      <DialogContent>
        <List>
          {data.length > 0 ? (
            data.map((record) => (
              <MultiSelectOption
                onChange={(value) => onChange(record.value, value)}
                selected={selected.has(record.value)}
                key={record.value}
                id={record.value}
              >
                {record.label}
              </MultiSelectOption>
            ))
          ) : (
            <>No records available</>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          action={"cancel"}
          onClick={(evt) => {
            evt.preventDefault();
            onCloseAction("cancel");
          }}
        >
          Cancel
        </Button>
        <Button
          action={"select"}
          onClick={(evt) => {
            evt.preventDefault();
            onCloseAction("select");
          }}
          isDefaultAction
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const MultiSelectOption = ({
  id,
  children,
  value = false,
  onChange = (value) => value,
  ...props
}) => {
  const [checked, setChecked] = useState(value);
  useEffect(() => onChange(checked), [checked]);
  return (
    <ListItem>
      {children}
      <ListItemMeta>
        <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
      </ListItemMeta>
    </ListItem>
  );
};
