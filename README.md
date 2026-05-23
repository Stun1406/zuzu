# Talent Olive — Website

A complete static website for **Talent Olive**, a student career-discovery platform. Includes the marketing landing page and a full 5-step onboarding flow (login → registration → OTP verification → payment → assessment intro) plus a dedicated 20-question TO-CET assessment interface.

---

## What's Inside

| File | Purpose |
|---|---|
| `index.html` | Main landing page |
| `step1-login.html` | Step 1 — Login or create account |
| `step2-register.html` | Step 2 — Parent & student registration form |
| `step3-verify.html` | Step 3 — OTP email verification |
| `step4-payment.html` | Step 4 — Razorpay-style payment + referral codes |
| `step5-assessment.html` | Step 5 — Assessment intro & checklist |
| `assessment.html` | TO-CET — Full 20-question assessment |
| `flow.css` | Shared styles for all step pages |
| `styles.css` | Landing page design system |
| `script.js` | Landing page animations & interactions |
| `img-*.jpeg` | Brand images (logo, hero, about, etc.) |

---

## Requirements

You only need two things:

1. **Git** — to clone the repository
2. **A web browser** — Chrome, Firefox, Edge, or Safari (any modern browser works)

No Node.js, no npm, no server, no build step. It's a pure HTML/CSS/JS site.

---

## Step 1 — Install Git (if you don't have it)

### Windows
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer — keep all default options and click Next through everything
3. Once installed, open **Git Bash** or **Command Prompt** and run:
   ```
   git --version
   ```
   You should see something like `git version 2.x.x` — that means it worked.

### Mac
Git is usually already installed. Open **Terminal** and run:
```
git --version
```
If it's not installed, macOS will prompt you to install it automatically. Follow the prompt.

### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install git -y
git --version
```

---

## Step 2 — Clone the Repository

Open a terminal (Git Bash on Windows, Terminal on Mac/Linux) and run:

```bash
git clone https://github.com/Stun1406/zuzu.git
```

This creates a folder called `zuzu` in your current directory with all the files inside.

**Choose where you want it first** (optional but recommended):
```bash
# Example: put it on your Desktop
cd ~/Desktop
git clone https://github.com/Stun1406/zuzu.git
```

After cloning you'll see:
```
Cloning into 'zuzu'...
remote: Enumerating objects: 22, done.
...
```

---

## Step 3 — Open the Website

Navigate into the project folder:
```bash
cd zuzu
```

Then open `index.html` in your browser. There are two ways:

### Option A — Double-click (easiest)
Open your file manager, navigate to the `zuzu` folder, and double-click `index.html`. It will open in your default browser.

### Option B — From the terminal
**Windows (Command Prompt or PowerShell):**
```powershell
start index.html
```

**Mac:**
```bash
open index.html
```

**Linux:**
```bash
xdg-open index.html
```

---

## Option C — VS Code Live Server (recommended for development)

If you use **Visual Studio Code**, this gives you auto-reload on file changes:

1. Open VS Code
2. Go to **File → Open Folder** and select the `zuzu` folder
3. Install the **Live Server** extension:
   - Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
   - Search for `Live Server` by Ritwick Dey
   - Click Install
4. Right-click `index.html` in the file explorer panel → **Open with Live Server**
5. Your browser will open at `http://127.0.0.1:5500`

---

## Navigating the Site

Once `index.html` is open, here is the full flow:

```
Landing Page (index.html)
        |
        | Click Login / Register / Start Your Journey
        v
Step 1 — Login or Create Account (step1-login.html)
        |
        |-- Existing user (Login) ──────────────────────────┐
        |                                                    |
        |-- New user (Create Account) ──────────────────────┤
        v                                                    |
Step 2 — Registration Form (step2-register.html)            |
        |                                                    |
        v                                                    |
Step 3 — OTP Verification (step3-verify.html)               |
        |                                                    |
        v                                                    |
Step 4 — Payment (step4-payment.html)                       |
        |                                                    |
        v                                                    v
Step 5 — Assessment Intro (step5-assessment.html) <─────────┘
        |
        | Click Start Assessment
        v
TO-CET Assessment (assessment.html)
        |
        | Answer all 20 questions
        v
      Completion Screen
```

### Referral codes you can test on the payment page:
| Code | Discount |
|---|---|
| `TALENT10` | 10% off |
| `OLIVE20` | 20% off |
| `FRIEND15` | 15% off |
| `SCHOOL50` | ₹500 flat off |

### OTP verification:
Any 6-digit number is accepted (e.g. `123456`). This is a frontend demo — no real email is sent.

### Assessment keyboard shortcuts:
- **1 / 2 / 3 / 4** — select answer option
- **→ or Enter** — go to next question
- **←** — go back

---

## Pulling Updates Later

Whenever the project is updated, run this inside the `zuzu` folder to get the latest version:

```bash
git pull
```

---

## Folder Structure

```
zuzu/
├── index.html              ← Start here
├── styles.css              ← Landing page styles
├── script.js               ← Landing page JS
├── flow.css                ← Shared styles for all step pages
├── step1-login.html
├── step2-register.html
├── step3-verify.html
├── step4-payment.html
├── step5-assessment.html
├── assessment.html
├── auth.html               ← Legacy auth page (not used in main flow)
├── img-logo.jpeg
├── img-hero-visual.jpeg
├── img-about.jpeg
├── img-self-discovery.jpeg
└── img-*.jpeg              ← Design reference images
```

---

## Troubleshooting

**Images not showing up**
Make sure all `img-*.jpeg` files are in the same folder as the HTML files. They must not be moved into a subfolder.

**Styles look broken**
Make sure `styles.css` and `flow.css` are in the same folder as the HTML files. Do not rename them.

**"File not found" when clicking a button**
Make sure you cloned the full repo and all HTML files are present. Run `git status` to check nothing is missing.

**Page looks different from expected**
Try a hard refresh: `Ctrl+Shift+R` on Windows/Linux, `Cmd+Shift+R` on Mac.
