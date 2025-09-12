// Known time zone identifiers (string literal union type)
export type KnownTimeZone = 
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
// We included ~20 common timezones for major cities.
export interface City {
  name: string;
  timezone: string;   
  country?: string;    // optional, maybe include country or region if desired
}
export interface ClockSettings {
  displayMode: "digital" | "analog";  // using a string literal type for mode
  // (We could add more settings like 12h/24h format, theme color, etc.)
}
