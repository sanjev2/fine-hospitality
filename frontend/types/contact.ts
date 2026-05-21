// src/types/contact.ts

export type ContactFormData = {
  name: string;
  phone: string;
  email?: string;
  course: "Barista Course" | "Bartending Course" | "Other";
  message: string;
};