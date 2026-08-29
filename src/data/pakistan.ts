export const provinces = [
  "Sindh",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

export const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Gujranwala",
  "Sialkot",
  "Sukkur",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Mardan",
  "Larkana",
  "Mirpur (AJK)",
  "Gilgit",
  "Skardu",
];

export const paymentMethods = [
  {
    value: "Cash on Delivery",
    hint: "Pay the courier in cash when your watch arrives.",
  },
  { value: "Easypaisa", hint: "Confirm on your Easypaisa app after placing the order." },
  { value: "JazzCash", hint: "Confirm on your JazzCash app after placing the order." },
  { value: "Bank Transfer", hint: "IBAN and reference are emailed with your confirmation." },
  { value: "Credit / Debit Card", hint: "Visa, Mastercard and UnionPay accepted." },
] as const;
