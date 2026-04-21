# 🚀 Intervi.AI — AI Mock Interview Platform

An intelligent full-stack AI-powered interview platform that simulates real interview scenarios with voice interaction, resume analysis, and instant feedback.

Built using the **MERN Stack + AI + Speech APIs**, this platform helps users practice interviews, improve communication skills, and track performance.

---

## ✨ Features

### 🎯 AI Interview Simulation
* **Real-time AI-generated questions**: Dynamic questions based on role and level.
* **Technical & HR modes**: Practice for both soft skills and coding/technical logic.
* **Difficulty progression**: Questions adapt as the interview progresses.

### 🎙️ Voice-Based Interaction
* **Speech-to-Text**: Powered by the Web Speech API.
* **AI Text-to-Speech**: The AI speaks questions and feedback.
* **Hands-free experience**: Focus on your speech, not your keyboard.

### 📄 Resume Analysis
* **PDF Upload**: Simply drop your resume to get started.
* **Smart Extraction**: Automatically pulls Skills, Projects, and Experience.
* **Auto-fill**: Setup fields are pre-populated based on your background.

### 📊 Smart Feedback System
* **Instant Feedback**: Receive critiques after every answer.
* **AI Evaluation**: High-level summaries of your performance.
* **Insights**: Detailed analytics to track improvements.

### ⏱️ Timer-Based Questions
* **Real-world Pressure**: Time-limited answers to simulate a real environment.
* **Auto-submit**: Automatically moves forward when time expires.

### 💳 Credit-Based System
* **Monetization**: Free and Paid tier support.
* **Razorpay Integration**: Secure payment gateway for purchasing credits.

---

## 🧠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Framer Motion, Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | Firebase Google Authentication |
| **AI & APIs** | OpenAI API, Web Speech API |
| **Payments** | Razorpay |

---

## 📁 Project Structure

```text
client/
 ├── src/
 │    ├── assets/       # Media and static files
 │    ├── components/   # Reusable UI elements
 │    ├── pages/        # Main application views
 │    ├── redux/        # Global state management
 │    ├── utils/        # Helper functions and constants
 │    ├── App.jsx       # Main component
 │    └── main.jsx      # Entry point
 └── vercel.json        # Deployment configuration

server/
 ├── config/            # Database and API configurations
 ├── controllers/       # Route logic and handlers
 ├── middlewares/       # Auth and validation guards
 ├── models/            # MongoDB schemas
 ├── routes/            # API endpoints
 ├── services/          # External API logic (OpenAI, Razorpay)
 └── index.js           # Server entry point

```
## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone [https://github.com/your-username/intervi-ai.git](https://github.com/your-username/intervi-ai.git)
cd intervi-ai
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
Create a .env file in the server folder:
```

##### Backend .env
```bash
PORT=8000
MONGODB_URL=add your mongodb url
JWT_SECRET="DSY29QURD12R23TFNO1FFFTY13"
OPENROUTER_API_KEY=add your openrouter key
RAZORPAY_KEY_ID=add your razorpay key id
RAZORPAY_KEY_SECRET=add your razorpay key secret
```

#### Run the backend:
```bash
npm run dev
```
### 3️⃣ Setup Frontend
```bash
cd client
npm install
Create a .env file in the client folder:
```

Frontend .env
```bash
VITE_FIREBASE_APIKEY=add your firebase key
VITE_RAZORPAY_KEY_ID=add your razorpay key
```

### Run the frontend:
```bash
npm run dev
```
## 🚀 Usage

Sign up / Login

Upload resume (optional)

Select Options: Choose Role, Experience, and Interview type.

Start Interview: Speak or type your answers.

Review: Get instant feedback and a final performance report.

## 🛠️ Future Improvements
🎥 Video-based AI avatar for more realism.

🎭 Emotion detection to analyze user confidence.

💾 Interview recording for self-playback and review.

🏢 Company-specific question sets (e.g., Google, Amazon prep).

🤝 Contributing
Contributions are welcome!

Fork → Create Branch → Commit → Push → Pull Request

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Mitesh Bhoir 
