import { motion } from "framer-motion";

export function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex-1 h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-12 max-w-lg w-full border border-border flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">
          This module is currently under development. The full feature set will be available in the next build.
        </p>
        <div className="mt-6 px-4 py-2 bg-secondary rounded-md text-sm font-medium border border-border">
          Coming Soon
        </div>
      </motion.div>
    </div>
  );
}
