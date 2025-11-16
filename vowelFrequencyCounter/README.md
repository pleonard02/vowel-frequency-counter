📊 Vowel Frequency Counter

<p align="center"><em>A lightweight JavaScript web app that analyzes vowel frequency in any text, including accented and Unicode vowel forms..</em></p>

<p align="center">
  <img src="./screenshot.png" alt="Vowel Frequency Counter Screenshot" width="750">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License Badge">
</p>

This project grew out of a tangent I took while building a vowel-selector script — and it became a great way to practice:

- Text parsing
- Unicode/diacritic handling
- Vowel-family classification
- DOM manipulation
- Building a clean user interface

You can try it live here:
👉 https://pleonard02.github.io/vowel-frequency-counter/

🚀 Features

- Counts vowels in any pasted or typed text
- Supports accented vowels (e.g., á, é, ï, õ, ü, ŷ)
- Supports uppercase and lowercase

Optional modes:

- Normalize accents: treat á → a, ü → u, etc.
- Case-insensitive: count A and a together
- Includes Y as an optional vowel

Displays:

- Frequency table
- Total vowels
- Most frequent vowel(s)

🧠 How It Works

1. Vowel Families

The app groups vowels into “families,” e.g.:

a → a, á, à, â, ä, ã, å, ā, ă, ą, æ
e → e, é, è, ê, ë, ē, ė, ę, ě
...

Every accented vowel belongs to a base vowel family.

2. Classification Modes

Depending on the toggle settings, the algorithm can:

- Map accented characters to their base family
- Treat upper/lowercase as distinct or identical
- Include or exclude Y

3. Counting Logic

The JS file:

- Scans each character
- Checks if it belongs to a vowel family
- Tallies counts into a frequency map
- Determines top-occurring vowels

This makes the app Unicode-safe and flexible.

📁 Project Structure
vowel-frequency-counter/
│
├── index.html # UI layout
├── style.css # Styling
├── script.js # DOM logic + UI updates
└── vowelFrequencyCounter.js # Vowel families + counting logic

🛠️ Running Locally

You can open this in a browser or run it through a lightweight local server.

Option 1: Open index.html

Just double-click index.html — everything runs in the browser.

Option 2: Live Server (recommended)

If using VS Code:

Install Live Server extension

Right-click index.html

Choose "Open with Live Server"

🌐 Deploying with GitHub Pages

Go to your repo → Settings → Pages

Under “Source,” choose:

Deploy from a branch

Branch: main

Folder: root

Click Save

Wait 30–60 seconds

Visit your site:

https://pleonard02.github.io/vowel-frequency-counter/

🧩 Future Improvements (optional ideas)

Potential enhancements that could expand functionality:

- Dark mode toggle
- Display percentages (e.g., A = 32% of vowels)
- Distinct character mode (count á separately from a)
- Bar chart visualization using `canvas`
- Save results locally
- Allow file uploads (analyze .txt files)

📝 License

MIT License — feel free to fork, modify, or build on this.

💬 Author

Created by Priscilla Leonard
