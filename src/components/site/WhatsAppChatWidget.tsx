'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { generateAgentReply } from '@/lib/mockAgent';
import { WhatsAppMessage } from '@/types';
import { brandConfig } from '@/config/brand';
import {
  MessageSquare, X, Send, Mic, Image as ImageIcon,
  CheckCheck, Bot, User, Ticket, ExternalLink, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppChatWidget() {
  const { whatsAppWidgetOpen, setWhatsAppWidgetOpen, addToast } = useApp();
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: 'm_init',
      sender: 'agent',
      text: `Namaste! 🙏 Welcome to ${brandConfig.name} WhatsApp Assistant. Where would you like to travel today?`,
      timestamp: '12:00 PM',
      type: 'text',
    },
  ]);

  const [quickReplies, setQuickReplies] = useState<string[]>([
    'Goa Escape',
    'Ayodhya Pilgrimage',
    'Check Seats for Goa',
    'Talk to Human',
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const userMsg: WhatsAppMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: userTime,
      type: 'text',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setIsTyping(true);

    try {
      // Call Real OpenAI Route
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          lang,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      // Check intent for rich cards
      const lower = text.toLowerCase();
      let richType: WhatsAppMessage['type'] = 'text';
      let cards = undefined;
      let seatData = undefined;
      let voucherData = undefined;

      if (lower.includes('goa')) {
        richType = 'carousel';
        cards = [
          {
            id: 'goa-fun-escape',
            title: 'Goa Coastal Sun & Spice Escape',
            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800',
            price: '₹8,999/person',
            duration: '3 Days / 2 Nights',
          },
        ];
      } else if (lower.includes('seat')) {
        richType = 'seats_list';
        seatData = [
          { date: '2026-11-15', seatsLeft: 12, price: '₹8,999' },
          { date: '2026-11-22', seatsLeft: 4, price: '₹8,999' },
        ];
      } else if (lower.includes('pay') || lower.includes('confirm')) {
        richType = 'ticket_voucher';
        voucherData = {
          bookingId: 'VV-WA-' + Math.floor(10000 + Math.random() * 90000),
          tour: 'Goa Coastal Sun & Spice Escape',
          date: '15 Nov 2026',
          seats: 2,
          amount: '₹17,998',
        };
      }

      const agentMsg: WhatsAppMessage = {
        id: 'msg_' + Date.now(),
        sender: 'agent',
        text: data.replyText,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        type: richType,
        cards,
        seatData,
        voucherData,
      };

      setMessages((prev) => [...prev, agentMsg]);
      if (data.quickReplies) setQuickReplies(data.quickReplies);
    } catch (err) {
      // Fallback script engine
      const { message, nextQuickReplies } = generateAgentReply(text, lang);
      setIsTyping(false);
      setMessages((prev) => [...prev, message]);
      if (nextQuickReplies) setQuickReplies(nextQuickReplies);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!whatsAppWidgetOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setWhatsAppWidgetOpen(true)}
          className="fixed bottom-24 sm:bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-110"
          aria-label="Open WhatsApp AI Agent"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-saffron-500 border-2 border-ink-950 animate-ping" />
        </motion.button>
      )}

      {/* WhatsApp Phone Frame Modal */}
      <AnimatePresence>
        {whatsAppWidgetOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md h-[600px] max-h-[85vh] bg-[#0b141a] border border-emerald-900/60 rounded-3xl overflow-hidden flex flex-col shadow-2xl text-white"
          >
            {/* Header */}
            <div className="bg-[#1f2c34] p-3.5 flex items-center justify-between border-b border-[#2a3942]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1f2c34]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span>{brandConfig.name} OpenAI Agent</span>
                    <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
                  </h4>
                  <p className="text-[11px] text-emerald-400">Online • Live GPT-4o-mini Connected</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#111b21] rounded-lg p-0.5 text-[10px]">
                  <button onClick={() => setLang('en')} className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-400'}`}>EN</button>
                  <button onClick={() => setLang('hi')} className={`px-1.5 py-0.5 rounded ${lang === 'hi' ? 'bg-emerald-600 text-white' : 'text-gray-400'}`}>हिंदी</button>
                  <button onClick={() => setLang('mr')} className={`px-1.5 py-0.5 rounded ${lang === 'mr' ? 'bg-emerald-600 text-white' : 'text-gray-400'}`}>मराठी</button>
                </div>

                <button onClick={() => setWhatsAppWidgetOpen(false)} className="p-1.5 text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a]">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow ${isUser ? 'bg-[#005c4b] text-white rounded-tr-none' : 'bg-[#202c33] text-gray-100 rounded-tl-none border border-[#2a3942]'}`}>
                      {msg.text && <p className="whitespace-pre-line">{msg.text}</p>}

                      {msg.type === 'carousel' && msg.cards && (
                        <div className="mt-2 space-y-2">
                          {msg.cards.map((c) => (
                            <div key={c.id} className="rounded-xl overflow-hidden bg-[#111b21] border border-[#2a3942] p-2">
                              <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2">
                                <Image src={c.image} alt={c.title} fill className="object-cover" />
                              </div>
                              <h5 className="font-bold text-white text-xs">{c.title}</h5>
                              <div className="flex items-center justify-between text-[11px] text-emerald-400 mt-1">
                                <span>{c.price}</span>
                                <span className="text-gray-400">{c.duration}</span>
                              </div>
                              <button onClick={() => handleSendMessage(`I want to book ${c.title}`)} className="w-full mt-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]">
                                Select Tour
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.type === 'seats_list' && msg.seatData && (
                        <div className="mt-2 space-y-1.5">
                          {msg.seatData.map((s, idx) => (
                            <div key={idx} onClick={() => handleSendMessage(`Select ${s.date} Date`)} className="p-2 rounded-lg bg-[#111b21] border border-[#2a3942] hover:border-emerald-500 cursor-pointer flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-white">{s.date}</span>
                              <span className="text-saffron-400 font-bold">{s.seatsLeft} seats left</span>
                              <span className="text-emerald-400 font-bold">{s.price}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.type === 'ticket_voucher' && msg.voucherData && (
                        <div className="mt-2 p-3 rounded-xl bg-[#111b21] border border-saffron-500/60 text-[11px] space-y-2">
                          <div className="flex items-center justify-between text-saffron-400 font-bold border-b border-gray-800 pb-1">
                            <span className="flex items-center gap-1"><Ticket className="w-3.5 h-3.5" /> {msg.voucherData.bookingId}</span>
                            <span>CONFIRMED</span>
                          </div>
                          <p className="font-bold text-white text-xs">{msg.voucherData.tour}</p>
                          <Link href="/booking/confirmation" onClick={() => setWhatsAppWidgetOpen(false)} className="block text-center py-1.5 rounded-lg bg-saffron-500 text-ink-950 font-bold text-[11px] mt-1">
                            View Boarding Pass Voucher 🎫
                          </Link>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-gray-400">
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#202c33] text-gray-400 text-xs w-24">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Quick Reply Chips */}
            {quickReplies.length > 0 && (
              <div className="p-2 bg-[#111b21] border-t border-[#2a3942] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {quickReplies.map((reply, i) => (
                  <button key={i} onClick={() => handleSendMessage(reply)} className="px-2.5 py-1 rounded-full bg-[#1f2c34] hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-medium whitespace-nowrap border border-emerald-800/40 transition-colors">
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <div className="p-3 bg-[#1f2c34] border-t border-[#2a3942]">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                <button type="button" onClick={() => addToast({ title: 'Voice Note simulation', description: 'Mic active.', type: 'info' })} className="p-2 text-gray-400 hover:text-emerald-400" title="Voice Note">
                  <Mic className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => addToast({ title: 'Image Attachment simulation', description: 'Photo attached.', type: 'info' })} className="p-2 text-gray-400 hover:text-emerald-400" title="Attach Photo">
                  <ImageIcon className="w-4 h-4" />
                </button>

                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type message..." className="flex-1 px-3 py-2 rounded-xl bg-[#2a3942] text-white placeholder-gray-400 text-xs focus:outline-none" />
                <button type="submit" className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow">
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <a href={`https://wa.me/${brandConfig.whatsappNumber}?text=Hello%20VedicVibe%20Tours`} target="_blank" rel="noreferrer" className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 hover:underline">
                <span>Continue on official WhatsApp App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
