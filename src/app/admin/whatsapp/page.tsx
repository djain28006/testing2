'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockWhatsAppChats } from '@/data/adminMockData';
import { WhatsAppChat, WhatsAppMessage } from '@/types';
import { generateAgentReply } from '@/lib/mockAgent';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import {
  MessageSquare, Search, Bot, User, CheckCheck, Send, Sparkles,
  Phone, AlertTriangle, ShieldCheck, Flame, ToggleLeft, ToggleRight,
  TrendingUp, Settings, Play, Plus, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminWhatsAppInboxPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'analytics' | 'settings' | 'sandbox'>('inbox');
  const [chats, setChats] = useState<WhatsAppChat[]>(mockWhatsAppChats);
  const [activeChat, setActiveChat] = useState<WhatsAppChat>(mockWhatsAppChats[0]);

  const [inputMsg, setInputMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useApp();

  // Settings State
  const [greetingMsg, setGreetingMsg] = useState(
    'Namaste! 🙏 Welcome to VedicVibe Tours Instant Travel Concierge.'
  );
  const [tone, setTone] = useState<'Friendly' | 'Formal'>('Friendly');
  const [aiEnabled, setAiEnabled] = useState(true);

  // Sandbox State
  const [sandboxMessages, setSandboxMessages] = useState<WhatsAppMessage[]>([
    { id: 'sb_1', sender: 'agent', text: 'Namaste! Welcome to VedicVibe Sandbox Test Bot.', timestamp: '12:00 PM' },
  ]);
  const [sandboxInput, setSandboxInput] = useState('');

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const userTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newMsg: WhatsAppMessage = {
      id: 'msg_' + Date.now(),
      sender: activeChat.aiMode ? 'user' : 'human_agent',
      text: inputMsg,
      timestamp: userTime,
    };

    const updatedMessages = [...activeChat.messages, newMsg];

    setChats((prev) =>
      prev.map((c) => (c.id === activeChat.id ? { ...c, messages: updatedMessages, lastMessage: inputMsg } : c))
    );
    setActiveChat((prev) => ({ ...prev, messages: updatedMessages, lastMessage: inputMsg }));
    setInputMsg('');

    // If AI Mode is enabled on active chat, generate reply automatically
    if (activeChat.aiMode) {
      setTimeout(() => {
        const { message } = generateAgentReply(inputMsg);
        setChats((prev) =>
          prev.map((c) => (c.id === activeChat.id ? { ...c, messages: [...updatedMessages, message] } : c))
        );
        setActiveChat((prev) => ({ ...prev, messages: [...updatedMessages, message] }));
      }, 1000);
    }
  };

  const handleToggleAi = () => {
    const newAiState = !activeChat.aiMode;
    const updated = { ...activeChat, aiMode: newAiState };
    setActiveChat(updated);
    setChats((prev) => prev.map((c) => (c.id === activeChat.id ? updated : c)));
    addToast({
      title: newAiState ? 'AI Agent Enabled' : 'Human Took Over Chat',
      description: newAiState ? 'Bot is responding automatically.' : 'Manual human agent active.',
      type: 'info',
    });
  };

  const handleSandboxSend = () => {
    if (!sandboxInput.trim()) return;
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const userM: WhatsAppMessage = { id: 'sb_u_' + Date.now(), sender: 'user', text: sandboxInput, timestamp: time };

    setSandboxMessages((prev) => [...prev, userM]);
    setSandboxInput('');

    setTimeout(() => {
      const { message } = generateAgentReply(sandboxInput);
      setSandboxMessages((prev) => [...prev, message]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ink-800 pb-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <span>WhatsApp AI Booking Agent Hub</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
              Live Simulation
            </span>
          </h1>
          <p className="text-xs text-ink-300">Automated WhatsApp conversations, customer handoff, and bot sandbox</p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-ink-900 rounded-2xl p-1 border border-teal-900/60 text-xs">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'inbox' ? 'bg-teal-700 text-white' : 'text-ink-300 hover:text-white'
            }`}
          >
            Live Inbox
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'analytics' ? 'bg-teal-700 text-white' : 'text-ink-300 hover:text-white'
            }`}
          >
            Agent Analytics
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'settings' ? 'bg-teal-700 text-white' : 'text-ink-300 hover:text-white'
            }`}
          >
            Agent Settings
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'sandbox' ? 'bg-saffron-500 text-ink-950 font-bold' : 'text-ink-300 hover:text-white'
            }`}
          >
            ⚡ Test Sandbox
          </button>
        </div>
      </div>

      {/* TAB 1: 3-COLUMN LIVE INBOX */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px] bg-ink-900 border border-teal-900/40 rounded-3xl overflow-hidden shadow-2xl">
          {/* Column 1: Conversations List */}
          <div className="lg:col-span-3 border-r border-ink-800 flex flex-col bg-ink-950">
            <div className="p-3 border-b border-ink-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-ink-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chats by name or phone..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-ink-900 border border-teal-900 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-ink-900">
              {chats.map((c) => {
                const isSel = c.id === activeChat.id;

                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveChat(c)}
                    className={`p-3.5 cursor-pointer transition-colors space-y-1.5 ${
                      isSel ? 'bg-teal-950/80 border-l-4 border-teal-400' : 'hover:bg-ink-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <h4 className="font-bold text-white truncate max-w-[130px]">{c.customerName}</h4>
                      <span className="text-[10px] text-ink-300">{c.updatedAt}</span>
                    </div>

                    <p className="text-[11px] text-ink-300 truncate">{c.lastMessage}</p>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          c.leadHeat === 'Hot'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-saffron-950 text-saffron-400 border border-saffron-800'
                        }`}
                      >
                        🔥 {c.leadHeat}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-ink-800 text-teal-300">
                        {c.tag}
                      </span>
                      {c.aiMode && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 font-bold ml-auto">
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Active Chat Area */}
          <div className="lg:col-span-6 flex flex-col bg-[#0b141a]">
            {/* Active Chat Header Banner */}
            <div className="p-3 bg-[#1f2c34] border-b border-[#2a3942] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{activeChat.customerName}</span>
                  <span className="text-[11px] text-emerald-400 font-normal">{activeChat.customerPhone}</span>
                </h4>
                <span className="text-[10px] text-gray-400">
                  {activeChat.aiMode ? '🤖 AI Agent is managing responses' : '👨‍💼 Human Manager Active'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleAi}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeChat.aiMode
                      ? 'bg-emerald-600 text-white'
                      : 'bg-saffron-500 text-ink-950 font-bold'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>{activeChat.aiMode ? 'AI Mode ON' : 'Take Over Chat'}</span>
                </button>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="p-2 bg-[#111b21] border-b border-[#2a3942] flex items-center gap-2 overflow-x-auto text-[11px]">
              <button
                onClick={() => addToast({ title: 'Quote PDF Sent!', description: 'Sent to WhatsApp chat.', type: 'success' })}
                className="px-2.5 py-1 rounded-lg bg-teal-900/80 text-teal-300 hover:bg-teal-800"
              >
                + Send Quote
              </button>
              <button
                onClick={() => addToast({ title: 'Payment Link Sent!', description: 'UPI link generated.', type: 'success' })}
                className="px-2.5 py-1 rounded-lg bg-teal-900/80 text-teal-300 hover:bg-teal-800"
              >
                + Send Payment Link
              </button>
              <button
                onClick={() => addToast({ title: 'Ticket Voucher Sent!', description: 'Digital voucher attached.', type: 'success' })}
                className="px-2.5 py-1 rounded-lg bg-saffron-950 text-saffron-400 border border-saffron-700"
              >
                + Send Voucher
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a]">
              {activeChat.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                        isUser
                          ? 'bg-[#202c33] text-gray-100 rounded-tl-none border border-[#2a3942]'
                          : 'bg-[#005c4b] text-white rounded-tr-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] text-gray-400 block text-right mt-1">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-[#1f2c34] border-t border-[#2a3942]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder={activeChat.aiMode ? 'Simulate customer message...' : 'Reply as Human Agent...'}
                  className="flex-1 px-3 py-2 rounded-xl bg-[#2a3942] text-white text-xs placeholder-gray-400 focus:outline-none"
                />
                <button type="submit" className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 3: Customer Profile & Linked Details */}
          <div className="lg:col-span-3 p-4 bg-ink-950 border-l border-ink-800 space-y-4 overflow-y-auto text-xs">
            <div className="p-4 rounded-2xl bg-ink-900 border border-teal-900/40 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white font-bold text-base flex items-center justify-center mx-auto">
                {activeChat.customerName.charAt(0)}
              </div>
              <h4 className="font-bold text-white text-sm">{activeChat.customerName}</h4>
              <span className="text-teal-400 block">{activeChat.customerPhone}</span>
            </div>

            <div className="p-4 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-2">
              <h5 className="font-semibold text-white uppercase text-[10px] tracking-wider">Lead Signals</h5>
              <div className="flex justify-between">
                <span className="text-ink-300">Lead Score</span>
                <strong className="text-saffron-400">88% (HOT)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-300">Intended Trip</span>
                <strong className="text-white">Goa 3D2N Escape</strong>
              </div>
            </div>

            <button
              onClick={() => addToast({ title: 'Booking Pre-filled!', description: 'Created booking from chat details.', type: 'success' })}
              className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs"
            >
              + Create Booking from Chat
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: AGENT ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
              <span className="text-xs text-ink-300">Total WhatsApp Chats Today</span>
              <div className="text-3xl font-bold text-white">142</div>
            </div>
            <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
              <span className="text-xs text-ink-300">AI Auto-Resolved %</span>
              <div className="text-3xl font-bold text-emerald-400">92.4%</div>
            </div>
            <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
              <span className="text-xs text-ink-300">WhatsApp Direct Bookings</span>
              <div className="text-3xl font-bold text-saffron-400">38</div>
            </div>
            <div className="p-5 rounded-2xl bg-ink-900 border border-teal-900/40 space-y-1">
              <span className="text-xs text-ink-300">Avg Response Time</span>
              <div className="text-3xl font-bold text-teal-300">0.8 sec</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AGENT SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-ink-900 border border-teal-900/40 space-y-6 max-w-3xl text-xs">
          <h3 className="text-lg font-serif font-bold text-white">AI Agent Persona & Greeting Settings</h3>

          <div className="space-y-3">
            <div>
              <label className="text-teal-400 font-semibold block mb-1">Greeting Message</label>
              <textarea
                rows={3}
                value={greetingMsg}
                onChange={(e) => setGreetingMsg(e.target.value)}
                className="w-full p-3 rounded-xl bg-ink-950 border border-teal-900 text-white text-xs"
              />
            </div>

            <div>
              <label className="text-teal-400 font-semibold block mb-1">Tone Selector</label>
              <div className="flex gap-4">
                {(['Friendly', 'Formal'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                      tone === t ? 'bg-teal-700 text-white' : 'bg-ink-950 text-ink-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TEST SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="max-w-xl mx-auto p-6 rounded-3xl bg-[#0b141a] border border-saffron-500/60 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-saffron-400" />
              <span>WhatsApp Bot Live Sandbox</span>
            </h3>
            <span className="text-[10px] text-saffron-400">Owner Testing Mode</span>
          </div>

          <div className="h-80 overflow-y-auto space-y-3 p-2">
            {sandboxMessages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-xs max-w-[85%] ${m.sender === 'user' ? 'bg-[#005c4b]' : 'bg-[#202c33]'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSandboxSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={sandboxInput}
              onChange={(e) => setSandboxInput(e.target.value)}
              placeholder="Ask bot: 'Show Goa packages' or 'Check seats'..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#2a3942] text-white text-xs"
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-saffron-500 text-ink-950 font-bold text-xs">
              Test
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
