
export const glassThemes = {
  default: {
    name: "Glass Default",
    background: "from-slate-900/95 via-blue-900/90 to-purple-900/95",
    card: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "bg-white/15 backdrop-blur-xl border-white/30",
    button: "bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30",
    buttonPrimary: "bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-md border-white/20 hover:from-blue-600/90 hover:to-purple-700/90",
    input: "bg-white/10 backdrop-blur-md border-white/20 focus:border-white/40 focus:bg-white/15",
    navbar: "bg-white/10 backdrop-blur-xl border-white/10",
    popover: "bg-white/10 backdrop-blur-xl border-white/20",
    shadow: "shadow-2xl shadow-black/20",
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60"
    }
  },
  ocean: {
    name: "Glass Ocean",
    background: "from-blue-900/95 via-cyan-900/90 to-teal-900/95",
    card: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "bg-white/15 backdrop-blur-xl border-white/30",
    button: "bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30",
    buttonPrimary: "bg-gradient-to-r from-blue-500/80 to-cyan-600/80 backdrop-blur-md border-white/20 hover:from-blue-600/90 hover:to-cyan-700/90",
    input: "bg-white/10 backdrop-blur-md border-white/20 focus:border-white/40 focus:bg-white/15",
    navbar: "bg-white/10 backdrop-blur-xl border-white/10",
    popover: "bg-white/10 backdrop-blur-xl border-white/20",
    shadow: "shadow-2xl shadow-cyan-500/10",
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60"
    }
  },
  sunset: {
    name: "Glass Sunset",
    background: "from-orange-900/95 via-red-900/90 to-pink-900/95",
    card: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "bg-white/15 backdrop-blur-xl border-white/30",
    button: "bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30",
    buttonPrimary: "bg-gradient-to-r from-orange-500/80 to-red-600/80 backdrop-blur-md border-white/20 hover:from-orange-600/90 hover:to-red-700/90",
    input: "bg-white/10 backdrop-blur-md border-white/20 focus:border-white/40 focus:bg-white/15",
    navbar: "bg-white/10 backdrop-blur-xl border-white/10",
    popover: "bg-white/10 backdrop-blur-xl border-white/20",
    shadow: "shadow-2xl shadow-orange-500/10",
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60"
    }
  },
  forest: {
    name: "Glass Forest",
    background: "from-green-900/95 via-emerald-900/90 to-teal-900/95",
    card: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "bg-white/15 backdrop-blur-xl border-white/30",
    button: "bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30",
    buttonPrimary: "bg-gradient-to-r from-green-500/80 to-emerald-600/80 backdrop-blur-md border-white/20 hover:from-green-600/90 hover:to-emerald-700/90",
    input: "bg-white/10 backdrop-blur-md border-white/20 focus:border-white/40 focus:bg-white/15",
    navbar: "bg-white/10 backdrop-blur-xl border-white/10",
    popover: "bg-white/10 backdrop-blur-xl border-white/20",
    shadow: "shadow-2xl shadow-green-500/10",
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60"
    }
  }
} as const;

// Replace with Artistic Movement Themes
export const artisticThemes = {
  artDeco: {
    name: "Art Deco",
    background: "from-slate-900 via-amber-900/20 to-slate-800",
    card: "bg-gradient-to-br from-amber-900/30 to-slate-800/90 border-2 border-amber-500/40",
    cardHover: "bg-gradient-to-br from-amber-800/40 to-slate-700/90 border-amber-400/60",
    button: "bg-gradient-to-r from-amber-600 to-amber-700 border border-amber-400 hover:from-amber-500 hover:to-amber-600",
    buttonPrimary: "bg-gradient-to-r from-amber-500 to-yellow-600 border-2 border-amber-300 hover:from-amber-400 hover:to-yellow-500 shadow-lg shadow-amber-500/25",
    input: "bg-slate-800/80 border-2 border-amber-500/40 focus:border-amber-400 focus:bg-slate-700/80",
    navbar: "bg-gradient-to-r from-slate-900/95 to-amber-900/30 border-b-2 border-amber-500/30",
    popover: "bg-gradient-to-br from-slate-800/95 to-amber-900/40 border-2 border-amber-500/40",
    shadow: "shadow-2xl shadow-amber-500/20",
    pattern: "bg-[radial-gradient(circle_at_25%_25%,_#f59e0b_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_#d97706_0%,_transparent_50%)]",
    typography: "font-serif",
    text: {
      primary: "text-amber-100",
      secondary: "text-amber-200/80",
      muted: "text-amber-300/60",
      accent: "text-amber-400"
    }
  },
  bauhaus: {
    name: "Bauhaus",
    background: "from-white to-gray-100",
    card: "bg-white border-l-4 border-red-500 shadow-lg",
    cardHover: "bg-gray-50 border-l-4 border-blue-500 shadow-xl",
    button: "bg-gray-800 text-white hover:bg-gray-700 border-none",
    buttonPrimary: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/25",
    input: "bg-white border-2 border-gray-800 focus:border-blue-500 focus:bg-gray-50",
    navbar: "bg-white border-b-4 border-gray-800",
    popover: "bg-white border-2 border-gray-800 shadow-lg",
    shadow: "shadow-lg shadow-gray-800/20",
    pattern: "bg-[linear-gradient(90deg,_#ef4444_0%,_#3b82f6_50%,_#eab308_100%)]",
    typography: "font-sans",
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-700",
      muted: "text-gray-500",
      accent: "text-red-500"
    }
  },
  memphis: {
    name: "Memphis Design",
    background: "from-pink-400 via-purple-300 to-cyan-300",
    card: "bg-gradient-to-br from-yellow-300/90 via-pink-300/80 to-cyan-300/90 border-4 border-black transform rotate-1",
    cardHover: "bg-gradient-to-br from-cyan-300/90 via-yellow-300/80 to-pink-300/90 border-4 border-black transform -rotate-1 scale-105",
    button: "bg-gradient-to-r from-magenta-500 to-purple-600 border-4 border-black hover:from-purple-500 hover:to-cyan-500 transform hover:rotate-2",
    buttonPrimary: "bg-gradient-to-r from-yellow-400 to-pink-500 border-4 border-black hover:from-pink-400 hover:to-cyan-400 shadow-lg shadow-black/25 transform hover:scale-110",
    input: "bg-white/90 border-4 border-black focus:border-yellow-400 focus:bg-yellow-100/50 transform focus:rotate-1",
    navbar: "bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 border-b-4 border-black",
    popover: "bg-gradient-to-br from-yellow-300/95 to-pink-300/95 border-4 border-black transform rotate-2",
    shadow: "shadow-2xl shadow-black/30",
    pattern: "bg-[conic-gradient(from_45deg,_#ec4899,_#8b5cf6,_#06b6d4,_#f59e0b,_#ec4899)]",
    typography: "font-bold",
    text: {
      primary: "text-black",
      secondary: "text-gray-800",
      muted: "text-gray-600",
      accent: "text-purple-600"
    }
  },
  brutalist: {
    name: "Brutalist",
    background: "from-gray-800 via-gray-700 to-gray-900",
    card: "bg-gray-600 border-4 border-gray-800 shadow-2xl shadow-black/50",
    cardHover: "bg-gray-500 border-4 border-gray-700 shadow-2xl shadow-black/60",
    button: "bg-gray-800 text-white hover:bg-gray-700 border-2 border-gray-600 shadow-lg shadow-black/40",
    buttonPrimary: "bg-black text-white hover:bg-gray-900 border-2 border-gray-500 shadow-xl shadow-black/50",
    input: "bg-gray-700 border-4 border-gray-800 focus:border-gray-500 focus:bg-gray-600 text-white",
    navbar: "bg-gray-800 border-b-4 border-gray-600",
    popover: "bg-gray-700 border-4 border-gray-800 shadow-2xl shadow-black/50",
    shadow: "shadow-2xl shadow-black/60",
    pattern: "bg-[repeating-linear-gradient(45deg,_#374151_0px,_#374151_10px,_#4b5563_10px,_#4b5563_20px)]",
    typography: "font-black",
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
      muted: "text-gray-400",
      accent: "text-gray-100"
    }
  }
} as const;

export type GlassTheme = keyof typeof glassThemes;
export type ArtisticTheme = keyof typeof artisticThemes;
