import { Button, ButtonProps } from '@/components/ui/button';

export default function AnimatedButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ButtonProps) {
  return (
    <Button
      className="delay-150 duration-500 ease-in-out hover:scale-[1.03]"
      variant={'outline'}
      {...props}
    >
      {children}
    </Button>
  );
}
