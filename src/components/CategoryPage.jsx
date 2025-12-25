import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <section className="category-page">
      <h1>Kategori: {category}</h1>
      <p>Her kommer attraksjoner, events og spillesteder...</p>
    </section>
  );
}
