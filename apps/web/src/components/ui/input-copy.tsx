import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface InputCopyProps extends React.ComponentProps<typeof Input> {
  containerClassname?: string;
}

export function InputCopy({
  className,
  containerClassname,
  ...props
}: InputCopyProps) {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOnClick = async () => {
    if (typeof props.value !== 'string') return;

    try {
      await navigator.clipboard.writeText(props.value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setHasCopied(true);

      timeoutRef.current = setTimeout(() => {
        setHasCopied(false);
        timeoutRef.current = null;
      }, 1500);
    } catch (err) {
      console.error('Failed to copy to clipboard: ', err);
    }
  };

  return (
    <div className={cn('relative', containerClassname)}>
      <Input className={cn('w-full truncate pr-10', className)} {...props} />

      <div className="absolute top-0 right-0 flex size-10 items-center justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleOnClick}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              {hasCopied ? <IconCheck /> : <IconCopy />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copiar</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
