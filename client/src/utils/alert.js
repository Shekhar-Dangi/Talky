export const showAlert = (error) => {
  const alert = document.querySelector(".alert");
  alert.innerHTML =
    error.response.data.message +
    ` <span class="closebtn" onclick="this.parentElement.style.display='none';">
  &times;
</span>`;
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 5000);
};
