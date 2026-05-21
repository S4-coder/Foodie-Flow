import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="page-container error-page">
      <h1 className="error-code">{err?.status ?? "404"}</h1>
      <h2 className="error-title">Oops! Something went wrong.</h2>
      <p className="error-message">
        {err?.statusText ?? "The page you're looking for doesn't exist."}
      </p>
      <Link to="/" className="error-home-btn">
        ← Back to Home
      </Link>
    </div>
  );
};

export default Error;
