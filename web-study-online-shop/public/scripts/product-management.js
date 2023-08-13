const deleteProductBtns = document.querySelectorAll(`.product-item button`);

async function deleteProduct(event) {
  const button = event.target;
  const productId = button.dataset.productid;
  const csrfToken = button.dataset.csrf;

  const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`, {
    method: `DELETE`,
  });

  if(!response.ok) {
    alert(`Someting went wrong.`);
    return;
  }

  button.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductBtn of deleteProductBtns) {
  deleteProductBtn.addEventListener(`click`, deleteProduct);
}
