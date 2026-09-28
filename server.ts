import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Gemini Rail Companion chat endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const query = message.toLowerCase();

  // Try live Gemini if API key is present
  if (ai) {
    try {
      const systemInstruction = `You are Gemini Rail Companion (Model 2.5 RailMind), a gentle, reassuring, and highly accurate travel assistant for Indian Railways.
The traveler is Rahul Kumar, traveling on Train 12952 Mumbai Tejas Rajdhani from New Delhi (NDLS) to Mumbai Central (MMCT), seated in Coach A1, Berth 31 (Lower Berth, Window side).
The current live location is approaching Vadodara Junction (BRC) with a scheduled 10-minute halt on Platform 1 at 01:53 AM. Next station is Surat at 03:22 AM.
You know all details about:
- Vadodara halt: 10 mins, Platform 1, Coach A1 door directly faces the 24-hour certified IRCTC tea stall, RPF Police booth is 18 meters to the left, platform is fully lit and level with the train.
- Coach amenities: 220V power socket next to Berth 31 pillow, reading lamp, under-berth luggage anchor ring, sanitized linen pack with 2 fleece blankets.
- Quiet hours: 11:00 PM to 6:00 AM (lights dimmed, gentle haptics, low horn protocol).
- Pantry car: Located in Coach B1, snacks and hot ginger tea available until 02:30 AM. Breakfast starts at 06:15 AM with complimentary morning tea, followed by hot breakfast between 07:00 and 07:45 AM.
- Attendant: Rajesh Kumar stationed near Door 1 / Berth Bay 1.
- Emergency: RailMadad 139 and Silent SOS alert.

Respond in a gentle, mindful, reassuring, and warm tone. Use bullet points or short paragraphs where helpful. Keep responses concise and practical for someone resting on an overnight train.`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || 'Journey status verified. Train 12952 is moving smoothly on schedule.';
      res.json({ text, source: 'gemini' });
      return;
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local railway intelligence:', err?.message);
    }
  }

  // Domain-grounded fallback responses
  let reply = "I've checked the live train logs for 12952 Tejas Rajdhani. The train is moving smoothly along the Godhra-Vadodara stretch on track with 98.4% punctuality.";

  if (query.includes('vadodara') || query.includes('tea') || query.includes('safe') || query.includes('step out')) {
    reply = "Yes, Rahul! Vadodara (BRC) has a scheduled 10-minute halt on Platform 1 (ETA 01:53 AM). Your Coach A1 door opens directly facing the 24-hour certified IRCTC tea stall. There is an RPF Police booth 18 meters to your left, and the platform is brightly lit. Listen for the two whistle chimes at the 7-minute mark so you can leisurely re-board.";
  } else if (query.includes('luggage') || query.includes('bag') || query.includes('sleep') || query.includes('theft') || query.includes('lock')) {
    reply = "Your 24-inch trolley fits securely under Berth 31 (Lower Berth). There is an integrated stainless steel anchor ring beneath your berth cushion for a cable lock. Coach vestibule doors are electronically secured past 11:00 PM, and Attendant Rajesh Kumar is stationed near Door 1.";
  } else if (query.includes('snack') || query.includes('haldiram') || query.includes('food') || query.includes('eat') || query.includes('midnight')) {
    reply = "The pantry car in Coach B1 remains active until 2:30 AM. Fresh Haldiram Rajbhog, Paneer Tikka wraps, roasted nuts, and warm ginger cardamom tea can be delivered directly to Coach A1 Berth 31 within 8 to 10 minutes.";
  } else if (query.includes('wake') || query.includes('surat') || query.includes('alarm')) {
    reply = "Surat arrival is scheduled for 03:22 AM on Platform 2. I have set a soft haptic wake-up alert on your phone for 03:02 AM (20 minutes buffer). Attendant Rajesh also keeps a passenger wake-up sheet. Sleep peacefully!";
  } else if (query.includes('breakfast') || query.includes('morning') || query.includes('tea') || query.includes('coffee')) {
    reply = "Morning service begins with warm tea and digestive biscuits at 06:15 AM. Hot South Indian Upma, Idli-Vada, or Masala Omelettes will be served between 07:00 AM and 07:45 AM before arriving at Borivali and Mumbai Central.";
  } else if (query.includes('charging') || query.includes('switch') || query.includes('plug') || query.includes('socket')) {
    reply = "Your individual 230V multi-pin socket is located right beside Berth 31's headrest, beneath the reading lamp toggle. It stays powered continuously throughout the night with built-in surge protection.";
  } else if (query.includes('blanket') || query.includes('linen') || query.includes('cold') || query.includes('ac') || query.includes('temperature')) {
    reply = "Coach A1 temperature is maintained at a comfortable 23°C. Two sanitized pure fleece blankets and sealed fresh cotton linens are already stationed at Berth 31. If you need an extra blanket, tap the 'Extra Blanket' button in your toolbelt.";
  } else if (query.includes('speed') || query.includes('delay') || query.includes('late') || query.includes('ontime')) {
    reply = "Current speed is 114 km/h with clear double-green automatic block signaling. The 6-minute delay incurred near Ratlam has been absorbed during the straight run through Godhra. Expected arrival at Mumbai Central is right on time at 08:35 AM.";
  }

  res.json({ text: reply, source: 'offline-railmind' });
});

// Start dev or production server
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`🚂 Train Bro Server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
