# Table of Contents

1. [Mediclined 🏥](#mediclined-)
2. [Project Description](#project-description)
3. [Technologies Used 🌟](#-technologies-used)
4. [Project Overview 📝](#-project-overview)
   - [Core Features](#core-features)
   - [System Architecture](#system-architecture)
   - [Key Assumptions](#key-assumptions)
5. [API References 🌐](#-api-references)
6. [Installation and Setup ⚙️](#-installation-and-setup)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
7. [Future Scope 🔮](#-future-scope)
8. [Contributing 🤝](#-contributing)
9. [License 📄](#-license)

---

# Mediclined 🏥

**Project Description:**  
Mediclined is a comprehensive web application designed to streamline the relationship between college/university clinics and students through digital healthcare management. Our platform revolutionizes campus healthcare by providing a seamless, secure, and efficient system for both healthcare providers and students.

---

## 🌟 Technologies Used
- **Frontend:** NextJS, Tailwind, MUI
- **Backend:** ExpressJS
- **Database:** 
  - MySQL (for structured relational data)
  - MongoDB (for unstructured, flexible data)
- **APIs:** RXTerms (Industry-standard medical data)
- **Hardware:** ESP32 wifi module (for device integration)
- **Other Tools:** Git

---

## 📝 Project Overview

### Core Features:
1. **Digital Health Records Management**
   - Secure digitization of patient information
   - Easy sharing between authorized healthcare providers
   - Smart forms with bulk CRUD operations and regex-powered autocomplete

2. **Real-Time Health Monitoring**
   - Critical data alerts and analysis
   - Integration with healthcare devices
   - Open endpoint for device SDK integration

3. **Healthcare Service Management**
   - Real-time doctor availability tracking
   - Digital prescription system through doctor dashboard
   - Automated pharmacy delivery service

4. **Administrative Efficiency**
   - Automated medical leave generation with PDF download
   - Exclusive admin application for streamlined management
   - Direct login system (no manual signup required)
   - Anonymous feedback system for service improvement

### System Architecture:
- **Dual Database System:**
  - MySQL for structured, relational data
  - MongoDB for flexible, unstructured data
  - Ensures adaptability to various data types and future scaling

### Key Assumptions:
1. **Data Flexibility:**
   - System can operate without initial data
   - Flexible data entry methods supported
   - Scalable for future data additions

2. **Operational Requirements:**
   - Clinic must be associated with a college
   - Minimum staffing: 1 doctor, 1 nurse, 1 pharmacist
   - Healthcare devices must have SDK capability for data transmission

3. **Security and Access:**
   - Admin-controlled user setup
   - Role-based access control
   - Secure data transmission protocols

---

## 🌐 API References
| API          | Documentation Link                   | API Key Instructions                                    |
|--------------|--------------------------------------|--------------------------------------------------------|
| RXTerms      | [Documentation](https://clinicaltables.nlm.nih.gov/apidoc/rxterms/v3/doc.html) | No API key required                                      |

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
   Create a `.env` file with:
   ```plaintext
   PORT=your_port_number
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=Mediclined
   SEC_KEY=your_secret_key
   EMAIL=your_email@example.com
   APP_EMAIL_KEY=your_app_email_key
   ```

4. **Run the Backend Server**
   ```bash
   node server.js
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

## 🔮 Future Scope
- Integration with additional healthcare devices
- Expanded telemedicine capabilities
- Advanced prescription analytics
- Multi-institution support

---

## 🤝 Contributing
We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

Thank you for exploring **Mediclined**! For questions or support, please reach out to our team. 🌟
