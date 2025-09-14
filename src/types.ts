// Lista på några vanliga tidszoner (string literal type)
export type KändTidszon =
  | "America/New_York"
  | "America/Los_Angeles"
  | "Europe/London"
  | "Europe/Paris"
  | "Europe/Berlin"
  | "Europe/Moscow"
  | "Asia/Dubai"
  | "Asia/Kolkata"
  | "Asia/Shanghai"
  | "Asia/Tokyo"
  | "Asia/Singapore"
  | "Australia/Sydney"
  | "Pacific/Auckland"
  | "Pacific/Honolulu"
  | "America/Sao_Paulo"
  | "Africa/Cairo"
  | "Africa/Johannesburg"
  | "America/Chicago"
  | "America/Toronto"
  | "Asia/Bangkok";

// En stad som användaren kan lägga till
export interface City {
  name: string;        // Namn på staden
  timezone: string;    // Stadens tidszon
  country?: string;    // Land (frivilligt fält)
}

// Inställningar för klockan
export interface ClockSettings {
  displayMode: "digital" 
}
