# Global Fan Concierge - FIFA World Cup 2026

**Global Fan Concierge** is a mobile-first, standalone web application designed for international football fans navigating the stadium during the 2026 FIFA World Cup. It provides real-time, step-by-step walking directions within the stadium, translated perfectly into the user's input language.

---

## 🌟 Features

*   **Dual-Mode Architecture**:
    *   **GenAI Mode**: Uses the **Antigravity SDK** (`google-antigravity`) on a Flask backend to invoke Gemini for advanced natural language understanding and multi-lingual route translation.
    *   **Offline Mode**: A fully client-side fallback engine that runs locally in the browser to handle spotty stadium networks. Uses keyword matching, circular coordinate pathfinding, and a pre-translated multi-lingual dictionary.
*   **Interactive Stadium Guide**: Dynamic SVG map of the stadium with animated path rendering and pins for start/destination locations.
*   **Voice Guidance (Text-to-Speech)**: Integrated native browser Speech Synthesis, enabling fans to listen to walking instructions in their own language.
*   **Mobile-First Design**: Glassmorphic, dark-themed UI optimized for stadium viewports with World Cup color accents.

---

## 🏗️ Folder Structure

```
Fifa_Stadium_App/
│
├── main.py              # Flask server integrating Antigravity SDK
├── requirements.txt     # Python dependencies
├── .env.example         # Environment template for Gemini API key
│
├── index.html           # Frontend HTML structure
├── style.css            # Modern CSS variables, glassmorphic layout & map keyframes
└── app.js               # Client API handler, SVG mapping, Offline Engine & Speech Synthesis
```

---

## 🚀 Setup & Installation

### Prerequisite
*   Python 3.10 or newer

### 1. Install Backend Dependencies
Run the following command to install the required packages:
```sh
pip install -r requirements.txt
```

### 2. Configure Environment
1. Copy the `.env.example` file to create a `.env` file:
   ```sh
   copy .env.example .env
   ```
2. Open `.env` and configure your `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   *Note: If no API key is specified, the application will run in **Offline Mode** automatically, which requires no external services.*

---

## 🏃 Running the Application

### 1. Start the Flask Backend
```sh
python main.py
```
The server will start on `http://localhost:5000`.

### 2. Open the Frontend
Since the application is written in clean, modern vanilla HTML/CSS/JS, you can open `index.html` directly in any web browser, or serve it using a lightweight local server:
```sh
# Example: Python built-in server
python -m http.server 8000
```
Then navigate to `http://localhost:8000` (or the local path) in your browser.

---

## 🧪 Testing the Application

### Test Queries (Multi-Lingual)
Enter the following queries into the input box to verify the localization and pathfinding capabilities:

1.  **English** (Bathroom search):
    *   *Query*: `"Where is the nearest bathroom from Section 101?"`
    *   *Expected Result*: Matches `Restrooms near Section 112`. Draws a path on the 100-Level.
2.  **Spanish** (Gate search):
    *   *Query*: `¿Cómo llego a la puerta B desde la sección 110?`
    *   *Expected Result*: Matches `Gate B`. Directions generated and translated to Spanish.
3.  **French** (Food search):
    *   *Query*: `"Où puis-je manger un hamburger?"`
    *   *Expected Result*: Matches `American Grill (Section 125)`. Directions generated and translated to French.
4.  **German** (First aid search):
    *   *Query*: `"Ich brauche einen Arzt"` (I need a doctor)
    *   *Expected Result*: Matches `Erste-Hilfe-Station (Sektion 119)`. Directions translated to German.
5.  **Portuguese** (FIFA Store search):
    *   *Query*: `"Onde fica a loja oficial?"`
    *   *Expected Result*: Matches `FIFA Official Store (Section 101)`. Directions translated to Portuguese.
6.  **Japanese** (Beer search):
    *   *Query*: `"ビールはどこで買えますか？"` (Where can I buy beer?)
    *   *Expected Result*: Matches `Stadium Brews (Section 220)`. Directions translated to Japanese.

### Text-to-Speech (TTS) Verification
Click the **speaker icon** (📢) in the results card to hear the walking instructions read aloud in the detected language.
