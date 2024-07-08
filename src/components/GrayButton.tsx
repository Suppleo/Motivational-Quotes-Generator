interface Props {
  children: string;
}

const GrayButton = ({ children }: Props) => {
  return (
    <button type="button" className="btn btn-secondary m-3">
      {children}
    </button>
  );
};

export default GrayButton;
