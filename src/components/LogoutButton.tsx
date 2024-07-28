interface Props {
  onclick: () => void;
}
const LogoutButton = ({ onclick }: Props) => {
  return (
    <button type="button" className="btn btn-secondary m-3" onClick={onclick}>
      Logout
    </button>
  );
};

export default LogoutButton;
