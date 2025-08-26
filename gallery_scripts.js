const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  toggleBtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  toggleBtn.style.display = "block";
});

const top_link = document.querySelector(".up_button");

top_link.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (top_link) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset < 5) {
      top_link.classList.add("top_link_hide");
    } else {
      top_link.classList.remove("top_link_hide");
    }
  });
}

window.onload = () => {
  const popup = document.getElementById("popup");

  setTimeout(() => {
    popup.style.display = "block";
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);
  }, 100);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      popup.style.display = "none";
    }, 500);
  }, 4000);
};

// updated filter categories
const image_data = [
  { id: 1, src: "./assets/insta_content/images/art_1.jpg", text: "The Joker", category: "Wardrobe", css_class: "wide" },
  { id: 2, src: "./assets/insta_content/images/art_2.jpg", text: "Rajesh Khanna", category: "TV unit design", css_class: "tall" },
  { id: 3, src: "./assets/insta_content/images/art_3.jpg", text: "Kakashi Sensai", category: "Steel railing & glass railing", css_class: "tall" },
  { id: 4, src: "./assets/insta_content/images/art_4.jpg", text: "Sashi kapoor", category: "Steel doors", css_class: "wide" },
  { id: 5, src: "./assets/insta_content/images/art_5.jpg", text: "girl123", category: "Sagwan Doors & jali", css_class: "big" },
  { id: 6, src: "./assets/insta_content/images/art_6.jpg", text: "person", category: "PVC wall & uv seet", css_class: "none" },
  { id: 7, src: "./assets/insta_content/images/art_7.jpg", text: "Avtar", category: "PVC TV unit", css_class: "tall" },
  { id: 8, src: "./assets/insta_content/images/art_8.jpg", text: "Cillian Murphy", category: "PVC door bathroom", css_class: "none" },
  { id: 9, src: "./assets/insta_content/images/art_9.jpg", text: "Lucifer", category: "PVC ceiling All works", css_class: "undefined" },
  { id: 10, src: "./assets/insta_content/images/art_10.jpg", text: "Some Design", category: "Mica Doors", css_class: "wide" },
  { id: 11, src: "./assets/insta_content/images/art_11.jpg", text: "Krishna", category: "Membrane & 3D doors", css_class: "none" },
  { id: 12, src: "./assets/insta_content/images/art_12.jpg", text: "Madara Uchiha", category: "Mandir", css_class: "big" },
  { id: 13, src: "./assets/insta_content/images/art_13.jpg", text: "Radha Krishna", category: "Iron Gate", css_class: "tall" },
  { id: 14, src: "./assets/insta_content/images/art_14.jpg", text: "Rengoku", category: "Hydraulic Bed & Normal bed", css_class: "undefined" },
  { id: 15, src: "./assets/insta_content/images/art_15.jpg", text: "Ganpati Bappa", category: "Cash Counter", css_class: "none" },
  { id: 16, src: "./assets/insta_content/images/art_16.jpg", text: "Ganpati Bappa", category: "Aluminium windows", css_class: "wide" },
  { id: 17, src: "./assets/insta_content/images/art_17.jpg", text: "Deadpool", category: "Aluminium partition and sliders", css_class: "undefined" },
  { id: 18, src: "./assets/insta_content/images/art_18.jpg", text: "Siya Ram", category: "ACP elevation house & Shop", css_class: "big" },
  { id: 19, src: "./assets/insta_content/images/art_19.jpg", text: "MS Dhoni", category: "Tafan glass", css_class: "undefined" },
];

const image_container = document.querySelector(".gallery");

window.addEventListener("DOMContentLoaded", function () {
  getItems(image_data);
  getAllCategoriesDropdown();
});

function getItems(data) {
  image_container.innerHTML = null;
  let items_to_insert = data.map(function (current_data) {
    return `<div class="gallery_card ${current_data.css_class}">
                <img src="${current_data.src}" data-id = ${current_data.id} alt="Beautiful Scenery">
                <div class="gallery_card_overlay">
                   <h3>${current_data.text}</h3>
                </div>
            </div>`;
  });
  items_to_insert = items_to_insert.join("");
  image_container.innerHTML = items_to_insert;
}

const filter_bar = document.querySelector(".filter-bar");

function getAllCategoriesDropdown() {
  let all_categories = image_data.reduce(
    function (acc, currentItem) {
      if (!acc.includes(currentItem.category)) {
        acc.push(currentItem.category);
      }
      return acc;
    },
    ["all"]
  );

  filter_bar.innerHTML = `
    <select id="categoryDropdown" class="filter-dropdown">
      ${all_categories.map(cat => `<option value="${cat}">${cat}</option>`).join("")}
    </select>
  `;

  const categoryDropdown = document.getElementById("categoryDropdown");
  categoryDropdown.addEventListener("change", function () {
    const selectedCategory = categoryDropdown.value;
    if (selectedCategory === "all") {
      getItems(image_data);
    } else {
      const filtered = image_data.filter(item => item.category === selectedCategory);
      getItems(filtered);
    }
  });
}

const search_input = document.querySelector(".search-input");

search_input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const filtered_products = image_data.filter(function (currentItem) {
      return currentItem.text
        .toLowerCase()
        .trim()
        .includes(search_input.value.toLowerCase().trim());
    });

    if (filtered_products.length > 0) {
      getItems(filtered_products);
    } else {
      image_container.innerHTML = `<span class="no-product">No art with this name was found</span>`;
    }
  }
});

const modal = document.querySelector(".modal");
const modal_content = document.querySelector(".modal-content");

image_container.addEventListener("dblclick", (event) => {
  const element_clicked = event.target.getAttribute("data-id");

  const selected_image = image_data.find(
    (currentItem) => currentItem.id == element_clicked
  );

  if (selected_image) {
    modal.style.display = "flex";
    modal_content.innerHTML = `
      <button class="close-btn" id="close-btn">&#10006;</button>
      <img src="${selected_image.src}" alt="Image" class="modal-image">
      <p class="modal-text">${selected_image.text}</p>`;
  } else {
    console.log("Image not found");
  }
});

modal.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-btn")) {
    modal.style.display = "none";
  }
});

const money_modal = document.querySelector("#money_modal");
const money_button = document.querySelector(".donate-button");
const close_button = document.querySelector("#money-close-btn");
money_button.addEventListener("click", () => {
  money_modal.style.display = "flex";
});
close_button.addEventListener("click", () => {
  money_modal.style.display = "none";
});
