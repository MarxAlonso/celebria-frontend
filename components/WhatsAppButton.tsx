"use client";

import React from "react";

type WhatsAppButtonProps = {
  phone?: string;
  message?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

function normalizePhone(input?: string) {
  if (!input) return "";
  const digits = (input || "").replace(/[^0-9]/g, "");
  return digits;
}

export function WhatsAppButton({ phone, message, label, className, style }: WhatsAppButtonProps) {
  const num = normalizePhone(phone);
  const text = encodeURIComponent(message || "");
  const href = num ? `https://wa.me/${num}?text=${text}` : undefined;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "inline-flex items-center justify-center rounded px-4 py-2 text-white"}
      style={{ backgroundColor: "#25D366", ...style }}
    >
      {label || "Agendar asistencia"}
    </a>
  );
}

export default WhatsAppButton;