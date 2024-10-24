// components/EmailSender.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const EmailSender = () => {
  const [emailPattern, setEmailPattern] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [emailPreview, setEmailPreview] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    // Validate inputs
    if (!emailPattern || !start || !end) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);

    if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
      setStatusMessage('Invalid range provided.');
      return;
    }

    // Generate emails and send requests
    try {
      const emailPromises = [];

      for (let i = startNum; i <= endNum; i++) {
        // Replace the placeholder with the formatted number
        const email = emailPattern.replace(/\{n\}/g, String(i).padStart(2, '0'));
        emailPromises.push(axios.post('/api/emails', { email }));
      }

      // Wait for all requests to complete
      await Promise.all(emailPromises);
      setStatusMessage('Emails sent successfully!');
    } catch (error) {
      console.error(error);
      setStatusMessage('Error sending emails. Please try again.');
    }
  };

  // Function to generate email previews
  const generateEmailPreview = () => {
    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);

    if (!emailPattern || isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
      setEmailPreview([]);
      return;
    }

    const previews = [];
    const countToShow = 2; // Number of previews to show from start and end

    // Generate start previews
    for (let i = startNum; i < startNum + countToShow && i <= endNum; i++) {
      previews.push(emailPattern.replace(/\{n\}/g, String(i).padStart(2, '0')));
    }

    // Generate end previews
    for (let i = endNum; i > endNum - countToShow && i >= startNum; i--) {
      previews.push(emailPattern.replace(/\{n\}/g, String(i).padStart(2, '0')));
    }

    setEmailPreview(previews);
  };

  // Update preview whenever the email pattern or range changes
  useEffect(() => {
    generateEmailPreview();
  }, [emailPattern, start, end]);

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Send Student Emails</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="emailPattern">
            Email Pattern
          </label>
          <input
            type="text"
            id="emailPattern"
            value={emailPattern}
            onChange={(e) => setEmailPattern(e.target.value)}
            placeholder="e.g. cb.en.u4cse224{n}@cb.students.amrita.edu"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Use "&#123;n&#125;" as a placeholder for the number.</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="start">
            Start Number
          </label>
          <input
            type="number"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="end">
            End Number
          </label>
          <input
            type="number"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700"
        >
          Send Emails
        </button>
      </form>
      {statusMessage && (
        <div className="mt-4 text-red-600">
          {statusMessage}
        </div>
      )}
      {emailPreview.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Email Previews</h2>
          <ul className="list-disc pl-5">
            {emailPreview.map((email, index) => (
              <li key={index} className="text-gray-700">
                {email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmailSender;
