function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
 // Select buttons and modal
 const cartButtons = document.querySelectorAll('.add-to-cart');
 const modal = document.getElementById('cartModal');
 const form = document.getElementById('cartForm');

 let currentProduct = {};

 // Open modal when Add to Cart is clicked
 cartButtons.forEach(button => {
     button.addEventListener('click', (e) => {
         const product = e.target.closest('.product');
         currentProduct = {
             name: product.dataset.name,
             price: product.dataset.price
         };
         modal.style.display = 'flex';
     });
 });

 // Submit form and save data to local storage
 form.addEventListener('submit', (e) => {
     e.preventDefault();

     // Get user input
     const userName = document.getElementById('userName').value;
     const userLocation = document.getElementById('userLocation').value;
     const userPhone = document.getElementById('userPhone').value;
     const quantity = document.getElementById('quantity').value;

     // Create full cart object
     const cartData = {
         product: currentProduct,
         user: {
             name: userName,
             location: userLocation,
             phone: userPhone,
         },
         quantity: quantity
     };

     // Save to local storage
     let cart = JSON.parse(localStorage.getItem('cart')) || [];
     cart.push(cartData);
     localStorage.setItem('cart', JSON.stringify(cart));

     // Close modal and reset form
     modal.style.display = 'none';
     form.reset();

     alert('Product added to cart!');
 });

 // Close modal when clicking outside of it
 window.addEventListener('click', (e) => {
     if (e.target === modal) {
         modal.style.display = 'none';
     }
 });
 document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Form submit behavior کو روکیں

    // فارم کے ڈیٹا حاصل کریں
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // پیغام کو لوکل اسٹوریج میں محفوظ کریں
    const contactMessage = {
        name,
        email,
        message,
        date: new Date().toLocaleString(),
    };

    // لوکل اسٹوریج میں پیغامات کا انتظام کریں
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // کامیابی کا پیغام دکھائیں
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // فارم کلئیر کریں
    document.getElementById('contactForm').reset();

    // کامیابی کا پیغام 3 سیکنڈ بعد غائب کریں
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});
