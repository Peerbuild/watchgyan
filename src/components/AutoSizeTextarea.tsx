import React, { useRef } from 'react';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import useAutoSizeTextarea from '@/app/hooks/useAutoSizeTextarea';

const AutoSizeTextarea = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutoSizeTextarea({
    value: props.value?.toString() || '',
    textareaRef,
  });

  return (
    <Textarea
      className={cn(
        'resize-none overflow-hidden rounded-none border-0 px-0 focus-visible:ring-0',
        className,
      )}
      {...props}
      ref={textareaRef}
    />
  );
};

export default AutoSizeTextarea;
