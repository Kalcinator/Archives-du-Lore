/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Skull, ExternalLink, BookOpen } from "lucide-react";
import MatrixRain from "./MatrixRain";
import NoosPulse from "./NoosPulse";
import ImperialDate from "./ImperialDate";

interface Channel {
  name: string;
  url: string;
  description: string;
  status: "active" | "pause" | "dead";
  tags: Tag[];
}

type Tag =
  | "lore"
  | "podcast"
  | "livre-audio"
  | "livre-audio-original"
  | "musique"
  | "figurines"
  | "news"
  | "jeux-video";

const CHANNELS: Channel[] = [
  {
    name: "30K Lore",
    url: "https://www.youtube.com/@30KLore",
    description: "Présentation du Lore de l'Hérésie d'Horus.",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Alphanime TV",
    url: "https://www.youtube.com/@alphanimetv",
    description:
      "Romans audios originaux et de fan fictions. Vous y trouverez également quelques parodies et d'autres trucs.",
    status: "active",
    tags: ["livre-audio-original"],
  },
  {
    name: "Auguste Val",
    url: "https://www.youtube.com/@augusteval",
    description:
      "Vidéos de fluff sur l'univers de Warhammer 40 000 tous les semaines",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Ben le dingue",
    url: "https://www.youtube.com/@Ben_le_dingue",
    description:
      "Pignouf random n°343, nous arrivons en gare, attention sur votre gauche vous trouverez des vidéo JV. La marche à la sortie du train est plus humoristique que narrativo-dépressive",
    status: "active",
    tags: ["lore", "jeux-video"],
  },
  {
    name: "Bibliothèque Imperialis",
    url: "https://www.youtube.com/@Biblioth%C3%A8queImperialis",
    description:
      "Récits épiques et immersifs. Batailles légendaires, histoires inédites, personnages oubliés de l'Histoire",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "BoneSinger",
    url: "https://www.youtube.com/@BoneSinger",
    description: "Immersion visio/auditive, grimdark ou parodique",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "BrushClub",
    url: "https://www.youtube.com/@brushclubfr",
    description: "Du lore, des news, des figurines, du fluff, du jeu, du fun",
    status: "active",
    tags: ["figurines", "lore", "news"],
  },
  {
    name: "Collegia Historium",
    url: "https://www.youtube.com/@CollegiaHistorium",
    description: "Toute l'histoire de Warhammer et plus encore ! ",
    status: "active",
    tags: ["lore", "news", "jeux-video"],
  },
  {
    name: "Commémorateurs 40K",
    url: "https://www.youtube.com/@Commemorateurs40K",
    description:
      " Zenk et Ash, commémorateurs impériaux, chargés de préserver la mémoire des événements marquants et tragiques qui ont façonné la galaxie. À travers récits et archives, nous retraçons des rencontres titanesques, des sacrifices héroïques et des sombres trahisons qui ont défini les dix derniers millénaires. ",
    status: "pause",
    tags: ["lore"],
  },
  {
    name: "Croc et Lame",
    url: "https://www.youtube.com/@crocetlame2159",
    description: "Lore et histoires, très sympa",
    status: "pause",
    tags: ["lore", "podcast", "figurines"],
  },
  {
    name: "D&A",
    url: "https://www.youtube.com/@PapaDjoe",
    description:
      "Narration sur divers Lore : Warhammer 40k, Warhammer Battle, Age of Sigmar, Necromunda, AOS",
    status: "pause",
    tags: ["lore"],
  },
  {
    name: "Frewind",
    url: "https://www.youtube.com/@frewind8260",
    description: "Lore narratif 40k, Age of Sigmar et Old World.",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Gautres",
    url: "https://www.youtube.com/@FreezEToxiik",
    description:
      "Narration sur divers lore, rediffusion lives, absent depuis + de deux ans",
    status: "dead",
    tags: ["lore"],
  },
  {
    name: "Grim Imperium 40k",
    url: "https://www.youtube.com/@grimimperium40k",
    description: "Livre audio chapitrés, beaucoup de livres",
    status: "active",
    tags: ["livre-audio"],
  },
  {
    name: "Indomitus 40k",
    url: "https://www.youtube.com/@indomitus_40k",
    description:
      "chaîne destinée à faire découvrir le Lore de Warhammer 40k, lore narratif",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "L'Archiviste",
    url: "https://www.youtube.com/@larchivistedesmondes",
    description:
      "Récits épiques et immersifs, où l'histoire et la fiction se rencontrent. De l'univers impitoyable de Warhammer 40K aux intrigues secrètes des grandes époques historiques. En pause IRL",
    status: "pause",
    tags: ["lore"],
  },
  {
    name: "L'apprenti Trouvère",
    url: "https://www.youtube.com/@ApprentiTrouvere-40k",
    description:
      "Apprenti conteur et écrivain en autodidacte, livres audio par chapitre",
    status: "pause",
    tags: ["livre-audio", "livre-audio-original"],
  },
  {
    name: "La grotte ou il pleut",
    url: "https://www.youtube.com/@tomwolf92",
    description:
      "Chaque vidéo est pensée comme une pause : un moment pour s’évader, vibrer, frissonner ou simplement s’asseoir et ressentir. Que tu sois fan du Grimdark, joueur passionné ou amateur d’histoires, cette chaîne est ton refuge.",
    status: "pause",
    tags: ["lore"],
  },
  {
    name: "Land Rider - Un Podcast Warhammer",
    url: "https://www.youtube.com/@LandRiderPod",
    description:
      "Le podcast qui vous parle avec amour des univers où il n'y a que la guerre : ceux de Warhammer (et Trench Crusade) ! Lore, figurines, jeu, et l'interaction entre les trois.",
    status: "active",
    tags: ["podcast", "lore", "figurines"],
  },
  {
    name: "Le Librarium",
    url: "https://www.youtube.com/@LeLibrarium",
    description:
      "Lore narratif. Laissez vous entrainer par ses vidéos traitant principalement du Lore & des différents contenus de cette incroyable licence",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Le Primarch Roux",
    url: "https://www.youtube.com/@leprimarchroux",
    description:
      "Loriste 40k, créatif grimdark avec trop d'idées et pas assez de temps.",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Le divan du Cryptek",
    url: "https://www.youtube.com/@divancryptek",
    description:
      "Lore narratif et analyse des personnages et des factions sous le prisme de la psychologie, review des romans.",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "LectioMagna",
    url: "https://www.youtube.com/@LectioMagna",
    description: "Livre audio chapitré sur la naissance de l'Impérium",
    status: "active",
    tags: ["livre-audio"],
  },
  {
    name: "Legio Relica",
    url: "https://www.youtube.com/@LegioRelica",
    description:
      "Warhammer 30,000 et 40,000. Lore comme jeu de plateau dans des formats de 10 à 15 minutes.",
    status: "pause",
    tags: ["lore", "figurines"],
  },
  {
    name: "Legio Symphonica",
    url: "https://www.youtube.com/@LegioSymphonica",
    description: "Excellent projet musical Grim Dark !",
    status: "active",
    tags: ["musique"],
  },
  {
    name: "Les contes d'Enki",
    url: "https://www.youtube.com/@lescontesdenki",
    description: "Livres audio originaux chapitrés, absolument génial 🐦‍🔥 !",
    status: "active",
    tags: ["livre-audio-original"],
  },
  {
    name: "Maître des Archives",
    url: "https://www.youtube.com/@maitredesarchives6919",
    description: "Lore narratif",
    status: "pause",
    tags: ["lore"],
  },
  {
    name: "Mortis Pariah",
    url: "https://www.youtube.com/@MortisPariah",
    description: "Lore narratif Trench crusade en historiquement 40k",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Nimp 30k",
    url: "https://www.youtube.com/@Nimp30k",
    description:
      "Hérésie d'Horus à travers du Lore ou des Rapports de bataille.",
    status: "active",
    tags: ["lore", "figurines"],
  },
  {
    name: "Nodeneyke",
    url: "https://www.youtube.com/@nodeneyke9489",
    description: "Podcast et lore narratif Trench crusade et 40k",
    status: "pause",
    tags: ["lore", "figurines", "podcast", "news"],
  },
  {
    name: "Nono le nurgling",
    url: "https://www.youtube.com/@Nonolenurgling",
    description:
      "Un nurgling échappé du Warp, lore et news 40k. Possibilité de contamination humoristique via vidéo ⚠️🤢",
    status: "active",
    tags: ["lore", "news"],
  },
  {
    name: "Oxawa",
    url: "https://www.youtube.com/@oxawa",
    description:
      "Lore, narration et immersion; format historique exhaustif, de l'âge d'or de l'humanité à l'âge sombre de l'Imperium",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "PICKEMILE",
    url: "https://www.youtube.com/@Picklemile",
    description: "Le King du Game, narration musclée",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "RURAL HAMMER",
    url: "https://www.youtube.com/@RURALHAMMER",
    description:
      "La chaîne du Wargame à l'ancienne et du Warhammer bien de chez nous",
    status: "active",
    tags: ["lore", "figurines", "podcast", "news"],
  },
  {
    name: "Sanko_Lore",
    url: "https://www.youtube.com/@Sanko_Lore",
    description:
      "Un fan de Lore qui partage sa passion. Plusieurs séries originales",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Stenkova",
    url: "https://www.youtube.com/@StenKovaHistoritor",
    description:
      "Parle de l'univers 40k avec le maximum de détails possibles avec des sources fiables.",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Storyhammer",
    url: "https://www.youtube.com/@storyhammer679",
    description: "Chaîne en pause depuis au moins 4 ans",
    status: "pause",
    tags: ["lore"],
  },
  {
    name: "Tabularia Vetita (Lore 40k)",
    url: "https://www.youtube.com/@TabulariaVetita",
    description:
      "Lore narratif, réinterprète et transforme l'univers par une narration original, une analyse critique et une exploration éducative",
    status: "active",
    tags: ["lore"],
  },
  {
    name: "Tiberias Total War 40k",
    url: "https://www.youtube.com/@TiberiasTotalWar40k",
    description:
      "Actualité du jeux vidéo Total War Warhammer 40000, du lore 40k et lorsque viendra l’heure, déploiement de campagnes dédiées !",
    status: "active",
    tags: ["lore", "news", "jeux-video"],
  },
  {
    name: "Vox Narratoris",
    url: "https://www.youtube.com/@VoxNarratoris",
    description:
      "Narration immersive originale, chapitré. Créé par un ingénieur du son et compositeur passionné.",
    status: "active",
    tags: ["livre-audio-original"],
  },
  {
    name: "Wargame Lore HiigyTV",
    url: "https://www.youtube.com/@WargameLoreHiigyTV",
    description: "Podcast lore et news 40k",
    status: "active",
    tags: ["lore", "figurines", "podcast", "news"],
  },
  {
    name: "la fraise de 40k",
    url: "https://www.youtube.com/@lafraisede40k99",
    description:
      "Ancienne chaîne de lore 40k mais aussi d'autres choses totalement random. Chaîne décalée",
    status: "active",
    tags: ["lore"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const statusFR: Record<string, string> = {
    active: "actif",
    pause: "pause",
    dead: "inactif",
  };

  const filteredChannels = CHANNELS.filter((channel) => {
    const q = searchQuery.toLowerCase();
    return (
      channel.name.toLowerCase().includes(q) ||
      channel.description.toLowerCase().includes(q) ||
      statusFR[channel.status].includes(q) ||
      channel.tags.some((tag) => tag.replace(/-/g, " ").includes(q))
    );
  });

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
              Ce document est un répertoire des créateurs de contenu
              francophones dédiés à l'univers de Warhammer 40,000 (et 30k).{" "}
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
            placeholder="Rechercher"
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
            filteredChannels.map((channel, index) => {
              const statusConfig = {
                active: { color: "bg-green-500", label: "Actif" },
                pause: { color: "bg-yellow-500", label: "En pause" },
                dead: { color: "bg-neutral-600", label: "Inactif" },
              };
              const s = statusConfig[channel.status];
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`grim-card p-6 flex flex-col h-full group relative overflow-hidden ${channel.status === "dead" ? "opacity-50" : ""}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="w-24 h-24 text-brass transform rotate-12" />
                  </div>
                  <div className="relative z-10 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="font-display text-xl font-bold text-brass group-hover:text-blood-red transition-colors">
                        {channel.name}
                      </h2>
                      <ExternalLink className="w-5 h-5 text-parchment-muted group-hover:text-blood-red transition-colors flex-shrink-0 ml-2" />
                    </div>
                    {channel.description && (
                      <p className="text-sm text-parchment-muted leading-relaxed mt-2 font-sans italic">
                        {channel.description}
                      </p>
                    )}
                    {channel.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {channel.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs uppercase tracking-wider px-2 py-0.5 border border-grim-border text-parchment-muted/60 font-sans"
                          >
                            {tag.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 mt-4 pt-3 border-t border-grim-border/50 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${s.color}`}></span>
                    <span className="text-xs uppercase tracking-widest text-parchment-muted/50 font-sans">
                      {s.label}
                    </span>
                  </div>
                </motion.a>
              );
            })
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
          <p className="text-xl uppercase tracking-widest text-parchment-muted/40 font-sans mt-6">
            • L'Empereur Protège •<br />
            <ImperialDate />
          </p>
        </footer>
      </main>
    </div>
  );
}
