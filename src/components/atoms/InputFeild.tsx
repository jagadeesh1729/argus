type InputFieldProps = {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string; // extra class for input/textarea
  labelClassName?: string; // extra class for label
  containerClassName?: string; // wrapper div customization
  labelWidth?: string; // optional label width
  multiline?: boolean; // enables textarea instead of input
  rows?: number; // textarea rows (used only if multiline is true)
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  className = '',
  labelClassName = '',
  containerClassName = '',
  labelWidth = 'w-40',
  multiline = false,
  rows = 3,
}: InputFieldProps) => {
  return (
    <div className={`flex items-start gap-2 mb-4 ${containerClassName} max-w-lvh`}>
      <p className={`font-semibold text-sm ${labelWidth} ${labelClassName}`}>{label}</p>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`flex-1 font-semibold border border-gray-400 p-2 rounded resize-none ${className}`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`flex-1 font-semibold border border-gray-400 p-2 rounded ${className}`}
        />
      )}
    </div>
  );
};

export default InputField;
