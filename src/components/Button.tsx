type ButtonProps = {
  style: string;
  isDisabled?: boolean;
  children: string;
  onClick: () => void;
};

export default function Button({
  children,
  style,
  isDisabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      type="submit"
      onClick={onClick}
      className={`rounded-md px-4 py-2 capitalize ${style}`}
    >
      {children}
    </button>
  );
}
