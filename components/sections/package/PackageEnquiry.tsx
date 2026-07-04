"use client";

import React, { useState } from "react";
import { Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_DATA } from "@/constants/contact";

interface PackageEnquiryProps {
  packageTitle: string;
}

export function PackageEnquiry({ packageTitle }: PackageEnquiryProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`Hello, I am interested in booking or receiving details for the ${packageTitle}. Please contact me.`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "50d01b1a-7b5e-46dc-8ee5-49af3bb10833",
          name: name,
          phone: phone,
          email: email || "Not Provided",
          message: message,
          package: packageTitle,
          subject: `New Pilgrimage Enquiry: ${packageTitle} - ${name}`,
          from_name: "Dayar-E-Habib Platform",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        // Clear all form inputs
        setName("");
        setPhone("");
        setEmail("");
        setMessage(`Hello, I am interested in booking or receiving details for the ${packageTitle}. Please contact me.`);
      } else {
        setError(result.message || "Failed to submit request. Please try again.");
      }
    } catch {
      setError("Unable to submit. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-border bg-card p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.015)]">
      <div className="space-y-2">
        <h4 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Inquire About This Journey
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Fill out the secure form below. Our dedicated pilgrimage directors will contact you within 24 hours.
        </p>
      </div>

      <div className="border-t border-border/80 my-4" />

      {submitted ? (
        <div className="p-6 bg-secondary/35 rounded-md border border-accent/20 text-center space-y-3">
          <p className="text-sm font-semibold text-foreground">
            Thank you, your enquiry has been sent.
          </p>
          <p className="text-xs text-muted-foreground">
            A representative will speak with you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="enquiry-name" className="text-xs font-semibold text-foreground/80 uppercase">
              Full Name
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-md border border-border bg-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 disabled:opacity-50"
              placeholder="e.g. Shafin Mahida"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="enquiry-phone" className="text-xs font-semibold text-foreground/80 uppercase">
                Phone Number
              </label>
              <input
                id="enquiry-phone"
                type="tel"
                required
                disabled={loading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 disabled:opacity-50"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="enquiry-email" className="text-xs font-semibold text-foreground/80 uppercase">
                Email Address (Optional)
              </label>
              <input
                id="enquiry-email"
                type="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-md border border-border bg-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 disabled:opacity-50"
                placeholder="name@email.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="enquiry-message" className="text-xs font-semibold text-foreground/80 uppercase">
              Your Message
            </label>
            <textarea
              id="enquiry-message"
              rows={3}
              disabled={loading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 text-sm rounded-md border border-border bg-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 resize-none disabled:opacity-50"
            />
          </div>

          <Button 
            type="submit" 
            variant="default" 
            size="default" 
            disabled={loading}
            className="w-full h-11 justify-center font-semibold tracking-wide gap-2 disabled:opacity-55"
          >
            {loading ? (
              <span className="inline-block size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            <span>{loading ? "Sending..." : "Submit Secure Request"}</span>
          </Button>
        </form>
      )}

      <div className="border-t border-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground text-center sm:text-left leading-relaxed">
          Or speak directly to an advisor:
        </div>
        <a
          href={`tel:${CONTACT_DATA.primaryPhone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
        >
          <Phone className="size-4" />
          <span>{CONTACT_DATA.primaryPhone}</span>
        </a>
      </div>
    </div>
  );
}
