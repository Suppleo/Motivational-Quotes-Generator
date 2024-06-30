interface Props {
  onClick: () => void;
  count: number;
}

const GayButton = ({ onClick, count }: Props) => {
  return (
    <button type="button" className="btn btn-danger m-3" onClick={onClick}>
      Gay: {count}
    </button>
  );
};

export default GayButton;
