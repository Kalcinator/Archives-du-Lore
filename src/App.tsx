/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Skull } from "lucide-react";
import MatrixRain from "./MatrixRain";
import NoosPulse from "./NoosPulse";
import ImperialDate from "./ImperialDate";
import ChannelCard from "./components/ChannelCard";
import { CHANNELS } from "./data/channels.data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const statusFR: Record<string, string> = {
    active: "actif",
    pause: "pause",
    dead: "inactif",
  };

  const filteredChannels = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return CHANNELS;

    return CHANNELS.filter((channel) => {
      return (
        channel.name.toLowerCase().includes(q) ||
        channel.description.toLowerCase().includes(q) ||
        statusFR[channel.status].includes(q) ||
        channel.tags.some((tag) => tag.replace(/-/g, " ").includes(q))
      );
    });
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-blood-red selection:text-white">
      <MatrixRain />
      <NoosPulse />
      <div className="scanlines"></div>
      <div className="vignette"></div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <header className="mb-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-4"
          >
            <Skull
              className="w-16 h-16 text-brass text-glow"
              strokeWidth={1.5}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-4 text-parchment text-glow"
          >
            Archives du{" "}
            <span className="text-blood-red text-glow-red">Lore</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-parchment-muted text-lg md:text-xl leading-relaxed border-y border-grim-border py-4">
              Répertoire des créateurs de contenu francophones dédiés à l'univers de Warhammer 40,000 (et 30k et un peu de TC).{" "}
              <br />
              Une ressource pour tout explorateur du lore.
            </p>
          </motion.div>
        </header>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4 relative max-w-md mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-parchment-muted" />
          </div>
          <input
            type="text"
            placeholder="Filtrez par nom, tag, ou statut"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-grim-dark/80 border border-grim-border text-parchment rounded-none py-3 pl-12 pr-4 focus:outline-none focus:border-blood-red focus:ring-1 focus:ring-blood-red transition-colors placeholder:text-parchment-muted/50 font-sans"
          />
        </motion.div>

        {/* Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel, index) => (
              <ChannelCard key={index} channel={channel} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 border border-grim-border bg-grim-dark/50">
              <p className="text-parchment-muted font-display text-lg">
                Aucune archive trouvée pour cette requête.
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <footer className="mt-6 text-center border-t border-grim-border pt-8 pb-12">
          <p className="text-m text-parchment-muted/40 font-sans">
            Vous connaissez une chaîne qui manque ? Vous pouvez{" "}
            <a
              href="https://github.com/Kalcinator/Archives-du-Lore/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brass transition-colors"
            >
              m'en informer sur GitHub
            </a>{" "}
            ou{" "}
            <a
              href="https://discord.com/users/380084649868918784"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brass transition-colors"
            >
              m'envoyer un message via Discord
            </a>
          </p>
          <div className="text-lg uppercase tracking-widest text-parchment-muted/40 font-sans mt-8 flex flex-col items-center justify-center min-h-[4rem]">
            <span>• L'Empereur Protège •</span>
            <ImperialDate />
          </div>
        </footer>
      </main>
    </div>
  );
}
