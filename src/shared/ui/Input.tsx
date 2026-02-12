export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-12 w-full rounded-2xl bg-white px-4 text-sm shadow-sm ring-1 ring-black/5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
        props.className ?? ""
      }`}
    />
  );
}