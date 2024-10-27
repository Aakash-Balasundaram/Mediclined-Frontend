# Mediclined 🎉

**Project Description:**  
A healthcare system for hostels featuring real-time doctor tracking, online pharmacy, secure student medical records, and easy medical leave applications with PDF downloads.

---

## 🌟 Technologies Used
- **Frontend:** NextJS, Tailwind, MUI
- **Backend:** ExpressJS
- **Database:** MySQL, MongoDB
- **APIs:** RXTerms
- **Other Tools:** Git, ESP32 wifi module

---

## 📝 Project Overview
This project addresses the challenge of improving healthcare accessibility for students in college by implementing a comprehensive healthcare management system tailored to their specific needs. 

### Key Functionalities:
- **Data-Driven Design:** Developed based on extensive college surveys to address real student needs, ensuring the system effectively meets the specific requirements of the student community.
- **Real-Time Doctor Tracking:** Easily check doctor availability and schedule visits, improving accessibility and reducing wait times.
- **Online Pharmacy:** Order medicines online with hostel delivery, ensuring timely access to medications and reducing the need for physical trips to the pharmacy.
- **Anonymous Feedback:** Provide mandatory doctor feedback, facilities reviews, and application suggestions anonymously to enhance service quality and app improvements.
- **Secure Medical Records:** Safely store and manage student medical information using encryption, ensuring privacy and data integrity.
- **Efficient Medical Leave:** Automatically convert medical records into official leave documents and download them as PDFs, simplifying the leave application process.

Our solution is designed to enhance the overall healthcare experience for students, making it more accessible, efficient, and user-friendly.

---

## 🌐 API References
| API          | Documentation Link                   | API Key Instructions                                    |
|--------------|--------------------------------------|--------------------------------------------------------|
| RXTerms      | [Documentation](https://clinicaltables.nlm.nih.gov/apidoc/rxterms/v3/doc.html) | Can use directly without a need for API key            |

---

## 🎥 Demo Video
Check out the [Demo Video](YOUTUBE_LINK) for a quick walkthrough of the project and its main features.

---

## ⚙️ Installation and Setup

### Backend Setup
1. **Clone the Backend Repository**
   ```bash
   git clone https://github.com/Thanus-Kumaar/Mediclined-Primary-Server.git
   cd Mediclined-Primary-Server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   - Create a `.env` file in the root directory.
   - Add necessary environment variables as shown below:
     ```plaintext
     PORT=your_port_number           # e.g., 5555
     DB_USER=your_database_user      # e.g., root
     DB_PASSWORD=your_database_password  # e.g., your_password
     DB_NAME=Mediclined
     SEC_KEY=your_secret_key          # e.g., your_secret_key (can be random)
     EMAIL=your_email@example.com     # e.g., your_email@example.com
     APP_EMAIL_KEY=your_app_email_key # e.g., your_app_email_key
  # Add any other required environment variables here

4. **Run the Backend Server**
   ```bash
   node .\server.js
   ```

### Frontend Setup
1. **Clone the Frontend Repository**
   ```bash
   git clone https://github.com/Aakash-Balasundaram/Mediclined-Frontend.git
   cd Mediclined-Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Frontend**
   ```bash
   npm run dev
   ```

---

## 🚀 Deployment Link
Experience the project live at [Live Demo Link](DEPLOYMENT_LINK).

---

## 🔮 Future Scope
Some potential enhancements and new features we could add to improve this project further:
- **Feature 1:** Implement user authentication and authorization.
- **Feature 2:** Add more data visualization options.
- **Optimization:** Enhance performance through server-side rendering.

---

## 🤝 Contributing
We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out **Mediclined**! If you have any questions, feel free to reach out. 😊
