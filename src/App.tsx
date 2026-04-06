/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Skull, ExternalLink, ShieldAlert, BookOpen } from 'lucide-react';

interface Channel {
  name: string;
  url: string;
  description: string;
}

const CHANNELS: Channel[] = [
  { name: "30K Lore", url: "https://www.youtube.com/@30KLore", description: "nouvelle chaine et franchement bien" },
  { name: "Alphanime TV", url: "https://www.youtube.com/@alphanimetv", description: "" },
  { name: "Auguste Val", url: "https://www.youtube.com/@augusteval", description: "" },
  { name: "Ben le dingue", url: "https://www.youtube.com/@Ben_le_dingue", description: "lore 40k mais parodique/marrante" },
  { name: "Bibliothèque Imperialis", url: "https://www.youtube.com/@BibliothèqueImperialis", description: "nouvelle chaine super" },
  { name: "BoneSinger", url: "https://www.youtube.com/@BoneSinger", description: "" },
  { name: "BrushClub", url: "https://www.youtube.com/@brushclubfr", description: "" },
  { name: "Collegia Historium", url: "https://www.youtube.com/@CollegiaHistorium", description: "pas que du 40k" },
  { name: "Commémorateurs 40K", url: "https://www.youtube.com/@Commemorateurs40K", description: "super chaine absents depuis 9+ mois" },
  { name: "Croc et Lame", url: "https://www.youtube.com/@crocetlame2159", description: "" },
  { name: "D&A", url: "https://www.youtube.com/@PapaDjoe", description: "" },
  { name: "Gautres", url: "https://www.youtube.com/@FreezEToxiik", description: "chaîne morte depuis au moins 2 ans" },
  { name: "Grim Imperium 40k", url: "https://www.youtube.com/@grimimperium40k", description: "livre audio par chapitre" },
  { name: "Indomitus 40k", url: "https://www.youtube.com/@indomitus_40k", description: "" },
  { name: "L'Archiviste", url: "https://www.youtube.com/@larchivistedesmondes", description: "en pause dû à IRL, mais très bonne qualité" },
  { name: "L'apprenti Trouvère", url: "https://www.youtube.com/@ApprentiTrouvere-40k", description: "livre audio par chapitre" },
  { name: "La grotte ou il pleut", url: "https://www.youtube.com/@tomwolf92", description: "top qualité, en pause depuis 2+ mois apparemment" },
  { name: "Land Rider - Un Podcast Warhammer", url: "https://www.youtube.com/@LandRiderPod", description: "" },
  { name: "Le Librarium", url: "https://www.youtube.com/@LeLibrarium", description: "" },
  { name: "Le Primarch Roux", "url": "https://www.youtube.com/@leprimarchroux", description: "" },
  { name: "Le divan du Cryptek", "url": "https://www.youtube.com/@divancryptek", description: "chaine au top du top, mix psychologie et 40k lore pour livrer un contenu fantastique" },
  { name: "LectioMagna", "url": "https://www.youtube.com/@LectioMagna", description: "" },
  { name: "Legio Relica", "url": "https://www.youtube.com/@LegioRelica", description: "chaîne morte depuis un an environ" },
  { name: "Legio Symphonica", "url": "https://www.youtube.com/@LegioSymphonica", description: "musique thème 40k, très connu et musiques excellentes, il est passé aux portes de la mort récemment si j'ai bien compris et est revenu y'a 2 semaines !" },
  { name: "Les contes d'Enki", "url": "https://www.youtube.com/@lescontesdenki", description: "que du contenu original, écris un livre original absolument et totalement génial cette chaine est dans le top du top de ce qui se fait" },
  { name: "Maître des Archives", "url": "https://www.youtube.com/@maitredesarchives6919", description: "chaîne morte depuis au moins 2 ans" },
  { name: "Mortis Pariah", "url": "https://www.youtube.com/@MortisPariah", description: "trench crusade en ce moment mais 40k aussi" },
  { name: "Nimp 30k", "url": "https://www.youtube.com/@Nimp30k", description: "" },
  { name: "Nodeneyke", "url": "https://www.youtube.com/@nodeneyke9489", description: "il fait un peu de tout et est passé sur trench crusade mais ça vaut le coup" },
  { name: "Nono le nurgling", "url": "https://www.youtube.com/@Nonolenurgling", description: "" },
  { name: "Oxawa", "url": "https://www.youtube.com/@oxawa", description: "" },
  { name: "PICKEMILE", "url": "https://www.youtube.com/@Picklemile", description: "" },
  { name: "RURAL HAMMER", "url": "https://www.youtube.com/@RURALHAMMER", description: "il faisait du lore régulièrement mais maintenant il a peu dévié vers les figurines, mais ses vidéos de lore sont toujours bonnes à écouter, et sa série l'or du lore est excellente et marrante, joyeux personnage et bon type ça se sent" },
  { name: "Sanko_Lore", "url": "https://www.youtube.com/@Sanko_Lore", description: "super lore" },
  { name: "Stenkova", "url": "https://www.youtube.com/@StenKovaHistoritor", description: "" },
  { name: "Storyhammer", "url": "https://www.youtube.com/@storyhammer679", description: "chaîne morte depuis au moins 4 ans" },
  { name: "Tabularia Vetita (Lore 40k)", "url": "https://www.youtube.com/@TabulariaVetita", description: "super chaine" },
  { name: "Tiberias Total War 40k", "url": "https://www.youtube.com/@TiberiasTotalWar40k", description: "ne fait pas que du lore, mais aussi de la news 40k" },
  { name: "Vox Narratoris", "url": "https://www.youtube.com/@VoxNarratoris", description: "très bonne chaine !!" },
  { name: "Wargame Lore HiigyTV", "url": "https://www.youtube.com/@WargameLoreHiigyTV", description: "" },
  { name: "la fraise de 40k", "url": "https://www.youtube.com/@lafraisede40k99", description: "" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChannels = CHANNELS.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-blood-red selection:text-white">
      <div className="scanlines"></div>
      <div className="vignette"></div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        
        {/* Header Section */}
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <Skull className="w-16 h-16 text-brass text-glow" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-6 text-parchment text-glow"
          >
            Archives du <span className="text-blood-red text-glow-red">Lore</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-parchment-muted text-lg md:text-xl leading-relaxed border-y border-grim-border py-4">
              Ce document est un répertoire des créateurs de contenu francophones dédiés à l'univers de Warhammer 40,000 (et 30k). Une ressource pour tout explorateur du lore.
            </p>
          </motion.div>
        </header>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 relative max-w-md mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-parchment-muted" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un archiviste..."
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
              const isDead = channel.description.toLowerCase().includes('morte') || channel.description.toLowerCase().includes('absent');
              
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grim-card p-6 flex flex-col h-full group relative overflow-hidden"
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
                      <p className="text-sm text-parchment-muted leading-relaxed mt-2 font-sans">
                        {isDead && <ShieldAlert className="inline w-4 h-4 mr-1 text-blood-red" />}
                        <span className={isDead ? "text-blood-red/80 italic" : "italic"}>
                          {channel.description}
                        </span>
                      </p>
                    )}
                  </div>
                  
                  <div className="relative z-10 mt-6 pt-4 border-t border-grim-border/50">
                    <span className="text-xs uppercase tracking-widest text-parchment-muted/50 group-hover:text-brass/70 transition-colors">
                      Accéder aux archives
                    </span>
                  </div>
                </motion.a>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 border border-grim-border bg-grim-dark/50">
              <p className="text-parchment-muted font-display text-lg">Aucune archive trouvée pour cette requête.</p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <footer className="mt-24 text-center border-t border-grim-border pt-8 pb-12">
          <p className="text-xs uppercase tracking-widest text-parchment-muted/40 font-sans">
            L'Empereur Protège • {new Date().getFullYear()}
          </p>
        </footer>

      </main>
    </div>
  );
}
