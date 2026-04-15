import { motion } from "motion/react";
import { ExternalLink, BookOpen } from "lucide-react";
import { Channel } from "../types/models";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const statusConfig = {
    active: { color: "bg-green-500", label: "Actif" },
    pause: { color: "bg-yellow-500", label: "En pause" },
    dead: { color: "bg-neutral-600", label: "Inactif" },
  };
  const s = statusConfig[channel.status];

  return (
    <motion.a
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        borderColor: "var(--color-blood-red)",
        boxShadow: "0 8px 30px rgba(138, 3, 3, 0.2), inset 0 0 0 1px rgba(138, 3, 3, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`grim-card p-6 flex flex-col h-full group relative overflow-hidden ${
        channel.status === "dead" ? "opacity-50" : ""
      }`}
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
}
