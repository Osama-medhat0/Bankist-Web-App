# 🏦 Bankist – Online Banking Web App

**Bankist** is a fully functional front-end banking interface where users can log in, transfer money, request loans, and close accounts. It’s a single-page app built with **HTML**, **CSS**, and **JavaScript**, showcasing DOM manipulation, date/time formatting, event handling, and session timeout.

> 🔐 For demo purposes, account data is stored in-memory (not connected to a real backend).

---

## 🌟 Features

- 🔐 **User login** with credentials (username & PIN)
- 💸 **Real-time transaction updates** (deposits & withdrawals)
- 🔁 **Money transfers** between users
- 🧾 **Loan requests** with simple business logic
- 🗃️ **Account closure**
- 📊 **Transaction summaries** (IN, OUT, interest)
- 📅 **Date formatting** using `Intl.DateTimeFormat`
- 💶 **Currency formatting** using `Intl.NumberFormat`
- ⏱️ **Auto logout timer** after inactivity
- ↕️ **Sorting transactions**
- 🎨 Clean, responsive UI

---

## 📦 Technologies Used

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- `Intl` API for date and currency formatting

---

## 👥 Demo Accounts

Use the following credentials to log in:

| Owner                  | Username | PIN  | Currency | Locale    |
|------------------------|----------|------|----------|-----------|
| Jonas                  | `j`      | `1`  | EUR      | pt-PT     |
| Jes Dav                | `jd`     | `2`  | USD      | en-US     |
| Steven Thomas Williams | `stw`    | `3333` | EUR    | default   |
| Sarah Smith            | `ss`     | `4444` | EUR    | default   |

*(Usernames are generated from the owner's initials)*

---

## 📁 Project Structure

bankist-app/
.vscode/ 
├── settings.json
├── index.html # App structure
├── style.css # UI styling
├── script.js # Main app logic
├── logo.png # App logo
└── icon.png # Favicon
└── Bankist-flowchart.png # Flowchart

---

## 🚀 How to Run

1. **Download or clone** the repository.
2. Make sure all files are in the same folder (including images and icons).
3. Open `index.html` in your browser.

> No server needed — this is a front-end-only project.

---

## 🛠️ Future Enhancements (Optional)

- Connect to a backend for persistent user data
- Add user registration and authentication
- Export transaction history as CSV or PDF
- Implement charts using Chart.js

---

## 📸 Screenshots (optional)

> Add screenshot images like:
> <img width="1841" height="815" alt="image" src="https://github.com/user-attachments/assets/5381ce39-b1ed-485c-abe3-f85c124b4c62" />

---

## 🙏 Acknowledgments

- Inspired by Jonas Schmedtmann's JavaScript course

---

## 📜 License

This project is for **educational purposes only** and not intended for real-world banking use.

---

