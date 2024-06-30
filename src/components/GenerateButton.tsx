interface Props {
  onClick: () => void;
}

const GenerateButton = ({ onClick }: Props) => {
  return (
    <button type="button" className="btn btn-success" onClick={onClick}>
      Generate Quote Now!
    </button>
  );
};

export default GenerateButton;
