interface FavoriteQuote {
  quote: string;
  author: string;
}

interface GuestFavoritesModalProps {
  show: boolean;
  onHide: () => void;
  guestFavorites: FavoriteQuote[];
  onAddToPrivateList: () => void;
}

const GuestFavoritesModal: React.FC<GuestFavoritesModalProps> = ({
  show,
  onHide,
  guestFavorites,
  onAddToPrivateList,
}) => {
  if (!show) return null;

  return (
    <div className="modal" tabIndex={-1} style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Guest Favorites to Your List</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              You have some favorite quotes from your guest session. Would you
              like to add them to your private list?
            </p>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {guestFavorites.map((favorite, index) => (
                <div key={index} className="col">
                  <div className="card">
                    <div className="card-body text-center">
                      {favorite.quote}
                    </div>
                    <div
                      className="card-body fw-bold text-center"
                      style={{ marginTop: "-25px" }}
                    >
                      - {favorite.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              No, Don't Add
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddToPrivateList}
            >
              Yes, Add to My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestFavoritesModal;
