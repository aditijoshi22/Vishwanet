// groups.js
const groupsList = document.getElementById("groups-list");

document.getElementById("create-group").addEventListener("click", function() {
  document.getElementById("group-form").style.display = "block";
});

document.getElementById("group-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("group-name").value;
  const description = document.getElementById("group-description").value;

  const groupCard = document.createElement("div");
  groupCard.classList.add("group-card");
  groupCard.innerHTML = `
    <h3>${name}</h3>
    <p>${description}</p>
    <button>Join Group</button>
  `;
  groupsList.appendChild(groupCard);

  document.getElementById("group-form").style.display = "none";
  document.getElementById("group-form").reset();
});
