import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const isNumber = props.type === 'number'
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs text-gruvbox-muted font-mono">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'bg-gruvbox-bg border border-gruvbox-border rounded-lg px-3 py-2',
          'text-sm text-gruvbox-text font-mono placeholder:text-gruvbox-border',
          'focus:outline-none focus:border-gruvbox-orange transition-colors',
          isNumber && 'text-center px-2',
          error && 'border-gruvbox-red',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-gruvbox-red">{error}</p>}
    </div>
  )
}
