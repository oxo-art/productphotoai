
export const gradientThemes = {
  cosmic: {
    name: "Cosmic",
    background: "from-slate-900 via-purple-900 to-slate-900",
    hero: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    card: "from-white/10 to-white/5",
    button: "from-blue-500 to-purple-600",
    buttonHover: "from-blue-600 to-purple-700",
    accent: "from-blue-400 via-purple-400 to-pink-400",
    glow: "from-blue-500/20 to-purple-500/20",
    decorative: [
      "from-blue-500/20 to-transparent",
      "from-purple-500/20 to-transparent"
    ]
  },
  sunset: {
    name: "Sunset",
    background: "from-orange-900 via-red-900 to-pink-900",
    hero: "from-orange-500/10 via-red-500/10 to-pink-500/10",
    card: "from-white/10 to-white/5",
    button: "from-orange-500 to-red-600",
    buttonHover: "from-orange-600 to-red-700",
    accent: "from-orange-400 via-red-400 to-pink-400",
    glow: "from-orange-500/20 to-red-500/20",
    decorative: [
      "from-orange-500/20 to-transparent",
      "from-red-500/20 to-transparent"
    ]
  },
  ocean: {
    name: "Ocean",
    background: "from-slate-900 via-blue-900 to-cyan-900",
    hero: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
    card: "from-white/10 to-white/5",
    button: "from-blue-500 to-cyan-600",
    buttonHover: "from-blue-600 to-cyan-700",
    accent: "from-blue-400 via-cyan-400 to-teal-400",
    glow: "from-blue-500/20 to-cyan-500/20",
    decorative: [
      "from-blue-500/20 to-transparent",
      "from-cyan-500/20 to-transparent"
    ]
  },
  forest: {
    name: "Forest",
    background: "from-slate-900 via-green-900 to-emerald-900",
    hero: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
    card: "from-white/10 to-white/5",
    button: "from-green-500 to-emerald-600",
    buttonHover: "from-green-600 to-emerald-700",
    accent: "from-green-400 via-emerald-400 to-teal-400",
    glow: "from-green-500/20 to-emerald-500/20",
    decorative: [
      "from-green-500/20 to-transparent",
      "from-emerald-500/20 to-transparent"
    ]
  },
  neon: {
    name: "Neon",
    background: "from-black via-purple-950 to-black",
    hero: "from-pink-500/10 via-purple-500/10 to-cyan-500/10",
    card: "from-white/10 to-white/5",
    button: "from-pink-500 to-cyan-500",
    buttonHover: "from-pink-600 to-cyan-600",
    accent: "from-pink-400 via-purple-400 to-cyan-400",
    glow: "from-pink-500/20 to-cyan-500/20",
    decorative: [
      "from-pink-500/20 to-transparent",
      "from-cyan-500/20 to-transparent"
    ]
  },
  royal: {
    name: "Royal",
    background: "from-indigo-900 via-purple-900 to-violet-900",
    hero: "from-indigo-500/10 via-purple-500/10 to-violet-500/10",
    card: "from-white/10 to-white/5",
    button: "from-indigo-500 to-violet-600",
    buttonHover: "from-indigo-600 to-violet-700",
    accent: "from-indigo-400 via-purple-400 to-violet-400",
    glow: "from-indigo-500/20 to-violet-500/20",
    decorative: [
      "from-indigo-500/20 to-transparent",
      "from-violet-500/20 to-transparent"
    ]
  }
} as const;

export type GradientTheme = keyof typeof gradientThemes;
