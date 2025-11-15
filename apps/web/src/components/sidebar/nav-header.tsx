import { useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function NavHeader() {
  const { isMobile, state } = useSidebar();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isCollapsed = state === 'collapsed';

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 py-2',
        isCollapsed && 'flex-col items-center',
      )}
    >
      <Icons.Volts className="size-8 text-foreground dark:text-white" />

      <Tooltip onOpenChange={setIsOpen} open={isMobile ? false : isOpen}>
        <TooltipTrigger asChild>
          <SidebarTrigger className="text-foreground hover:bg-gray-200 dark:text-white" />
        </TooltipTrigger>
        <TooltipContent side={isCollapsed ? 'right' : 'bottom'}>
          {isCollapsed ? 'Expandir' : 'Recolher'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
