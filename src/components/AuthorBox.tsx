interface Props {
  children: string;
}

const AuthorBox = ({ children }: Props) => {
  return (
    <div className="lead text-center text-secondary mt-5 fw-bold">
      - {children}
    </div>
  );
};

export default AuthorBox;
