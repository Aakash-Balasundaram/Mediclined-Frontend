const BASE_URL = "http://localhost:5555/api";
const MONGO_URL = "http://localhost:5556/api"
const LOGIN_URL = BASE_URL + "/login";
const CLINIC_LOGIN_URL = BASE_URL + "/clinicLogin";
const PHARMACY_URL = BASE_URL + "/pharmacy";
const DOCTOR_URL = BASE_URL + "/doctor";
const STUDENT_URL = BASE_URL + "/student";
const FEEDBACK_URL = BASE_URL + "/feedback";
const BILL_URL = BASE_URL + "/bill";
const CLINIC_URL = BASE_URL + "/clinic";
const MEDICINE_API_URL =
  "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search";

module.exports = {
  BASE_URL,
  MONGO_URL,
  LOGIN_URL,
  CLINIC_LOGIN_URL,
  PHARMACY_URL,
  DOCTOR_URL,
  STUDENT_URL,
  FEEDBACK_URL,
  BILL_URL,
  CLINIC_URL,
  MEDICINE_API_URL,
};
