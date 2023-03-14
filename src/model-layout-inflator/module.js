import React, { createRef, useEffect, useRef, useState } from "react";
import { Module } from "./layout";
import { Model } from "./models";
import { ModelCrudService } from "./service";
import { toKebabCase } from "./utils";
import {
  snackBarQueue,
  NotAccessiblePage,
  MaterialPage,
  PaddedRegion,
} from "./layout";
import { Route, useParams, useLocation } from "react-router-dom";
import {
  LinearProgress,
  Typography,
  ListDivider,
  TextField,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableCell,
  DataTableHeadCell,
  DataTableRow,
  Icon,
  IconButton,
  MenuSurfaceAnchor,
  MenuSurface,
  MenuItem,
  Button,
  Select,
} from "rmwc";
import { Relation } from "./models/fields";
import { Box } from "@mui/system";

export class ModelBasedModule extends Module {
  static model = Model;
  static service = new ModelCrudService();
  static icon = null;
  static get basePath() {
    return `/${toKebabCase(this.model._pluralName)}`;
  }

  constructor(
    allowViewList = true,
    allowViewDetail = true,
    allowCreate = true,
    allowEdit = true,
    allowDelete = true
  ) {
    super();
    this.allowViewList = allowViewList;
    this.allowViewDetail = allowViewDetail;
    this.allowCreate = allowCreate;
    this.allowEdit = allowEdit;
    this.allowDelete = allowDelete;
  }

  getActions(moduleContext, refreshCallBack) {
    return [
      // {
      //     label: "Edit",
      //     action: ()=>{},
      //     icon: "edit"
      // },
      {
        label: "Delete",
        action: async (id) => {
          moduleContext.constructor.service
            .delete(id)
            .then(() => {
              snackBarQueue.notify({
                title: "Success",
                body: `Succcessfully deleted ${this.constructor.model._name.toLowerCase()}`,
                dismissesOnAction: true,
                actions: [{ title: "Close" }],
              });
              refreshCallBack();
            })
            .catch((err) => {
              snackBarQueue.notify({
                title: "Error",
                body: err.message,
                dismissesOnAction: true,
                actions: [{ title: "Close" }],
              });
            });
        },
        icon: "delete",
      },
    ];
  }

  getNavLinks() {
    if (this.allowViewList) {
      return [...super.getNavLinks(), this.generateNavLink()];
    } else {
      return super.getNavLinks();
    }
  }

  getAuthedRoutes() {
    return [
      <Route
        path={`${this.constructor.basePath}/:id`}
        element={this.generateDetailsPage()}
      />,
      <Route
        path={`${this.constructor.basePath}`}
        element={this.generateListPage()}
      />,
    ];
  }

  generateNavLink() {
    return {
      label: this.constructor.model._pluralName,
      to: this.constructor.basePath,
      icon: this.constructor.icon,
    };
  }

  generateListPage() {
    if (!this.allowViewList) {
      return <NotAccessiblePage />;
    }
    return (
      <ModelListPage
        service={this.constructor.service}
        moduleContext={this}
        model={this.constructor.model}
      />
    );
  }

  generateDetailsPage() {
    if (!this.allowViewDetail) {
      return <NotAccessiblePage />;
    }
    return (
      <ModelMaterialDetailsPage
        service={this.constructor.service}
        moduleContext={this}
        model={this.constructor.model}
      />
    );
  }
}

export const ModelMaterialDetailsPage = ({
  moduleContext = new ModelBasedModule(),
}) => {
  const service = moduleContext.constructor.service;
  const model = moduleContext.constructor.model;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [instance, setInstance] = useState(null);
  useEffect(() => {
    setInstance(null);
    setLoading(true);
  }, [id]);
  useEffect(() => {
    if (loading && instance === null) {
      service.get(id).then((data) => {
        if (data === null) {
          setLoading(false);
        } else {
          setInstance(data);
        }
      });
    }
  }, [loading]);
  useEffect(() => {
    if (instance !== null) {
      setLoading(false);
    }
  }, [instance]);
  if (loading) {
    return (
      <MaterialPage title={model._name}>
        <PaddedRegion innerPadding="0px" marginTop="0px">
          <LinearProgress />
        </PaddedRegion>
      </MaterialPage>
    );
  }
  if (instance === null) {
    return <NotAccessiblePage />;
  }
  const labelField = instance.constructor
    .getFields()
    .find((fieldName) => instance.constructor[fieldName].isPrimaryLabel);
  return (
    <MaterialPage title={model._name}>
      <PaddedRegion innerPadding="0px" marginTop="0px">
        <MaterialSection
          label={instance[labelField]}
          data={instance}
          ignoreFields={[labelField]}
          s
        />
      </PaddedRegion>
    </MaterialPage>
  );
};

export const MaterialSection = ({
  label,
  data,
  ignoreFields = [],
  isList = false,
}) => {
  return (
    <>
      <Typography
        use={"headline4"}
        theme={["primary"]}
        style={{ display: "block", padding: "10px 0" }}
      >
        {label}
      </Typography>
      <ListDivider />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        {data.constructor
          .getFields()
          .filter((fieldName) => !ignoreFields.includes(fieldName))
          .map((fieldName, index) => (
            <div key={index}>
              {data.constructor[fieldName] instanceof Relation ? (
                <>
                  <br />
                  <br />
                  {data.constructor[fieldName].processOnDisplay(
                    data[fieldName],
                    data
                  )}
                </>
              ) : (
                <div style={{ display: "block", margin: "6px" }}>
                  <Typography theme={["primary"]} use={"subtitle2"}>
                    <b>{data.constructor[fieldName].label}</b>
                  </Typography>
                  <br />
                  {data.constructor[fieldName].processOnDisplay(
                    data[fieldName],
                    data
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export const ModelListPage = ({ moduleContext = new ModelBasedModule() }) => {
  const service = moduleContext.constructor.model.service;
  const model = moduleContext.constructor.model;
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const location = useLocation();

  // filters state
  const [filtersActive, setFiltersActive] = useState(false);

  // filter value
  const [connectionFilterActive, setConnectionFilterActive] = useState(false);
  const [locationFilterActive, setLocationFilterActive] = useState(false);
  const [connectionFilter, setConnectionFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    setLoading(true);
  }, [location]);
  useEffect(() => {
    setLoading(true);
  }, [query]);
  useEffect(() => {
    if (loading === true) {
      service.search(query).then((data) => setData(data));
    }
  }, [loading]);
  useEffect(() => {
    setLoading(false);
  }, [data]);
  return (
    <MaterialPage title={model._pluralName}>
      <PaddedRegion style={{ overflow: "visible" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextField
            style={{ width: "100%" }}
            label={"Search"}
            value={query}
            icon={"search"}
            onChange={(evt) => setQuery(evt.target.value)}
            trailingIcon={
              query === ""
                ? false
                : {
                    icon: "close",
                    onClick: () => setQuery(""),
                  }
            }
          />

          {/* only show filter button if we are on colleges */}
          {location.pathname === "/colleges" && (
            <Button
              label="Filters"
              icon="filter_list"
              onClick={() => setFiltersActive((prev) => !prev)}
            />
          )}
        </Box>
        {loading ? <LinearProgress /> : <></>}
        {/* available filters */}
        {filtersActive && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              gap: "12px",
            }}
          >
            {/* location filter */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Typography
                style={{
                  borderRadius: "10px",
                  background: "#6101ee",
                  padding: "10px 20px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setLocationFilterActive(true)}
                onMouseEnter={() => setLocationFilterActive(true)}
                onMouseLeave={() => setLocationFilterActive(false)}
              >
                Location
              </Typography>

              {locationFilterActive && (
                <Box
                  sx={{ position: "absolute", top: "40px" }}
                  onMouseEnter={() => setLocationFilterActive(true)}
                  onMouseLeave={() => setLocationFilterActive(false)}
                >
                  <TextField
                    style={{ width: "280px" }}
                    label="Filter Location"
                    onChange={(e) => setLocationFilter(e.currentTarget.value)}
                    value={locationFilter}
                  />
                </Box>
              )}
            </Box>

            {/* connection status filter */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Typography
                style={{
                  borderRadius: "10px",
                  background: "#6101ee",
                  padding: "10px 20px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setConnectionFilterActive(true)}
                onMouseEnter={() => setConnectionFilterActive(true)}
                onMouseLeave={() => setConnectionFilterActive(false)}
              >
                {console.log(connectionFilterActive)}
                Connection Status
              </Typography>

              {connectionFilterActive && (
                <Box
                  sx={{ position: "absolute", top: "40px" }}
                  onMouseEnter={() => setConnectionFilterActive(true)}
                  onMouseLeave={() => setConnectionFilterActive(false)}
                >
                  <Select
                    options={[
                      "Connected",
                      "Not Connected",
                      "Invite Sent",
                      "Invite Received",
                    ]}
                    onChange={(e) => setConnectionFilter(e.currentTarget.value)}
                    value={connectionFilter}
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}
        {data !== null && data !== undefined ? (
          data.length > 0 ? (
            <ModelMaterialDataTable
              refreshCallBack={() => setLoading(true)}
              moduleContext={moduleContext}
              model={model}
              data={data}
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
        <Fab
          exited={!moduleContext.allowCreate}
          onClick={() => setCreateFormOpen(true)}
          theme={["primaryBg"]}
          style={{
            float: "bottom",
            position: "fixed",
            bottom: "6px",
            right: "max(calc(50vw - 360px - 21px), 6px)",
          }}
          label={"Create"}
          icon={"add"}
        />
        <ModelMaterialDialogForm
          open={createFormOpen}
          moduleContext={moduleContext}
          onClose={() => {
            setCreateFormOpen(false);
          }}
          onSave={async (instance) => {
            service.save(Object.fromEntries(instance)).then(() => {
              setCreateFormOpen(false);
              setLoading(true);
            });
          }}
        />
      </PaddedRegion>
    </MaterialPage>
  );
};

const ModelMaterialDialogForm = ({
  moduleContext = new ModelBasedModule(),
  instance = null,
  open = false,
  onClose = () => {},
  onSave = async (data) => {},
}) => {
  const model = moduleContext.constructor.model;
  const isCreate = instance === null;
  const [saving, setSaving] = useState(false);
  const targetInstance = isCreate ? new model() : instance;
  const [data, setData] = useState(null);
  const formRef = useRef();
  useEffect(() => {
    if (saving && data !== null) {
      onSave(data)
        .then(() => {
          snackBarQueue.notify({
            title: "Success",
            body: `Succcessfully saved ${model._name.toLowerCase()}`,
            dismissesOnAction: true,
            actions: [{ title: "Close" }],
          });
          setData(null);
          formRef.current.reset();
          onClose();
        })
        .catch((err) => {
          snackBarQueue.notify({
            title: "Error",
            body: err.message,
            dismissesOnAction: true,
            actions: [{ title: "Close" }],
          });
          onClose();
        })
        .finally(() => setSaving(false));
    }
  }, [saving]);
  useEffect(() => {
    if (data !== null) {
      setSaving(true);
    }
  }, [data]);
  const buttonRef = createRef();
  return (
    <Dialog
      preventOutsideDismiss
      open={open}
      onClose={(evt) => {
        if (evt.detail.action === "cancel") {
          onClose();
        }
      }}
    >
      <DialogTitle>
        {isCreate ? "Create" : "Edit"} {model._name}
      </DialogTitle>
      <DialogContent>
        <form
          ref={formRef}
          style={{ display: "block" }}
          onSubmit={(evt) => {
            evt.preventDefault();
            setData(new FormData(evt.target));
          }}
        >
          {model
            .getFields()
            .map((field) => model[field].asInputField(targetInstance[field]))}
          <button ref={buttonRef} style={{ display: "none" }} />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogButton onClick={(evt) => evt.preventDefault()} action="cancel">
          Cancel
        </DialogButton>
        <Button
          label={"Save"}
          onClick={(evt) => {
            buttonRef.current.click();
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export const ModelMaterialDataTable = ({
  data = [],
  moduleContext = new ModelBasedModule(),
  refreshCallBack = () => {},
}) => {
  const model = moduleContext.constructor.model;
  const fields = model.getFields();
  console.log(fields, data);
  return (
    <DataTable
      stickyRows={1}
      stickyColumns={1}
      style={{ width: "100%", hieght: "100%", overflow: "visible" }}
    >
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            {fields.map((fieldName) =>
              model[fieldName].asHeaderField(moduleContext)
            )}
            <DataTableHeadCell>Actions</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody style={{ overflow: "visible" }}>
          {data.map((row) => (
            <DataTableRow
              key={`row-${row["id"]}`}
              style={{ overflow: "visible" }}
            >
              {fields.map((fieldName) =>
                model[fieldName].asCellField(
                  row["id"],
                  row[fieldName],
                  moduleContext
                )
              )}
              <DataTableCell hasFormControl style={{ overflow: "visible" }}>
                {moduleContext.getActions(moduleContext).length > 0 ? (
                  <IconMenuArray
                    instance={row}
                    moduleContext={moduleContext}
                    refreshCallBack={refreshCallBack}
                  />
                ) : (
                  <></>
                )}
              </DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  );
};
const IconMenuArray = ({
  instance,
  moduleContext,
  refreshCallBack = () => {},
}) => {
  return (
    <>
      {moduleContext
        .getActions(moduleContext, refreshCallBack)
        .map((action) => (
          <IconButton
            key={`Action ${action.icon}-${instance.id}`}
            icon={action.icon}
            onClick={(evt) => {
              action.action(instance.id).finally(() => refreshCallBack());
            }}
          />
        ))}
    </>
  );
};
export const ActionMenu = ({
  instance,
  moduleContext,
  refreshCallBack = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuSurfaceAnchor>
      <MenuSurface
        style={{ zIndex: 50 }}
        open={menuOpen}
        onClose={(evt) => {
          setMenuOpen(false);
        }}
      >
        {moduleContext.getActions().map((action, index) => (
          <MenuItem
            key={index}
            onClick={(evt) => {
              action.action(instance.id).finally(() => refreshCallBack());
            }}
          >
            {action.label} <Icon icon={action.icon} />
          </MenuItem>
        ))}
      </MenuSurface>
      <IconButton
        icon={"more_vert"}
        onClick={(evt) => setMenuOpen(!menuOpen)}
      />
    </MenuSurfaceAnchor>
  );
};
