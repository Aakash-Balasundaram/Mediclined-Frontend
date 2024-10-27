import { TextField, Button, MenuItem, Grid } from "@mui/material";

export const StudentDetailsForm = ({
  switchValue,
  formData,
  error,
  onInputChange,
  onFetchDetails,
}) => {
  return (
    <div className="space-y-4">
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs>
          {switchValue == false ? (
            <TextField
              fullWidth
              label="Roll No"
              name="rollNo"
              value={formData.rollNo}
              onChange={onInputChange}
              error={!!error}
              helperText={error}
              placeholder="Enter Roll No"
              size="small"
            />
          ) : (
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              error={!!error}
              helperText={error}
              placeholder="Enter Roll No"
              size="small"
            />
          )}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={onFetchDetails}
            size="medium"
            sx={{
              bgcolor: "grey.100",
              color: "grey.700",
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            Fetch
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            size="small"
          />
        </Grid>

        {/* Change contact number field to email field */}
        <Grid item xs={12}>
          {switchValue == false ? (
            <TextField
              fullWidth
              label="Email"
              name="email" // Updated name to email
              value={formData.email} // Updated value to formData.email
              onChange={onInputChange}
              type="email" // Set type to email for validation
              size="small"
            />
          ) : (
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNo" // Updated name to email
              value={formData.rollNo} // Updated value to formData.email
              onChange={onInputChange}
              size="small"
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={formData.age}
            onChange={onInputChange}
            type="number"
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={onInputChange}
            size="small"
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            label="Hostel"
            name="hostel"
            value={formData.hostel}
            onChange={onInputChange}
            size="small"
          >
            <MenuItem value="">Select Hostel</MenuItem>
            <MenuItem value="Hostel A">Hostel A</MenuItem>
            <MenuItem value="Hostel B">Hostel B</MenuItem>
            <MenuItem value="Hostel C">Hostel C</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Room No"
            name="roomNo"
            value={formData.roomNo}
            onChange={onInputChange}
            size="small"
          />
        </Grid>
      </Grid>
    </div>
  );
};
