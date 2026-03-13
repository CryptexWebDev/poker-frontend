/**
 * Plus icon for add balance button.
 * 14x14 design, stroke white (currentColor)
 */
export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="0.875rem"
      height="0.875rem"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M6.83333 1V12.6667M1 6.83333H12.6667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
