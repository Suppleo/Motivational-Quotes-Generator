interface Props {
  onClick: () => void;
}

const GayButton = ({ onClick }: Props) => {
  return (
    <button type="button" className="btn btn-danger m-3" onClick={onClick}>
      Gay
    </button>
  );
};

export default GayButton;
