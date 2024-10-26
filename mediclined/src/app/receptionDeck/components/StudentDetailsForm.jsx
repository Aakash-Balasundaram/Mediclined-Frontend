// StudentDetailsForm.js
export const StudentDetailsForm = ({
  formData,
  error,
  onInputChange,
  onFetchDetails,
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
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Roll No
          </label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={onInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Roll No"
          />
        </div>
        <button
          onClick={onFetchDetails}
          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors self-end"
        >
          Fetch
        </button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}

      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
        />
        <InputField
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={onInputChange}
          type="tel"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Age"
            name="age"
            value={formData.age}
            onChange={onInputChange}
            type="number"
          />
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={onInputChange}
            options={[
              { value: "", label: "Select Gender", disabled: true },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Hostel"
            name="hostel"
            value={formData.hostel}
            onChange={onInputChange}
            options={[
              { value: "", label: "Select Hostel" },
              { value: "Hostel A", label: "Hostel A" },
              { value: "Hostel B", label: "Hostel B" },
              { value: "Hostel C", label: "Hostel C" },
            ]}
          />
          <InputField
            label="Room No"
            name="roomNo"
            value={formData.roomNo}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
};
