import { TextField, Button, MenuItem } from "@mui/material";

export const MedicalLeaveSection = ({
  leaveData,
  error,
  mockPrescriptions,
  onInputChange,
  onFetchPrescriptions,
  onGenerateLeave,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full">
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Generate Medical Leave
      </h3>
      <div className="space-y-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNo"
              value={leaveData.rollNo}
              onChange={onInputChange}
              error={!!error}
              helperText={error}
              placeholder="Enter Roll No"
              size="small"
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={onFetchPrescriptions}
              size="medium"
              sx={{
                bgcolor: "grey.100",
                color: "grey.700",
                "&:hover": { bgcolor: "grey.200" },
                minWidth: "80px",
              }}
            >
              Fetch
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              value={leaveData.startDate}
              onChange={onInputChange}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              value={leaveData.endDate}
              onChange={onInputChange}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              select
              label="Select Previous Prescription"
              name="selectedPrescription"
              value={leaveData.selectedPrescription}
              onChange={onInputChange}
              size="small"
            >
              <MenuItem value="" disabled>
                Select a prescription
              </MenuItem>
              {mockPrescriptions.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {`${p.date} - ${p.diagnosis}`}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <Button
          onClick={onGenerateLeave}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
            py: 1,
          }}
        >
          Generate Leave
        </Button>
      </div>
    </div>
  );
};
