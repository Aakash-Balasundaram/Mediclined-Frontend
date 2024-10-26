export const VitalsSection = ({ formData, onChange, onCheckIn }) => {
  const VitalBox = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    options = [],
    bgColor,
  }) => {
    return (
      <div
        className={`${bgColor} rounded-lg shadow-lg h-32 w-32 flex flex-col justify-center items-center p-4`}
      >
        <label className="block text-sm font-medium text-gray-600 mb-1">
          {label}
        </label>
        {type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        )}
      </div>
    );
  };
  
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <VitalBox
        label="Blood Pressure"
        name="bloodPressure"
        value={formData.bloodPressure}
        onChange={onChange}
        placeholder="e.g. 120/80"
        bgColor="bg-red-100"
      />
      <VitalBox
        label="Temperature"
        name="temperature"
        value={formData.temperature}
        onChange={onChange}
        placeholder="e.g. 98.6"
        bgColor="bg-blue-100"
      />
      <VitalBox
        label="Known Allergies"
        name="knownAllergies"
        value={formData.knownAllergies}
        onChange={onChange}
        type="select"
        options={[
          { value: "No", label: "No" },
          { value: "Yes", label: "Yes" }
        ]}
        bgColor="bg-green-100"
      />
      <button
        onClick={onCheckIn}
        className="bg-blue-500 text-white rounded-lg shadow-lg h-32 w-32 flex items-center justify-center text-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Check-In
      </button>
    </div>
  );
};