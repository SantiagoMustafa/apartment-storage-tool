export default function Form({ children, onSubmit }) {
  return (
    <form
      className="flex h-full w-full max-w-[650px] flex-col items-center justify-between gap-4"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
