import { useState } from "react";

function CreateActivity({ onCreate, editActivity, onUpdate, onCancel }) {
  const [activityName, setActivityName] = useState(editActivity?.name ?? "");
  const [location, setLocation] = useState(editActivity?.location ?? "");
  const [date, setDate] = useState(editActivity?.date ?? "");
  const [peopleNeeded, setPeopleNeeded] = useState(
    editActivity?.peopleNeeded ?? 1,
  );
  const [category, setCategory] = useState(editActivity?.category ?? "Sports");

  const handleSubmit = (event) => {
    event.preventDefault();

    const activityData = {
      name: activityName.trim(),
      location: location.trim(),
      date,
      peopleNeeded: Number(peopleNeeded),
      category,
    };

    if (
      !activityData.name ||
      !activityData.location ||
      !activityData.date ||
      !Number.isInteger(activityData.peopleNeeded) ||
      activityData.peopleNeeded < 1
    ) {
      return;
    }

    if (editActivity) {
      onUpdate({
        ...editActivity,
        ...activityData,
      });
    } else {
      onCreate(activityData);
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="activityName">Activity Name</label>
        <input
          id="activityName"
          type="text"
          placeholder="e.g. Play Badminton"
          value={activityName}
          onChange={(event) => setActivityName(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          min={new Date().toLocaleDateString("en-CA")}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="peopleNeeded">People Needed</label>
        <input
          id="peopleNeeded"
          type="number"
          min="1"
          step="1"
          value={peopleNeeded}
          onChange={(event) => setPeopleNeeded(event.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {editActivity ? "Update Activity" : "Create Activity"}
        </button>

        {editActivity && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CreateActivity;
