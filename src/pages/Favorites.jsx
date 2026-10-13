import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../features/favorites/favoritesSlice";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);

  const dispatch = useDispatch();

  return (
    <section className="activities-section">
      <h2>My Favorites</h2>

      {favorites.length === 0 ? (
        <p>You haven't added any favorite activities yet.</p>
      ) : (
        <div className="activity-grid">
          {favorites.map((activity) => (
            <article className="activity-card" key={activity.id}>
              <h3>{activity.name}</h3>

              <p>
                <strong>Category:</strong> {activity.category || "Other"}
              </p>

              <p>
                <strong>Location:</strong> {activity.location}
              </p>

              <p>
                <strong>Date:</strong> {activity.date}
              </p>

              <p>
                <strong>People Needed:</strong> {activity.peopleNeeded}
              </p>

              <Link to={`/activities/${activity.id}`}>View Details</Link>

              <div>
                <button
                  className="delete-button"
                  onClick={() => dispatch(removeFavorite(activity.id))}
                >
                  Remove Favorite
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
