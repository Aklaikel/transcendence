import Icon from "../icon/Icon";

interface errorInputProps {
  message?: string | null;
  type?: string | null;
  className?: string;
}
export const ErrorInput = ({ message = null, type = "error", className = "" }: errorInputProps) => {
  const icon =
    type === "warning"
      ? "warning.svg"
      : type === "success"
      ? "success.svg"
      : "error.svg";

  const containtMsg = (
    <div className={`text-sm text-[#F2F7A1] flex gap-2 mt-1 ${className}`} >
      <Icon width={20} name={icon} /> <span>{message}</span>
    </div>
  );

  return <>{message === null ? "" : containtMsg}</>;
};
