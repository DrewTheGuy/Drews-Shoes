const shoes = [
  {
    name: 'Nike Mind 001 Flyknit "Bronze Eclipse / Total Orange"',
    size: 7,
    price: "$155",
    status: "in-stock",
    image: "images/products/mind-001-7.jpg"
  },
  {
    name: 'Nike Mind 001 Flyknit "Bronze Eclipse / Total Orange"',
    size: 15,
    price: "$280",
    status: "in-stock",
    image: "images/products/mind-001-15.jpg"
  },
  {
    name: 'Air Jordan 3 PRM "BIN23"',
    size: 9,
    price: "$650",
    status: "in-stock",
    image: "images/products/jordan-3-bin23.jpg"
  },
  {
    name: 'Nike Kobe 5 Protro "Caitlin Clark Rookie of the Year"',
    size: 9.5,
    price: "$240",
    status: "in-stock",
    image: "images/products/kobe-5-95.jpg"
  },
  {
    name: 'Nike Kobe 5 Protro "Caitlin Clark Rookie of the Year"',
    size: 11.5,
    price: "$240",
    status: "in-stock",
    image: "images/products/kobe-5-115.jpg"
  }
];
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("shoeGrid");

  if (!grid) return;

  shoes.forEach(shoe => {
    const card = document.createElement("div");
    card.className = "card";

    const isSold = shoe.status === "sold";

    card.innerHTML = `
      <div class="img-wrap">
        <img src="${shoe.image}" />
        ${isSold ? `<div class="badge sold">SOLD</div>` : ``}
      </div>

      <h3>${shoe.name}</h3>
      <p><strong>Size:</strong> ${shoe.size}</p>
      <p class="price">${shoe.price}</p>

      <button class="btn ${isSold ? "disabled" : ""}">
        ${isSold ? "Sold Out" : "DM to Buy"}
      </button>
    `;

    grid.appendChild(card);
  });
});