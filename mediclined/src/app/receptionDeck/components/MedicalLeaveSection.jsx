// MedicalLeaveSection.js
export const MedicalLeaveSection = ({
  leaveData,
  error,
  mockPrescriptions,
  onInputChange,
  onFetchPrescriptions,
  onGenerateLeave,
}) => {
  // Common Input Components
  const InputField = ({ label, name, value, onChange, type = "text" }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  };

  const SelectField = ({ label, name, value, onChange, options }) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Generate Medical Leave
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Roll Number
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="rollNo"
              value={leaveData.rollNo}
              onChange={onInputChange}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Roll No"
            />
            <button
              onClick={onFetchPrescriptions}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Fetch
            </button>
          </div>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>

        <InputField
          label="Start Date"
          name="startDate"
          type="date"
          value={leaveData.startDate}
          onChange={onInputChange}
        />

        <InputField
          label="End Date"
          name="endDate"
          type="date"
          value={leaveData.endDate}
          onChange={onInputChange}
        />

        <SelectField
          label="Select Previous Prescription"
          name="selectedPrescription"
          value={leaveData.selectedPrescription}
          onChange={onInputChange}
          options={[
            { value: "", label: "Select a prescription" },
            ...mockPrescriptions.map((p) => ({
              value: p.id,
              label: `${p.date} - ${p.diagnosis}`,
            })),
          ]}
        />

        <button
          onClick={onGenerateLeave}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Leave
        </button>
      </div>
    </div>
  );
};
