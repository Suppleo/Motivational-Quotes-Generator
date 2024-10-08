interface Props {
  children: string;
}

const QuoteBox = ({ children }: Props) => {
  return (
    <div className="lead text-center text-body mt-4 mx-5 display-4">
      {children}
    </div>
  );
};

export default QuoteBox;
