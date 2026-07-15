import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="placeholderPage">
      <div className="placeholderCard">
        <span className="material-symbols-outlined pageIcon">error</span>

        <h2>Page Not Found</h2>

        <p>The page you are looking for does not exist.</p>

        <Link className="primaryButton linkButton" to="/">
          Return to StreamList
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
