
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

export type GlassTheme = keyof typeof glassThemes;
