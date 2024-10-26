import React, { useState } from "react";

const Tests = ({ availableTests, onAddTest }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);

  const handleAddTest = () => {
    setIsSearchVisible(true);
  };

  const handleTestSelect = (test) => {
    if (!selectedTests.includes(test)) {
      setSelectedTests([...selectedTests, test]);
      onAddTest(test); // Notify parent component about the added test
      setSearchTerm(""); // Clear search input after selection
      setIsSearchVisible(false); // Hide search bar after selecting a test
    }
  };

  const handleTestDelete = (testToDelete) => {
    setSelectedTests(selectedTests.filter((test) => test !== testToDelete));
  };

  const filteredTests = availableTests.filter((test) =>
    test.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4">
      <ul className="mb-2">
        {selectedTests.map((test, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-1"
          >
            <span>{test}</span>
            <button
              onClick={() => handleTestDelete(test)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Delete ${test}`}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {isSearchVisible && (
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for tests..."
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <ul className="border border-gray-300 rounded-md overflow-hidden">
            {filteredTests.map((test, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleTestSelect(test)}
              >
                {test}
              </li>
            ))}
            {filteredTests.length === 0 && (
              <li className="p-2 text-gray-500">No tests found</li>
            )}
          </ul>
        </div>
      )}

      <button
        onClick={handleAddTest}
        className="bg-gray-200 p-2 w-full rounded hover:bg-gray-300"
      >
        + Add Test
      </button>
    </div>
  );
};

export default Tests;
