import React, { useState } from 'react';
import { useSafety } from '../context/SafetyContext';
import { UserPlus, Trash2, Phone, Heart, Shield, Plus } from 'lucide-react';
import { Contact } from '../types';

export const Contacts: React.FC = () => {
  const { contacts, addContact, removeContact } = useSafety();
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    
    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation || 'Friend'
    };
    
    addContact(contact);
    setNewContact({ name: '', phone: '', relation: '' });
  };

  return (
    <div className="animate-slide-up max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
                <Heart className="w-6 h-6 text-red-500 fill-red-500/20" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Emergency Circle</h2>
                <p className="text-slate-400 text-sm">Trusted contacts who will receive your distress signal.</p>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-400">{contacts.length} Protected Contacts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact List Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min">
            {contacts.map((contact, index) => (
                <div 
                    key={contact.id} 
                    className="group bg-slate-900/40 border border-white/5 rounded-2xl p-5 hover:bg-slate-800/60 hover:border-red-500/30 transition-all duration-300 relative overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/0 to-red-500/5 rounded-bl-full group-hover:to-red-500/10 transition-colors"></div>
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-lg font-bold text-white shadow-inner group-hover:scale-105 transition-transform">
                            {contact.name.charAt(0)}
                        </div>
                        <button 
                            onClick={() => removeContact(contact.id)}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="relative z-10">
                        <h4 className="font-bold text-white text-lg mb-1">{contact.name}</h4>
                        <p className="text-xs text-red-400 font-medium mb-3 uppercase tracking-wider">{contact.relation}</p>
                        <div className="flex items-center gap-2 text-slate-400 bg-black/20 p-2 rounded-lg">
                            <Phone className="w-3 h-3" />
                            <span className="text-sm font-mono">{contact.phone}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Empty State / Add Placeholder */}
            {contacts.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                    <p className="text-slate-500">No contacts added yet.</p>
                </div>
            )}
        </div>

        {/* Add Contact Form Panel */}
        <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <div className="p-1.5 bg-red-500 rounded text-white"><Plus className="w-3 h-3" /></div>
                    Add New Contact
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 ml-1">Full Name</label>
                        <input 
                            type="text" 
                            value={newContact.name}
                            onChange={e => setNewContact({...newContact, name: e.target.value})}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                            placeholder="e.g. Jane Doe"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 ml-1">Phone Number</label>
                        <input 
                            type="tel" 
                            value={newContact.phone}
                            onChange={e => setNewContact({...newContact, phone: e.target.value})}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                            placeholder="e.g. +1 555 000 0000"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-400 ml-1">Relationship</label>
                        <input 
                            type="text" 
                            value={newContact.relation}
                            onChange={e => setNewContact({...newContact, relation: e.target.value})}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                            placeholder="e.g. Brother"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 mt-4 flex items-center justify-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Save Contact
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};