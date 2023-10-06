document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

let btnEdit = document.querySelector("[data-type=edit]");

btnEdit = addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    const editingText = prompt("Введите новое название");

    if (editingText === null) {
      return;
    } else if (editingText.trim().length > 0) {
      edit(id, editingText).then(() => {
        event.target.closest("li").innerHTML = `
		  ${editingText}
		  <span>
			  <button class="btn btn-primary" data-type="edit" data-id="<%= notes[i].id %>">Редактировать</button>
			  <button class="btn btn-danger" data-type="remove" data-id="<%= notes[i].id %>">&times;</button>
		  </span>
	  `;
      });
    }
  }
});

async function edit(id, text) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: text, id: id }),
  });
}
