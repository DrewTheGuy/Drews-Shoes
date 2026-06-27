const shoes = [
  {
    name: "Jordan 4 Bred",
    size: 10,
    price: "$350",
    status: "in-stock",
    image: "images/products/shoe1.jpg"
  },
  {
    name: "Jordan 1 Chicago",
    size: 9.5,
    price: "$600",
    status: "sold",
    image: "images/products/shoe2.jpg"
  }
];

const grid = document.getElementById("shoeGrid");

if (grid) {
  shoes.forEach(shoe => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${shoe.image}" />
      <h3>${shoe.name}</h3>
      <p>Size: ${shoe.size}</p>
      <p>${shoe.price}</p>
      <span class="${shoe.status}">
        ${shoe.status.toUpperCase()}
      </span>
    `;

    grid.appendChild(card);
  });
}