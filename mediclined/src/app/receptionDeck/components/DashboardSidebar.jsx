// DashboardSidebar.js
export const DashboardSidebar = () => {
  const options = ["Overview", "Appointments", "Patients", "Reports"];

  return (
    <div className="w-1/4 max-w-xs">
      <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-17rem)]">
        <h2 className="font-semibold text-gray-800 mb-4">Dashboard Options</h2>
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left p-3 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
