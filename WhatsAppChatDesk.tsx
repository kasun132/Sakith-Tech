import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, CheckCircle2 } from 'lucide-react';

interface WhatsAppChatDeskProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  presetProductTitle?: string;
}

export const WhatsAppChatDesk: React.FC<WhatsAppChatDeskProps> = ({
  isOpen,
  onClose,
  onOpen,
  presetProductTitle,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Ayubowan! 👋 Welcome to Sakith Tech Maharagama. Looking for a case or fast charger? Send us your phone model or question!',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState(
    presetProductTitle ? `Hi, is ${presetProductTitle} available in Maharagama warehouse?` : ''
  );

  const quickQuestions = [
    'Do you have iPhone 16 Pro Max covers?',
    'How fast is Cash on Delivery to Kandy?',
    'Is warranty included on GaN chargers?',
    'Can I inspect package before paying COD?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate instant automated tech response from Maharagama hub
    setTimeout(() => {
      let reply = "Yes! All verified stocks are ready at our Maharagama Hub. We offer 24-48h Doorstep Delivery with Cash On Delivery (COD) & inspection before payment. Let's connect directly on WhatsApp for live photos!";
      if (text.toLowerCase().includes('kandy') || text.toLowerCase().includes('delivery')) {
        reply = "Delivery to Kandy, Galle & islandwide takes 24-72 hours via Domex Express. Doorstep Cash on Delivery (COD) is available!";
      } else if (text.toLowerCase().includes('warranty')) {
        reply = "Yes! All our GaN chargers, power banks and audio gear carry a 6-Month Official Store Warranty with direct replacement.";
      } else if (text.toLowerCase().includes('iphone')) {
        reply = "Yes! We carry frosted matte, clear air-cushion, and heavy-duty armor cases for iPhone 11 through 16 Pro Max.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  const launchWhatsAppDirect = () => {
    const query = encodeURIComponent(
      inputText || 'Hi Sakith Tech! I would like to inquire about phone accessories and islandwide COD delivery.'
    );
    window.open(`https://wa.me/94771234567?text=${query}`, '_blank');
  };

  return (
    <>
      {/* Floating Trigger Button with Speech Bubble */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        
        {/* Help Speech Bubble Pill (visible like in screenshot) */}
        {!isOpen && (
          <div 
            onClick={onOpen}
            className="flex items-center gap-2 bg-white text-slate-800 px-3.5 py-2 rounded-full shadow-lg border border-slate-200 cursor-pointer animate-bounce duration-1000 select-none hover:shadow-xl transition-all"
          >
            <span className="text-xs font-semibold">Need help choosing your case? Chat with us!</span>
            <div className="relative flex items-center justify-center">
              <span className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center shadow-xs">
                <MessageSquare className="w-3.5 h-3.5 text-white fill-white" />
              </span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                1
              </span>
            </div>
          </div>
        )}

        {/* Emerald Round WhatsApp Launcher */}
        <button
          onClick={isOpen ? onClose : onOpen}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 cursor-pointer relative"
          title="Direct WhatsApp Desk"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageSquare className="w-7 h-7 text-white fill-white" />
          )}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold">
              1
            </span>
          )}
        </button>

      </div>

      {/* WhatsApp Chat Popup Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] sm:w-[380px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-[#0f1f4b] text-white p-4 flex items-center justify-between border-b border-blue-900">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0f1f4b]"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold font-display flex items-center gap-1.5">
                  Sakith Tech Desk
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                </h4>
                <p className="text-[11px] text-slate-300 font-medium">
                  Maharagama Hub • Typically replies in 2m
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f8fafc] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0037b0] text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick FAQ Chips */}
          <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 text-[10px] font-medium bg-white text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input & WhatsApp Launch Bar */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message or phone model..."
                className="flex-1 h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSend()}
                className="h-9 w-9 bg-[#0037b0] hover:bg-blue-800 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={launchWhatsAppDirect}
              className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Continue in Official WhatsApp (+94 77 123 4567)</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
};
