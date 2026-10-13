import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="activities-section">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Return Home</Link>
    </section>
  );
}

export default NotFound;
