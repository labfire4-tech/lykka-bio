export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  backgroundType: "color" | "image" | "video" | "gradient";
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  textColor?: string;
  accentColor?: string;
  fontFamily?: string;
  animation?: "none" | "fade" | "slide" | "typewriter";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export interface ProfileConfig {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  theme: ThemeConfig;
  socialLinks: SocialLink[];
  music?: {
    url: string;
    title?: string;
    artist?: string;
  };
  backgroundEffect?: "none" | "particles" | "waves" | "matrix";
}

// Default themes
export const THEMES: ThemeConfig[] = [
  {
    id: "minimal",
    name: "Minimal",
    backgroundType: "color",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    fontFamily: "Inter",
    animation: "fade",
    rounded: "full"
  },
  {
    id: "neon",
    name: "Neon",
    backgroundType: "color",
    backgroundColor: "#0a0a0a",
    textColor: "#ffffff",
    accentColor: "#00ffff",
    fontFamily: "JetBrains",
    animation: "typewriter",
    rounded: "md"
  },
  {
    id: "glass",
    name: "Glass",
    backgroundType: "gradient",
    backgroundColor: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    fontFamily: "Inter",
    animation: "slide",
    rounded: "lg"
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    backgroundType: "color",
    backgroundColor: "#000000",
    textColor: "#e0e6ed",
    accentColor: "#ffffff",
    fontFamily: "Inter",
    animation: "fade",
    rounded: "sm"
  }
];

// Available social platforms
export const SOCIAL_PLATFORMS = [
  { name: "Twitter", icon: "fa-twitter", color: "#1da1f2" },
  { name: "Instagram", icon: "fa-instagram", color: "#e4405f" },
  { name: "YouTube", icon: "fa-youtube", color: "#ff0000" },
  { name: "Twitch", icon: "fa-twitch", color: "#6441a5" },
  { name: "Discord", icon: "fa-discord", color: "#5865f2" },
  { name: "GitHub", icon: "fa-github", color: "#ffffff" },
  { name: "TikTok", icon: "fa-tiktok", color: "#ffffff" },
  { name: "LinkedIn", icon: "fa-linkedin", color: "#0077b5" },
  { name: "Spotify", icon: "fa-spotify", color: "#1db954" },
  { name: "Steam", icon: "fa-steam", color: "#171a21" },
  { name: "Roblox", icon: "fa-roblox", color: "#ffffff" },
  { name: "Website", icon: "fa-globe", color: "#ffffff" },
];