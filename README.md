Full-Stack Developer Portfolio
A professional, high-performance portfolio website built with a React frontend and a Node.js/Express backend. This project features a live contact form integrated with Nodemailer and is fully deployed using modern CI/CD workflows.
Live Links
Live Website: https://flourishing-taffy-7a5d5d.netlify.app

Backend API: https://myportfoliowebsite-9.onrender.com
Key Features
Full-Stack Integration: Seamless communication between Netlify-hosted frontend and Render-hosted backend.

Nodemailer Integration: Automated email delivery using Gmail SMTP with secure App Passwords.

Secure Environment: Protection of sensitive data using process.env and Render's Secret Management.

Error Handling: Robust backend validation and timeout management to ensure reliable message delivery.
Technical Stack
Frontend: React, HTML5, CSS3, JavaScript (ES6+).

Backend: Node.js, Express.js.

Deployment: Netlify (Frontend), Render (Backend).

Tools: Git, GitHub, Nodemailer, CORS.
Environment Configuration
To run this project locally or deploy your own version, you must configure the following variables in your Render dashboard or .env file:
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
PORT=5000
Installation & Setup
Clone the Repo:
git clone https://github.com/Afranss-tech/my-portfolio.git
Install Backend Dependencies:
cd backend
npm install
Start the Server:

Bash

npm start
👨‍💻 Author
Afran Nesru

GitHub: @Afranss-tech

 🖼️ Project Showcase

Below are highlights from the live application, demonstrating the design and core functionalities.

| 🏠 Home Page | 🚀 Projects Section |
| :---: | :---: |
| ![Home Page](./myportfolio/image/home.png) | ![Projects](./myportfolio/image/resume.png) |
| *Clean, responsive entry point* | *Showcasing my latest work* |

| 📄 Resume & Skills | 📬 Contact Form |
| :---: | :---: |
| ![Resume Section](./myportfolio/image/project.png) | ![Contact Form](./myportfolio/image/contact.png) |
| *Professional experience & stack* | *Functional Nodemailer integration* |

