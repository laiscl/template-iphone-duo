export function MarkIcon() {
  return (
    <svg viewBox="0 0 20 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.2 4.4c.1-1.5 1.3-2.6 2.6-2.9-.2 1.6-1.3 2.8-2.6 2.9z"
      />
      <path
        fill="currentColor"
        d="M10.2 6.2c1.6 0 2.7.9 3.2 1.2 1-.6 2.2-.9 3.4-.7 1.7.3 3 1.5 3.6 3.1.9 2.2.2 5-.9 6.9-1 1.8-2.3 3.9-4.1 3.9-1.3 0-1.7-.8-3.4-.8s-2.1.8-3.4.8c-1.8 0-3.2-2.1-4.2-3.9C3 14.8 2.2 11.8 3.1 9.4 3.8 7.6 5.3 6.3 7.1 6.2c1.3-.1 2.2.6 3.1.6z"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.2 10.2 13.2 13.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4.2 5.2h7.6l-.6 8.1a1 1 0 0 1-1 .9H5.8a1 1 0 0 1-1-.9l-.6-8.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M6 5.1V4.2A2 2 0 0 1 8 2.2 2 2 0 0 1 10 4.2v.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.2 1.8v8.4L10.2 6 3.2 1.8Z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 2h2v8H3V2Zm4 0h2v8H7V2Z" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg className="check" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.2 8.2 6.4 11.4 12.8 4.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
