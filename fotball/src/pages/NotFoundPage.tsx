import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section className="container mx-auto">
        <h1 className="bold text-4xl text-center text-red-600">
          Page Not Found
        </h1>
        <Link to="/">Return to admin. page</Link>
      </section>
    </>
  );
};

export default NotFoundPage;
