import { WhatsAppMessage } from '@/types';
import { mockTours } from '@/data/tours';
import { mockDepartures } from '@/data/departures';
import { brandConfig } from '@/config/brand';

export interface AgentResponse {
  message: WhatsAppMessage;
  nextQuickReplies?: string[];
}

export function generateAgentReply(
  userText: string,
  lang: 'en' | 'hi' | 'mr' = 'en'
): AgentResponse {
  const query = userText.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Greetings & initial reply
  if (query.includes('hi') || query.includes('hello') || query.includes('namaste') || query.includes('start') || query.includes('नमस्कार')) {
    const greetingText =
      lang === 'hi'
        ? `नमस्ते! 🙏 ${brandConfig.name} व्हाट्सएप असिस्टेंट में आपका स्वागत है। मैं आपकी यात्रा बुकिंग में कैसे मदद कर सकता हूँ?`
        : lang === 'mr'
        ? `नमस्कार! 🙏 ${brandConfig.name} व्हाट्सअँप असिस्टंटमध्ये आपले स्वागत आहे. मी आपल्याला कशी मदत करू शकेन?`
        : `Namaste! 🙏 Welcome to ${brandConfig.name} Instant Travel Concierge. Where would you like to travel today?`;

    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: greetingText,
        timestamp,
        type: 'text',
      },
      nextQuickReplies: ['Goa Escape', 'Ayodhya Pilgrimage', 'Weekend Trip', 'Talk to Human'],
    };
  }

  // Goa flow
  if (query.includes('goa')) {
    const goaTour = mockTours.find((t) => t.id === 'goa-fun-escape') || mockTours[0];
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `Here is our top-rated Goa trip package! 🌴🌊 Includes 4★ Beach Resort + Sunset Cruise + Watersports.`,
        timestamp,
        type: 'carousel',
        cards: [
          {
            id: goaTour.id,
            title: goaTour.title,
            image: goaTour.heroImage,
            price: `₹${goaTour.pricePerPerson.toLocaleString('en-IN')}/person`,
            duration: goaTour.duration,
          },
        ],
      },
      nextQuickReplies: ['Check Seats for Goa', 'What is included?', 'Book Goa Trip', 'Change Date'],
    };
  }

  // Seats check
  if (query.includes('seat') || query.includes('departure') || query.includes('date')) {
    const goaDeps = mockDepartures.filter((d) => d.tourId === 'goa-fun-escape');
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `📅 Upcoming Departures & Live Available Seats:`,
        timestamp,
        type: 'seats_list',
        seatData: goaDeps.map((d) => ({
          date: d.departureDate,
          seatsLeft: d.totalSeats - d.bookedSeats,
          price: `₹${d.pricePerPerson.toLocaleString('en-IN')}`,
        })),
      },
      nextQuickReplies: ['Select Nov 15 Date', 'Select Nov 22 Date', 'Talk to Human'],
    };
  }

  // Ayodhya / Pilgrimage
  if (query.includes('ayodhya') || query.includes('pilgrimage') || query.includes('shirdi') || query.includes('kashi')) {
    const ayodhyaTour = mockTours.find((t) => t.id === 'ayodhya-kashi-divine') || mockTours[1];
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `Jai Shree Ram! 🚩 Check out our flagship Pilgrimage Yatra with VIP Ram Lalla Darshan & Ganga Aarti boat ride.`,
        timestamp,
        type: 'carousel',
        cards: [
          {
            id: ayodhyaTour.id,
            title: ayodhyaTour.title,
            image: ayodhyaTour.heroImage,
            price: `₹${ayodhyaTour.pricePerPerson.toLocaleString('en-IN')}/person`,
            duration: ayodhyaTour.duration,
          },
        ],
      },
      nextQuickReplies: ['Book Ayodhya Yatra', 'Is Pure Veg food available?', 'Check Seats'],
    };
  }

  // Price summary / Booking intent
  if (query.includes('book') || query.includes('select nov') || query.includes('price summary')) {
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `Here is your Instant Price Estimate for 2 Adults:`,
        timestamp,
        type: 'price_summary',
      },
      nextQuickReplies: ['Apply FESTIVE10 Coupon', 'Pay & Confirm', 'Talk to Human'],
    };
  }

  // Pay & Confirm -> Voucher output
  if (query.includes('pay') || query.includes('confirm') || query.includes('coupon')) {
    const bookingCode = 'VV-WA-' + Math.floor(10000 + Math.random() * 90000);
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `🎉 Woohoo! Your trip is provisionally confirmed! Here is your digital boarding pass voucher:`,
        timestamp,
        type: 'ticket_voucher',
        voucherData: {
          bookingId: bookingCode,
          tour: 'Goa Coastal Sun & Spice Escape',
          date: '15 Nov 2026',
          seats: 2,
          amount: '₹17,998',
        },
      },
      nextQuickReplies: ['Download Voucher', 'Need a Car Rental', 'Talk to Human'],
    };
  }

  // Side flow: Inclusions
  if (query.includes('included') || query.includes('inclusion')) {
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `✅ Included in Package:\n- 4★ Beach Resort Stay with Breakfast\n- Mandovi River Sunset Cruise\n- All AC vehicle transfers & sightseeing\n- Driver charges & entry tickets\n\n❌ Excluded: Airfare & personal drinks.`,
        timestamp,
        type: 'text',
      },
      nextQuickReplies: ['Book Now', 'Cancellation Policy?', 'Show Hotels'],
    };
  }

  // Side flow: Cancellation policy
  if (query.includes('cancellation') || query.includes('policy')) {
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: `🛡️ Cancellation Policy:\n- 100% refund if cancelled 15+ days prior.\n- 50% refund if cancelled 7-14 days prior.\n- Free date changes up to 7 days before departure!`,
        timestamp,
        type: 'text',
      },
      nextQuickReplies: ['Book Now', 'Check Seats', 'Talk to Human'],
    };
  }

  // Talk to human
  if (query.includes('human') || query.includes('agent') || query.includes('support')) {
    return {
      message: {
        id: 'msg_' + Date.now(),
        sender: 'human_agent',
        text: `👨‍💼 A Senior Travel Specialist (Ramesh K.) has been assigned to your chat. He will message you in under 2 minutes!`,
        timestamp,
        type: 'text',
      },
      nextQuickReplies: ['Call Me Now', 'Send Quotation PDF'],
    };
  }

  // Fallback default
  return {
    message: {
      id: 'msg_' + Date.now(),
      sender: 'agent',
      text: `I can help you explore tours, check live seat availability, calculate instant quotes, and generate booking vouchers! What destination would you like to explore?`,
      timestamp,
      type: 'text',
    },
    nextQuickReplies: ['Goa Escape', 'Ayodhya Pilgrimage', 'Weekend Trips', 'Talk to Human'],
  };
}
