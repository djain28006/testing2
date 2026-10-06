export type TourCategory = 'One Day' | 'Weekend' | 'Family' | 'Group' | 'Pilgrimage' | 'Adventure' | 'Corporate' | 'School/College';

export type MonthStatus = 'great' | 'okay' | 'avoid';

export interface BestTimeHeatmap {
  month: string; // Jan, Feb, Mar ...
  status: MonthStatus;
  temp: string;
  weather: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  stay: string;
  image: string;
  locationPin: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destinationId: string;
  destinationName: string;
  state: string;
  category: TourCategory;
  duration: string; // e.g. "3 Days / 2 Nights"
  daysCount: number;
  pricePerPerson: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  pickupPoints: string[];
  hotelCategory: string;
  mealPlan: string;
  bestTimeHeatmap: BestTimeHeatmap[];
  itinerary: ItineraryDay[];
  featured?: boolean;
  rankedPosition?: number;
  vibes: ('Chill' | 'Adventure' | 'Spiritual' | 'Family')[];
  minBudget: number;
}

export interface Departure {
  id: string;
  tourId: string;
  tourTitle: string;
  destinationName: string;
  departureDate: string; // YYYY-MM-DD
  returnDate: string;
  totalSeats: number;
  bookedSeats: number;
  pricePerPerson: number;
  status: 'Open' | 'Filling Fast' | 'Sold Out' | 'Cancelled';
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  state: string;
  image: string;
  gallery: string[];
  description: string;
  bestTimeToVisit: string;
  attractions: string[];
  latitude: number;
  longitude: number;
  mapPinX: number; // percentage on custom SVG map (0-100)
  mapPinY: number; // percentage on custom SVG map (0-100)
  tourCount: number;
  isPopular?: boolean;
  rank?: number;
}

export interface Hotel {
  id: string;
  name: string;
  destination: string;
  starRating: number;
  pricePerNight: number;
  image: string;
  gallery: string[];
  amenities: string[];
  roomTypes: { name: string; capacity: number; price: number }[];
  address: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Cars' | 'SUVs' | 'Tempo Travellers' | 'Mini buses' | 'Buses' | 'Luxury';
  seats: number;
  pricePerKm: number;
  driverAllowancePerDay: number;
  baseFarePerDay: number;
  image: string;
  features: string[];
  luggageCapacity: string;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. VV-89210
  tourId: string;
  tourTitle: string;
  departureDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  adultsCount: number;
  childrenCount: number;
  pickupPoint: string;
  totalAmount: number;
  paidAmount: number;
  paymentType: 'Full' | 'Advance';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  bookedAt: string;
  assignedVehicle?: string;
  assignedHotel?: string;
  qrCodeUrl?: string;
}

export interface Enquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  destination: string;
  travelDate: string;
  travellersCount: number;
  budgetPerPerson: number;
  status: 'New' | 'Quoted' | 'Converted' | 'Closed';
  createdAt: string;
  notes?: string;
}

export interface Quotation {
  id: string;
  enquiryId: string;
  customerName: string;
  customerPhone: string;
  tourTitle: string;
  validUntil: string;
  lineItems: { description: string; amount: number }[];
  totalAmount: number;
  status: 'Sent' | 'Accepted' | 'Expired';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minBookingValue: number;
  validUntil: string;
  description: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatar: string;
  tourTitle: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBooking: boolean;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'agent' | 'human_agent';
  text?: string;
  timestamp: string;
  type?: 'text' | 'carousel' | 'seats_list' | 'price_summary' | 'ticket_voucher' | 'quick_replies';
  cards?: {
    id: string;
    title: string;
    image: string;
    price: string;
    duration: string;
  }[];
  quickReplies?: string[];
  voucherData?: {
    bookingId: string;
    tour: string;
    date: string;
    seats: number;
    amount: string;
  };
  seatData?: { date: string; seatsLeft: number; price: string }[];
}

export interface WhatsAppChat {
  id: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  unreadCount: number;
  tag: 'New lead' | 'Booking' | 'Payment pending' | 'Human needed';
  leadHeat: 'Cold' | 'Warm' | 'Hot';
  aiMode: boolean; // true = AI handling, false = human took over
  updatedAt: string;
  messages: WhatsAppMessage[];
}

export interface PilgrimageDarshanInfo {
  templeName: string;
  location: string;
  darshanTimings: string;
  vipPassInfo: string;
  dressCode: string;
  bestMonths: string;
  image: string;
  carryChecklist: string[];
}
