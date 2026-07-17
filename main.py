import os
import asyncio
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.ERROR)

# Load env variables from .env
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes so the frontend can easily communicate with the backend
CORS(app)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

SYSTEM_INSTRUCTIONS = """You are the "Global Fan Concierge", a helpful AI assistant for the FIFA World Cup 2026 at the New York New Jersey Stadium (MetLife Stadium).
You help fans find facilities inside the stadium, such as restrooms, concessions (food/drink), first aid, guest services, and gates.
You must output a JSON response matching the following schema.

The response MUST be a JSON object with this exact structure (do not wrap in markdown tags, return raw JSON):
{
  "detected_language": "language name in English (e.g. Spanish, French, English)",
  "destination_matched": "the name of the facility matched in the user's language (e.g., 'Baño cerca de la Sección 112')",
  "directions": [
    "step 1",
    "step 2",
    "step 3"
  ],
  "start_location": "starting gate or section in the user's language (e.g. Sección 104)",
  "end_location_id": "the facility ID matched (e.g. restroom_112, gate_b, taco_110, first_aid_119, merch_101)"
}

Here is the simulated stadium facilities dataset:
- GATES:
  * gate_a: Gate A (North Entrance, Near Section 101/149)
  * gate_b: Gate B (East Entrance, Near Section 113/114)
  * gate_c: Gate C (South Entrance, Near Section 125/126)
  * gate_d: Gate D (West Entrance, Near Section 137/138)
- RESTROOMS:
  * restroom_112: Restrooms near Section 112 (Family/All-Gender)
  * restroom_128: Restrooms near Section 128 (Men/Women)
  * restroom_215: Restrooms near Section 215 (Men/Women/Family)
  * restroom_330: Restrooms near Section 330 (Men/Women)
- CONCESSIONS (FOOD & BEVERAGES):
  * taco_110: Tacos World Cup (Section 110)
  * burger_125: American Grill (Section 125)
  * halal_143: Halal Eats (Section 143)
  * brew_220: Stadium Brews (Section 220)
  * brew_305: Stadium Brews (Section 305)
  * vegan_118: Vegan Corner (Section 118)
- FIRST AID:
  * first_aid_119: First Aid near Section 119
  * first_aid_326: First Aid near Section 326
- MERCHANDISE:
  * merch_101: FIFA Official Store (Section 101, near Gate A)
  * merch_230: FIFA Express Store (Section 230)

When answering questions:
1. Identify the user's intent: which facility category are they looking for? If they ask a generic question like "I need a doctor" or "tengo hambre", match it to First Aid or Concessions.
2. Find the facility of that category that is closest to their starting location (or matches the specific gate/section they named). The user's query may contain their starting location (e.g., "where is the nearest bathroom from Section 110?"). If not specified in the query, use the provided start_location.
3. Generate step-by-step walking directions. A stadium is a circle of sections numbered 101 to 149 (lower), 201 to 249 (middle), 301 to 349 (upper).
   - If they are on a different level than the destination, they must use an escalator or stairs near the closest gate (Gate A is near section 101/149/201/249/301/349, Gate B is near 113/114/213/214/313/314, Gate C is near 125/126/225/226/325/326, Gate D is near 137/138/237/238/337/338).
   - Tell them which direction to walk (clockwise/counter-clockwise, or section numbers increasing/decreasing) to reach the destination.
4. Translate the matched destination name and the step-by-step directions perfectly into the user's input language.
5. The response must ONLY contain the raw JSON. Do not include markdown code block formatting (like ```json).
"""

async def query_antigravity_agent(prompt: str):
    from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig
    
    config = LocalAgentConfig(
        system_instructions=SYSTEM_INSTRUCTIONS,
        api_key=GEMINI_API_KEY,
        capabilities=CapabilitiesConfig()
    )
    
    async with Agent(config) as agent:
        response = await agent.chat(prompt)
        text_parts = []
        async for token in response:
            text_parts.append(token)
        return "".join(text_parts)

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/api/status', methods=['GET'])
def get_status():
    """Returns the backend configuration status."""
    return jsonify({
        "status": "online",
        "has_api_key": bool(GEMINI_API_KEY),
        "message": "Global Fan Concierge Backend is running."
    })

@app.route('/api/directions', methods=['POST'])
def get_directions():
    """Handles the translation, facility matching, and routing via GenAI."""
    if not GEMINI_API_KEY:
        return jsonify({
            "status": "offline_mode_recommended",
            "message": "No GEMINI_API_KEY set on the server. Falling back to local offline engine."
        }), 200

    data = request.get_json() or {}
    query = data.get("query", "")
    start_location = data.get("start_location", "Gate A")

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    prompt = f"User Question: \"{query}\"\nAssumed Start Location if not specified: \"{start_location}\""
    
    try:
        agent_response_text = asyncio.run(query_antigravity_agent(prompt))
        
        clean_text = agent_response_text.strip()
        if clean_text.startswith("```"):
            lines = clean_text.splitlines()
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            clean_text = "\n".join(lines).strip()
            
        return clean_text, 200, {'Content-Type': 'application/json'}
    except Exception as e:
        logging.error(f"API Error (Antigravity Agent): {str(e)}", exc_info=True)
        return jsonify({
            "error": "The AI is currently busy. Please wait a moment or use the interactive map."
        }), 200

@app.route('/api/chat', methods=['POST'])
def chat():
    """Securely proxies chat requests to Gemini API from the backend."""
    if not GEMINI_API_KEY:
        return jsonify({"error": "No GEMINI_API_KEY set on the server."}), 500

    data = request.get_json() or {}
    system_instruction = data.get("system_instruction", "")
    system_instruction += " You are a stadium assistant. You MUST limit your responses to a maximum of 2 short sentences. Never ramble or provide long lists."
    query = data.get("query", "")

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    payload = {
        "system_instruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": [
            {
                "role": "user",
                "parts": [{"text": query}]
            }
        ],
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 800,
            "topP": 0.95
        }
    }
    
    import json
    import urllib.request
    
    try:
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            text = result.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
            return jsonify({"text": text}), 200
    except Exception as e:
        logging.error(f"API Error (Gemini API): {str(e)}", exc_info=True)
        if hasattr(e, 'read'):
            logging.error(f"Response body: {e.read().decode('utf-8')}")
        return jsonify({"error": "The AI is currently busy. Please wait a moment or use the interactive map."}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Global Fan Concierge Backend on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
