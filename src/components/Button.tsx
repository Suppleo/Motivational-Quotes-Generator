interface Props {
  type: string;
  message: React.ReactNode;
  onClick: () => void;
}

const Button = ({ type, message, onClick }: Props) => {
  return (
    <button type="button" className={`btn btn-${type}`} onClick={onClick}>
      {message}
    </button>
  );
};

export default Button;
