import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs text-gruvbox-muted font-mono">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'bg-gruvbox-bg border border-gruvbox-border rounded-lg px-2 py-2',
          'text-xs text-gruvbox-text font-mono',
          'focus:outline-none focus:border-gruvbox-orange transition-colors',
          'cursor-pointer min-w-0 w-full',
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gruvbox-bg">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
