interface Props {
  children: string;
}

const SaveListButton = ({ children }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-primary m-3"
      data-bs-toggle="offcanvas"
      data-bs-target="#SaveList"
      aria-controls="SaveList"
    >
      {children}
    </button>
  );
};

export default SaveListButton;
