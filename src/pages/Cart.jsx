import { useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "streamlist_cart_items";

const emptyCartForm = {
  title: "",
  platform: "",
  price: "",
  quantity: 1,
  notes: ""
};

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now());
}

function loadCartItems() {
  try {
    const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCartItems) {
      return [];
    }

    return JSON.parse(savedCartItems);
  } catch (error) {
    console.error("Unable to load cart items:", error);
    return [];
  }
}

function saveCartItems(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Unable to save cart items:", error);
  }
}

function Cart() {
  const [cartItems, setCartItems] = useState(() => loadCartItems());
  const [cartForm, setCartForm] = useState(emptyCartForm);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.quantity);
    }, 0);
  }, [cartItems]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setCartForm((currentForm) => {
      return {
        ...currentForm,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedTitle = cartForm.title.trim();
    const cleanedPlatform = cartForm.platform.trim();
    const cleanedNotes = cartForm.notes.trim();
    const cleanedPrice = Number(cartForm.price);
    const cleanedQuantity = Number(cartForm.quantity);

    if (!cleanedTitle || !cleanedPlatform) {
      setCartMessage("Please enter a title and streaming platform.");
      return;
    }

    if (!cleanedPrice || cleanedPrice <= 0) {
      setCartMessage("Please enter a valid price.");
      return;
    }

    if (!cleanedQuantity || cleanedQuantity <= 0) {
      setCartMessage("Please enter a valid quantity.");
      return;
    }

    const newCartItem = {
      id: createId(),
      title: cleanedTitle,
      platform: cleanedPlatform,
      price: cleanedPrice.toFixed(2),
      quantity: cleanedQuantity,
      notes: cleanedNotes,
      createdAt: new Date().toLocaleString()
    };

    setCartItems((currentItems) => {
      return [newCartItem, ...currentItems];
    });

    setCartForm(emptyCartForm);
    setCartMessage("Item added to the cart.");
  }

  function handleIncreaseQuantity(itemId) {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: Number(item.quantity) + 1
          };
        }

        return item;
      });
    });
  }

  function handleDecreaseQuantity(itemId) {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: Math.max(1, Number(item.quantity) - 1)
          };
        }

        return item;
      });
    });
  }

  function handleRemoveItem(itemId) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });

    setCartMessage("Item removed from the cart.");
  }

  function handleClearCart() {
    setCartItems([]);
    setCartMessage("Cart cleared.");
  }

  return (
    <section className="cartPage">
      <section className="introCard">
        <p className="smallLabel">EZTechMovie Cart</p>

        <h2>Streaming Cart</h2>

        <p>
          Add streaming selections to the cart, update item quantities, remove
          unwanted selections, and review the estimated total before checkout.
        </p>
      </section>

      <section className="cartSummaryGrid">
        <div className="statCard">
          <span className="material-symbols-outlined">shopping_cart</span>
          <strong>{cartItems.length}</strong>
          <p>Cart Entries</p>
        </div>

        <div className="statCard">
          <span className="material-symbols-outlined">add_shopping_cart</span>
          <strong>{totalItems}</strong>
          <p>Total Quantity</p>
        </div>

        <div className="statCard">
          <span className="material-symbols-outlined">payments</span>
          <strong>${cartTotal.toFixed(2)}</strong>
          <p>Estimated Total</p>
        </div>
      </section>

      <section className="formCard">
        <div className="sectionHeader">
          <span className="material-symbols-outlined">add_shopping_cart</span>

          <div>
            <h2>Add Cart Item</h2>
            <p>Add a movie, program, rental, or streaming package to the cart.</p>
          </div>
        </div>

        <form className="cartForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="title">Movie or Program Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={cartForm.title}
              onChange={handleInputChange}
              placeholder="Example, The Matrix"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="platform">Streaming Platform</label>
            <input
              id="platform"
              name="platform"
              type="text"
              value={cartForm.platform}
              onChange={handleInputChange}
              placeholder="Example, Prime Video"
            />
          </div>

          <div className="cartFormRow">
            <div className="formGroup">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={cartForm.price}
                onChange={handleInputChange}
                placeholder="4.99"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={cartForm.quantity}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={cartForm.notes}
              onChange={handleInputChange}
              placeholder="Example, Rent this for movie night"
              rows="3"
            />
          </div>

          <button className="primaryButton" type="submit">
            <span className="material-symbols-outlined">add</span>
            Add to Cart
          </button>
        </form>

        {cartMessage && <p className="cartMessage">{cartMessage}</p>}
      </section>

      <section className="listPanel">
        <div className="listHeader">
          <div>
            <p className="smallLabel">Saved Cart Items</p>
            <h2>Your Cart</h2>
          </div>

          <button
            className="clearButton"
            type="button"
            onClick={handleClearCart}
            disabled={cartItems.length === 0}
          >
            <span className="material-symbols-outlined">delete_sweep</span>
            Clear Cart
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="cartItemsList">
            {cartItems.map((item) => {
              const itemTotal = Number(item.price) * Number(item.quantity);

              return (
                <article className="cartItem" key={item.id}>
                  <div className="cartItemMain">
                    <div className="cartItemIcon">
                      <span className="material-symbols-outlined">movie</span>
                    </div>

                    <div>
                      <h3>{item.title}</h3>

                      <p className="platformLine">
                        <span className="material-symbols-outlined">live_tv</span>
                        {item.platform}
                      </p>

                      {item.notes && <p className="notesLine">{item.notes}</p>}

                      <p className="dateLine">Added, {item.createdAt}</p>
                    </div>
                  </div>

                  <div className="cartItemControls">
                    <p className="cartPrice">${Number(item.price).toFixed(2)}</p>

                    <div className="quantityControls">
                      <button
                        className="iconButton"
                        type="button"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="iconButton"
                        type="button"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>

                    <p className="cartItemTotal">${itemTotal.toFixed(2)}</p>

                    <button
                      className="iconButton dangerButton"
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="emptyState">
            <span className="material-symbols-outlined">remove_shopping_cart</span>
            <h3>Your cart is empty.</h3>
            <p>Add a movie, program, rental, or package above to begin.</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default Cart;