import { TextField, Button, MenuItem, Paper } from "@mui/material";

export const VitalsSection = ({ formData, onChange, onCheckIn, onUpdate }) => {
  const VitalBox = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    select = false,
    options = [],
    bgcolor,
  }) => {
    return (
      <div className="flex flex-col items-center">
        <Paper
          elevation={3}
          sx={{
            height: 128,
            width: 128,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            bgcolor,
          }}
        >
          <label className="mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
          {select ? (
            <TextField
              select
              fullWidth
              name={name}
              value={value}
              onChange={onChange}
              size="small"
              variant="standard"
              sx={{
                ".MuiInputBase-input": { textAlign: "center" },
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:hover:before": { borderBottom: "none" },
                "& .MuiInput-underline:after": { borderBottom: "none" },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              fullWidth
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={type}
              size="small"
              variant="standard"
              sx={{
                ".MuiInputBase-input": { textAlign: "center" },
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:hover:before": { borderBottom: "none" },
                "& .MuiInput-underline:after": { borderBottom: "none" },
              }}
            />
          )}
        </Paper>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-6 justify-center items-center px-8">
      <div>
        <VitalBox
          label="Blood Pressure"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={onChange}
          placeholder="e.g. 120/80"
          bgcolor="rgb(254, 226, 226)" // red-100
        />
      </div>

      <div>
        <VitalBox
          label="Temperature"
          name="temperature"
          value={formData.temperature}
          onChange={onChange}
          placeholder="e.g. 98.6"
          bgcolor="rgb(219, 234, 254)" // blue-100
        />
      </div>

      <div>
        <Paper
          elevation={3}
          sx={{
            height: 128,
            width: 128,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            cursor: "pointer",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onUpdate}
            sx={{
              height: "100%",
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Update Details
          </Button>
        </Paper>
      </div>

      <div className="flex flex-col items-center">
        <Paper
          elevation={3}
          sx={{
            height: 128,
            width: 128,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            cursor: "pointer",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onCheckIn}
            sx={{
              height: "100%",
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Check-In
          </Button>
        </Paper>
      </div>
    </div>
  );
};
