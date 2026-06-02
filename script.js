// ========== نمایش پیام دمو ==========
function showDemoMessage(message) {
  const oldToast = document.querySelector('.demo-toast');
  if(oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'demo-toast';
  toast.innerHTML = `
    <i class="fas fa-flask"></i> 🔬 DEMO MODE 🔬 <i class="fas fa-flask"></i><br>
    <strong>${message}</strong><br>
    <small>⚠️ This is a demo website — No real orders will be placed.</small>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    if(toast && toast.remove) toast.remove();
  }, 4000);

  toast.addEventListener('click', () => toast.remove());
}

// ========== mobile menu ==========
const menuIcon = document.getElementById('menuIcon');
const navBar = document.getElementById('navLinks');
if(menuIcon && navBar) {
  menuIcon.addEventListener('click', () => navBar.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navBar.classList.remove('active'));
  });
}

// ========== scroll reveal ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });
document.querySelectorAll('.treat-card, .feature-b, .testi-card').forEach(el => observer.observe(el));

// ========== دکمه‌های منو ==========
const orderBtns = document.querySelectorAll('.order-treat');
const customItemInput = document.getElementById('customBakeryItem');
orderBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.getAttribute('data-item');
    const price = this.getAttribute('data-price');
    if(customItemInput && item) {
      customItemInput.value = `${item} ($${price})`;
      showDemoMessage(`✅ "${item}" selected! Complete your order details.`);
    }
    const orderSection = document.getElementById('order');
    if(orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========== منطق Pick Up / Delivery ==========
const radioPickup = document.querySelector('input[value="Pick Up"]');
const radioDelivery = document.querySelector('input[value="Delivery"]');
const addressField = document.getElementById('custAddress');

function toggleAddressField() {
  if(!addressField) return;
  if(radioDelivery && radioDelivery.checked) {
    addressField.disabled = false;
    addressField.required = true;
    addressField.placeholder = "Delivery address (street, building, apt)";
    addressField.style.opacity = "1";
  } else if(radioPickup && radioPickup.checked) {
    addressField.disabled = true;
    addressField.required = false;
    addressField.value = "";
    addressField.placeholder = "Address not needed for Pickup";
    addressField.style.opacity = "0.5";
  }
}

if(radioPickup && radioDelivery) {
  radioPickup.addEventListener('change', toggleAddressField);
  radioDelivery.addEventListener('change', toggleAddressField);
  toggleAddressField();
}

// ========== ثبت سفارش ==========
const submitBtn = document.getElementById('finalOrderBtn');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const customItem = document.getElementById('customBakeryItem')?.value.trim();
  const quantity = parseInt(document.getElementById('qtyBake').value) || 1;
  const notes = document.getElementById('notes')?.value || '';

  let orderType = "Delivery";
  if(radioPickup && radioPickup.checked) orderType = "Pick Up";

  if(!name || !customItem) {
    showDemoMessage("⚠️ Please fill in: Name & Your Order!");
    return;
  }
  if(orderType === "Delivery" && !address) {
    showDemoMessage("⚠️ For Delivery, please enter your address!");
    return;
  }

  let addressShow = (orderType === "Pick Up") ? "🥖 Pickup from bakery" : `🏠 Address: ${address}`;
  let phoneShow = phone ? `📞 ${phone}` : "📞 No phone provided";

  showDemoMessage(
    `🧾 ORDER SUMMARY\n\n` +
    `🥐 ${customItem} × ${quantity}\n` +
    `👤 ${name}\n` +
    `${phoneShow}\n` +
    `${addressShow}\n` +
    `📝 Notes: ${notes || "None"}\n\n` +
    `🔬 DEMO VERSION — No real order placed.`
  );
});

// ========== Tab functionality for gallery ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    tabBtns.forEach(b => b.classList.remove('active-tab'));
    tabContents.forEach(c => c.classList.remove('active-content'));
    
    btn.classList.add('active-tab');
    document.getElementById(tabId).classList.add('active-content');
  });
});

// ========== smooth scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = this.getAttribute('href');
    if(target === "#") return;
    const el = document.querySelector(target);
    if(el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
