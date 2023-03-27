import Card from "./Card.js";
import ourIcon from "../Icon.png";

function Product(props) {
  return (
    <div>
      <main>
        <section className="cards">
          <Card
            name="Item 1"
            imageURL={ourIcon}
            description="asdf adsf asdf asdf safd asfd asfd"
          />

          <Card
            name="Item 2"
            imageURL={ourIcon}
            description="asdf adsf asdf asdf safd asfd asfd"
          />
        </section>
      </main>
    </div>
  );
}

export default Product;
