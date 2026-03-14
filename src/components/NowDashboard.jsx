import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const nowData = {
  role: 'SDE I @ Shaadi.com',
  side: 'AI Architect & Community @ Open Paws',
  building: 'AI Film Making',
  reading: 'Escaping the Build Trap',
  thought: "You can't deliver the future if you're not in the future.",
  location: 'Mumbai, India',
};

export default function NowDashboard() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: 'now', value: nowData.role },
    { label: 'also', value: nowData.side },
    { label: 'building', value: nowData.building },
    { label: 'reading', value: nowData.reading },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.6, duration: 0.9 }}
      className="hidden lg:block"
    >
      <div className="font-mono text-[10px] border-l border-surface-4/50 pl-4 max-w-[220px] space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500/80" />
          </span>
          <span className="dark:text-zinc-500 text-stone-400 tracking-wide">
            {nowData.location} · {time} IST
          </span>
        </div>

        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
          >
            <span className="text-[8px] uppercase tracking-[0.25em] text-accent/30 block mb-0.5">
              {item.label}
            </span>
            <p className="dark:text-zinc-400 text-stone-500 leading-relaxed">
              {item.value}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="pt-3 border-t border-surface-4/30"
        >
          <span className="text-[8px] uppercase tracking-[0.25em] text-accent/30 block mb-1">
            current thought
          </span>
          <p className="dark:text-zinc-500 text-stone-400 italic leading-relaxed text-[9px]">
            &ldquo;{nowData.thought}&rdquo;
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
