interface Props {
  children: string;
}

const SubHeading = ({ children }: Props) => {
  return <div className="h3 text-center text-secondary">{children}</div>;
};

export default SubHeading;
