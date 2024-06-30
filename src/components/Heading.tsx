interface Props {
  children: string;
}

const Heading = ({ children }: Props) => {
  return <div className="h1 text-center fw-bold text-body">{children}</div>;
};

export default Heading;
