import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Detect already-installed
    const mq = window.matchMedia('(display-mode: standalone)');
    setIsInstalled(mq.matches);
    const mqListener = (e: MediaQueryListEvent) => setIsInstalled(e.matches);
    mq.addEventListener('change', mqListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      mq.removeEventListener('change', mqListener);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    setIsInstalling(true);
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
      setIsInstalled(true);
    }
    setIsInstalling(false);
  };

  const canInstall = !!installPrompt && !isInstalled;

  return { canInstall, isInstalled, isInstalling, install };
}
