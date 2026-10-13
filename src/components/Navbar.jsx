import { NavLink, Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="navbar-logo-icon">G</span>
        GoTogether
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/activities">Explore</NavLink>

        {user && <NavLink to="/create">Create Activity</NavLink>}

        {user && <NavLink to="/favorites">Favorites</NavLink>}
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>

            <button type="button" className="navbar-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-login">
              Login
            </NavLink>

            <NavLink to="/register" className="navbar-register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
