import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      id="sidebar-menu"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link" id="nav-product">
              <span className="icon material-symbols-outlined me-2">
                shopping_bag
              </span>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/categories"} className="nav-link" id="nav-category">
              <span className="icon material-symbols-outlined me-2">
                category
              </span>
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add-user"} className="nav-link" id="nav-category">
              <span className="icon material-symbols-outlined me-2">
                account_circle
              </span>
              Add User
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Account</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link">
              <span className="icon material-symbols-outlined me-2">
                person
              </span>
              Hej, <span id="username">Hacktiv8!</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href=""
              id="nav-logout"
              onClick={handleLogout}
            >
              <span className="icon material-symbols-outlined me-2">
                logout
              </span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
