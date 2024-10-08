interface Props {
  onClose: () => void;
  type: string;
  message: React.ReactNode;
}

const Alert = ({ onClose, type, message }: Props) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
