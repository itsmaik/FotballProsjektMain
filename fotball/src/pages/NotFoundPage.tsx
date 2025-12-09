import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section className="container mx-auto">
        <h1 className="bold color">NotFoundPage</h1>
        <Link to="/">Til Admin siden</Link>
      </section>
    </>
  );
};

export default NotFoundPage;
