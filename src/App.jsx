import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import ActivityCard from "./components/ActivityCard";
import CreateActivity from "./components/CreateActivity";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import {
  updateFavorite,
  removeFavorite,
} from "./features/favorites/favoritesSlice";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function ExploreActivities({ activities, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("All");

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation = activity.location
      .toLowerCase()
      .includes(location.toLowerCase());

    const matchesDate = !date || activity.date === date;

    const matchesCategory =
      category === "All" || activity.category === category;

    return matchesSearch && matchesLocation && matchesDate && matchesCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setDate("");
    setCategory("All");
  };

  return (
    <div className="explore-container">
      <h1>Explore Activities</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <input
          type="text"
          placeholder="Search location..."
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>

        <button type="button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {filteredActivities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="activities-grid">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityDetails({ activities }) {
  const { id } = useParams();

  const activity = activities.find((item) => String(item.id) === id);

  if (!activity) {
    return (
      <div className="activity-details">
        <h2>Activity not found.</h2>
      </div>
    );
  }

  return (
    <div className="activity-details">
      <h1>{activity.name}</h1>
      <p>Location: {activity.location}</p>
      <p>Date: {activity.date}</p>
      <p>People Needed: {activity.peopleNeeded}</p>
      <p>Category: {activity.category}</p>
    </div>
  );
}

function CreateActivityPage({ onCreate, onUpdate, editActivity, onCancel }) {
  return (
    <div className="create-activity-page">
      <h1>{editActivity ? "Edit Activity" : "Create an Activity"}</h1>

      <CreateActivity
        onCreate={onCreate}
        onUpdate={onUpdate}
        editActivity={editActivity}
        onCancel={onCancel}
      />
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(() => {
    try {
      const savedSession = localStorage.getItem("gotogether-logged-in-user");

      if (!savedSession) {
        return null;
      }

      const parsedUser = JSON.parse(savedSession);

      if (
        parsedUser &&
        typeof parsedUser.name === "string" &&
        typeof parsedUser.email === "string"
      ) {
        return parsedUser;
      }

      return null;
    } catch {
      return null;
    }
  });

  const [activities, setActivities] = useState(() => {
    try {
      const savedActivities = localStorage.getItem("gotogether-activities");

      if (savedActivities !== null) {
        const parsedActivities = JSON.parse(savedActivities);

        if (Array.isArray(parsedActivities)) {
          return parsedActivities;
        }
      }
    } catch {
      console.error("Unable to load activities.");
    }

    return [
      {
        id: 1,
        name: "Play Badminton",
        location: "Guntur",
        date: "2026-10-20",
        peopleNeeded: 2,
        category: "Sports",
      },
      {
        id: 2,
        name: "Watch a Movie",
        location: "Vijayawada",
        date: "2026-10-22",
        peopleNeeded: 3,
        category: "Entertainment",
      },
      {
        id: 3,
        name: "Visit a Cafe",
        location: "Guntur",
        date: "2026-10-24",
        peopleNeeded: 2,
        category: "Food",
      },
    ];
  });

  const [editActivity, setEditActivity] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("gotogether-activities", JSON.stringify(activities));
    } catch {
      console.error("Unable to save activities.");
    }
  }, [activities]);

  const saveSession = (authenticatedUser) => {
    const sessionUser = {
      name: authenticatedUser.name,
      email: authenticatedUser.email,
    };

    try {
      localStorage.setItem(
        "gotogether-logged-in-user",
        JSON.stringify(sessionUser),
      );

      setUser(sessionUser);
      return true;
    } catch {
      console.error("Unable to save login session.");
      return false;
    }
  };

  const handleRegister = (registeredUser) => {
    if (saveSession(registeredUser)) {
      navigate("/activities");
    }
  };

  const handleLogin = (loggedInUser) => {
    if (saveSession(loggedInUser)) {
      navigate("/activities");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("gotogether-logged-in-user");
    } catch {
      console.error("Unable to clear login session.");
    }

    setUser(null);
    setEditActivity(null);
    navigate("/");
  };

  const handleCreate = (newActivity) => {
    const activity = {
      ...newActivity,
      id: Date.now(),
    };

    setActivities((previousActivities) => [...previousActivities, activity]);

    navigate("/activities");
  };

  const handleEdit = (activity) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setEditActivity(activity);
    navigate("/create");
  };

  const handleUpdate = (updatedActivity) => {
    setActivities((previousActivities) =>
      previousActivities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity,
      ),
    );

    dispatch(updateFavorite(updatedActivity));
    setEditActivity(null);
    navigate("/activities");
  };

  const handleDelete = (id) => {
    setActivities((previousActivities) =>
      previousActivities.filter((activity) => activity.id !== id),
    );

    dispatch(removeFavorite(id));
  };

  const handleCancelEdit = () => {
    setEditActivity(null);
    navigate("/activities");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home activities={activities} />} />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/activities" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/activities" replace />
            ) : (
              <Register onRegister={handleRegister} />
            )
          }
        />

        <Route
          path="/activities"
          element={
            <ExploreActivities
              activities={activities}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          }
        />

        <Route
          path="/activities/:id"
          element={<ActivityDetails activities={activities} />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <CreateActivityPage
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                editActivity={editActivity}
                onCancel={handleCancelEdit}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute user={user}>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
