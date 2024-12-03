const cartItems = document.getElementById('cart-items');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.querySelector('h3').innerText;
    const price = product.querySelector('p').innerText;

    const cartItem = document.createElement('li');
    cartItem.innerText = `${name} - ${price}`;
    cartItems.appendChild(cartItem);

    const emptyMessage = document.querySelector('#cart-items li');
    if (emptyMessage && emptyMessage.innerText === 'Keranjang kosong') {
      emptyMessage.remove();
    }
  });
});
document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const amount = document.getElementById('amount').value;
  
    alert(`Pembayaran berhasil!\n\nNama: ${name}\nEmail: ${email}\nAlamat: ${address}\nMetode: ${paymentMethod}\nJumlah: Rp ${amount}`);
  });
  
