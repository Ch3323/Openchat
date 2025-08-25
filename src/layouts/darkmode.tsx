'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

function Darkmode() {
  const { theme, setTheme } = useTheme();

  function changeTheme() {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className="sm:inline w-full h-full">
      <Button
        onClick={changeTheme}
        className="absolute top-3 right-3 rounded-full"
        variant={'ghost'}
        size={'icon'}
      >
        <Moon className="hidden dark:inline" />
        <Sun className="dark:hidden" />
      </Button>
    </div>
  );
}
export default Darkmode;
