type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  activeValue: string;
};

export default function OptionGroup({ options, activeValue }: Props) {
  return (
    <div className="flex rounded-lg border border-zinc-200 bg-zinc-100 p-1">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={
            option.value === activeValue
              ? "flex-1 rounded-md bg-white py-1.5 text-xs font-semibold text-zinc-900 shadow-sm"
              : "flex-1 rounded-md py-1.5 text-xs font-medium text-zinc-500"
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}