"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Clock,
  ArrowRight,
  Send,
  Youtube
} from "lucide-react";
import { socialLinks, footerLinks } from "@/data/AllData";


function NewsletterSignup() {
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white border-0">
      <h3 className="text-xl font-bold mb-2">Stay in the Loop! 💌</h3>
      <p className="text-pink-100 text-sm mb-4">
        Get updates on new collections, workshops, and special offers.
      </p>
      {isSubscribed ? (
        <div className="text-center py-4 font-semibold">Thank you for subscribing!</div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              onClick={handleSubmit}
              size="sm"
              className="bg-white text-pink-600 hover:bg-pink-50 px-4 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-pink-100">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      )}
    </Card>
  );
}

interface FooterLink {
  href: string;
  name: string;
}

function FooterSection({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-bold text-gray-900 mb-4 text-lg">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm flex items-center group"
            >
              <span>{link.name}</span>
              <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialLinkProps {
  social: {
    href: string;
    icon: React.ElementType;
    color: string;
    name: string;
    followers: string | number;
  }
}

function SocialLink({ social }: SocialLinkProps) {
  const IconComponent = social.icon;
  
  return (
    <a
      href={social.href}
      className={`flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 group border border-gray-100 ${social.color}`}
    >
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <div className="font-semibold text-gray-900 text-sm">{social.name}</div>
        <div className="text-xs text-gray-500">{social.followers} followers</div>
      </div>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Brand + Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 logo">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  Hawi Crotchets
                </span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Creating beautiful, handmade crochet pieces with love and attention to detail. 
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Get in Touch</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-pink-500" />Nairobi, Kenya</div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-pink-500" />+254 72894143</div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-pink-500" />hello@hawicrotchets.com</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FooterSection title="Shop" links={footerLinks.shop} />
            <FooterSection title="Services" links={footerLinks.services} />
            <FooterSection title="About" links={footerLinks.about} />
            <FooterSection title="Support" links={footerLinks.support} />
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-2 space-y-6">
            <NewsletterSignup />
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Follow Us</h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <SocialLink key={index} social={social} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>© {currentYear} Hawi Crotchets. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-pink-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-pink-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-pink-600 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
