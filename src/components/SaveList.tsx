import { Link } from "react-router-dom";

interface Props {
  quotes: string[];
  authors: string[];
  onRemoveButtonClick: (quote: string) => void;
}

const SaveList = ({ quotes, authors, onRemoveButtonClick }: Props) => {
  const quoteList = quotes.map((quote, index) => (
    <div className="card my-2" key={quote}>
      <div className="card-body text-center">{quote}</div>
      <div
        className="card-body fw-bold text-center"
        style={{ marginTop: "-25px" }}
      >
        <span className="float-end">
          {/* Trash Icon */}
          <div data-bs-toggle="modal" data-bs-target={"#trashModal-" + index}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              style={{ fillOpacity: 0.5, cursor: "pointer" }}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </div>
        </span>
        - {authors[index]}
      </div>
    </div>
  ));

  const modals = quotes.map((quote, index) => {
    return (
      <div
        className="modal fade"
        id={"trashModal-" + index}
        tabIndex={-1}
        aria-labelledby={"trashModalLabel-" + index}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={"trashModalLabel-" + index}>
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              You are about to remove a quote from your favorite list. This has{" "}
              <strong>permanent</strong> effect. Are you sure about this?
              <div className="card my-2">
                <div className="card-body text-center">{quote}</div>
                <div
                  className="card-body fw-bold text-center"
                  style={{ marginTop: "-25px" }}
                >
                  - {authors[index]}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => onRemoveButtonClick(quote)}
              >
                Remove quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="SaveList"
        aria-labelledby="SaveListLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="SaveListLabel">
            Your favorite quotes
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          Click the{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            className="bi bi-heart mx-1"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>{" "}
          to save your favorite quotes!
          <br />
          <span data-bs-dismiss="offcanvas">
            <Link to="/Motivational-Quotes-Generator/login">
              <u>
                <strong>Log in</strong>
              </u>
            </Link>
          </span>{" "}
          to keep your favorite list permanently!
          {quoteList}
        </div>
      </div>

      {modals}
    </>
  );
};

export default SaveList;
