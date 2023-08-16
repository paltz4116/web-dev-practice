const addCartBtn = document.querySelector(`#product-details button`);
const cartBadge = document.querySelector(`.nav-items .badge`);

async function addToCart() {
  const productId = addCartBtn.dataset.productid;
  const csrfToken = addCartBtn.dataset.csrf;
  let response;

  try {
    response = await fetch(`/cart/items`, {
      method: `POST`,
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": `application/json`,
      },
    });
  } catch (error) {
    alert(`Something went wrong.`);

    return;
  }

  if (!response.ok) {
    alert(`Something went wrong.`);

    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  cartBadge.textContent = newTotalQuantity
}

addCartBtn.addEventListener(`click`, addToCart);