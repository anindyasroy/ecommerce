import "./HomePage.css";
import solicon from "../solicon.png";
import Product from "./Products.js";

function Homepage(props) {
  return (
    <section>
      <div class="hero">
        <h1>Portfolio Project</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corporis
          possimus, perferendis nulla deleniti, qui itaque aut aspernatur, hic
          eveniet quis delectus dolores laborum aliquid officiis ducimus
          recusandae laudantium adipisci?
        </p>
        <button class="header-cta">
          <a href="/Product" element={<Product />}>
            Products
          </a>
        </button>
      </div>

      <div>
        <img position="absolute" alt="test" width="500" src={solicon}></img>
      </div>
    </section>
  );
}

export default Homepage;
