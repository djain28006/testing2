import { NextResponse } from 'next/server';
import { mockTours } from '@/data/tours';
import { mockDepartures } from '@/data/departures';
import { brandConfig } from '@/config/brand';

export async function POST(req: Request) {
  try {
    const { message, lang = 'en', history = [] } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      return NextResponse.json({
        replyText: `Namaste! 🙏 Welcome to ${brandConfig.name}. How can I assist your trip today?`,
        quickReplies: ['Goa Escape', 'Ayodhya Pilgrimage', 'Check Seats', 'Talk to Human'],
      });
    }

    const systemPrompt = `
You are the AI WhatsApp Concierge for ${brandConfig.name} (${brandConfig.tagline}).
Tone: Polite, helpful, concise (WhatsApp style), warm Indian hospitality.
Language: Respond in ${lang === 'hi' ? 'Hindi (Devanagari script)' : lang === 'mr' ? 'Marathi' : 'English'}.

Catalogue Knowledge:
- Goa 3D2N Beach Escape: ₹8,999/person. Includes 4★ resort, Mandovi sunset cruise, banana boat ride.
- Ayodhya Ram Mandir & Kashi Yatra: 4D3N, ₹14,499/person. Includes VIP Ram Lalla Darshan pass, Ganga Aarti boat ride, Satvik meals.
- Rajasthan Royal Forts: 5D4N, ₹18,999/person. Jaipur Amber Fort, Lake Pichola cruise.
- Kashmir Paradise Sojourn: 6D5N, ₹22,499/person. Dal Lake wooden houseboat stay & Gulmarg Gondola.
- Shirdi Sai Baba: 2D1N, ₹4,999/person. VIP Darshan assistance.

Fleet Vehicles:
- Sedan Dzire: ₹12/km
- SUV Innova Crysta: ₹18/km
- Tempo Traveller 13 Seater: ₹26/km

Format your final output as a valid JSON object with keys:
"replyText": string (WhatsApp text formatted with emojis),
"quickReplies": array of 3-4 short strings (options user can tap),
"intent": string ("goa" | "pilgrimage" | "seats" | "booking" | "general")
`;

    const messagesPayload = [
      { role: 'system', content: systemPrompt },
      ...history.map((h: any) => ({
        role: h.sender === 'user' ? 'user' : 'assistant',
        content: h.text || '',
      })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messagesPayload,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const contentText = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(contentText);

    return NextResponse.json({
      replyText: parsed.replyText || 'Namaste! Where would you like to travel?',
      quickReplies: parsed.quickReplies || ['Goa Escape', 'Ayodhya Pilgrimage', 'Check Seats', 'Talk to Human'],
      intent: parsed.intent || 'general',
    });
  } catch (err: any) {
    console.error('OpenAI Route Error:', err);
    return NextResponse.json({
      replyText: 'Namaste! 🙏 I can help you check live seats, view tour itineraries, and book packages. Where would you like to explore?',
      quickReplies: ['Goa Escape', 'Ayodhya Pilgrimage', 'Check Seats', 'Talk to Human'],
    });
  }
}
