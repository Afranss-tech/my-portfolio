import React, { useState } from 'react';
import SectionHeader from '../SectionHeader';
import { Phone, Mail, Send } from 'lucide-react';
import { FaTelegramPlane, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactSection = ({ contact }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        showToast('Message sent successfully!', 'success');
      } else {
        setStatus('error');
        showToast(data.error || 'Something went wrong.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      showToast('Server error. Please try again later.', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000); // auto-hide
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'sending': return 'Sending...';
      case 'success': return 'Message sent successfully!';
      case 'error': return 'Something went wrong. Try again.';
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'sending': return 'text-blue-300';
      case 'success': return 'text-green-300';
      case 'error': return 'text-red-300';
      default: return '';
    }
  };

  return (
    <section id="contact" className="py-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 animate-gradient-xy opacity-60 z-0"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <SectionHeader Icon={Phone} title="Get In Touch" />

        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-10 space-y-6">
          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-6 text-gray-700">
            <a href={`mailto:${contact?.email}`} className="hover:text-emerald-500 transition"><Mail size={20} /></a>
            <a href={`tel:${contact?.phone}`} className="hover:text-emerald-500 transition"><Phone size={20} /></a>
            <a href={`https://t.me/${contact?.telegram}`} target="_blank" className="hover:text-emerald-500 transition"><FaTelegramPlane size={20} /></a>
            <a href={`https://github.com/${contact?.github}`} target="_blank" className="hover:text-emerald-500 transition"><FaGithub size={20} /></a>
            <a href={`https://linkedin.com/in/${contact?.linkedin}`} target="_blank" className="hover:text-emerald-500 transition"><FaLinkedin size={20} /></a>
          </div>

          {/* Contact Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 focus:ring-2 outline-none transition placeholder-gray-500 text-gray-900"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 focus:ring-2 outline-none transition placeholder-gray-500 text-gray-900"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Your Message"
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-emerald-200 focus:ring-2 outline-none transition resize-none placeholder-gray-500 text-gray-900"
              required
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
            >
              Send Message <Send size={18} />
            </button>

            {toast.message && (
              <div
                className={`fixed bottom-6 right-6 px-6 py-4 rounded shadow-lg text-white font-semibold z-50 transition-transform transform ${
                  toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {toast.message}
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 10s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
