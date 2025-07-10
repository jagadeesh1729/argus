import EditableText from "./EditableText";

type EditableRowProps = {
  label: string| React.ReactNode;
  value: string;
  onChange: (val: string) => void;
};
export const EditableRow = ({ label, value, onChange }: EditableRowProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-40 font-semibold text-sm">{label}</span>
      <EditableText
        tag="span"
        defaultValue={value}
        onSave={onChange}
        className="flex-1  px-2 rounded"
      />
    </div>
  );
};