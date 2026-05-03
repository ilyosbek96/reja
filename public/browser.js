console.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return `  <li
          class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
          <span class="item-text">${item.reja}</span>
          <div>
            <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">
              Ozgartirish
            </button data-id="${item._id}">
            <button class="delete-me btn btn-danger btn-sm">O'chirish</button>
          </div>
        </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  axios
    .post("./create-item", { reja: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Iltimos qaytadan harakat qiling");
    });
});

document.addEventListener("click", function (e) {
  // delete bilan ishlaymiz
  if (e.target.classList.contains("delete-me")) {
    // alert("siz delete tugmasini bostingiz");
    // if (confirm("Aniq o'chirmoqchimisiz?")) {
    //   alert("Ha deb javob berildi");
    // } else {
    //   alert("Yo'q deb javob berildi");
    // }
    if (confirm("Aniq o'chirmoqchimisiz?")) {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((respose) => {
          console.log(respose.data);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Iltimos qaytadan harakat qiling");
        });
    }
  }

  // edit bilan ishlaymiz
  if (e.target.classList.contains("edit-me")) {
    alert("siz edit tugmasini bostingiz");
  }
});
