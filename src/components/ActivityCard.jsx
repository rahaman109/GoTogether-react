import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";

function ActivityCard({ activity, onDelete, onEdit }) {
  const [requestSent, setRequestSent] = useState(false);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((item) => item.id === activity.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(activity.id));
    } else {
      dispatch(addFavorite(activity));
    }
  };

  return (
    <article className="activity-card">
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
        <button className="edit-button" onClick={() => onEdit(activity)}>
          Edit
        </button>

        <button className="delete-button" onClick={() => onDelete(activity.id)}>
          Delete
        </button>

        <button onClick={toggleFavorite}>
          {isFavorite ? "♥ Remove Favorite" : "♡ Add Favorite"}
        </button>
      </div>

      <button
        className="join-button"
        onClick={() => setRequestSent(true)}
        disabled={requestSent}
      >
        {requestSent ? "Request Sent" : "Request to Join"}
      </button>
    </article>
  );
}

export default ActivityCard;
