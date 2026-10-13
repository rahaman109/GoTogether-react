import { useParams } from "react-router-dom";

function ActivityDetails() {
  const { id } = useParams();

  return (
    <section className="activities-section">
      <h2>Activity Details</h2>
      <p>Selected Activity ID: {id}</p>
    </section>
  );
}

export default ActivityDetails;
