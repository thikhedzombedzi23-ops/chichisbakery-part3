

var PRODUCTS = [
  { name: 'Sourdough Loaf', category: 'bread', price: 55, priceText: 'R55',
    desc: 'Naturally leavened, crisp crust, soft crumb.',
    img: 'images/Sourdough.jpg', alt: 'Sourdough loaf' },
  { name: 'Rye Loaf', category: 'bread', price: 60, priceText: 'R60',
    desc: 'Dense and hearty, made with stoneground rye flour.',
    img: 'images/bread.jpg', alt: 'Rye bread loaf' },
  { name: 'Chocolate Fudge Cake', category: 'cakes', price: 350, priceText: 'From R350',
    desc: 'Rich chocolate sponge with ganache. Custom sizes available.',
    img: 'images/cake-chocolate.jpg', alt: 'Chocolate celebration cake illustration' },
  { name: 'Vanilla Bean Cake', category: 'cakes', price: 320, priceText: 'From R320',
    desc: 'Light vanilla sponge, custom decoration on request.',
    img: 'images/cake-vanilla.jpg', alt: 'Vanilla celebration cake illustration' },
  { name: 'Butter Croissant', category: 'pastries', price: 25, priceText: 'R25 each',
    desc: 'Flaky, buttery and baked fresh every morning.',
    img: 'images/pastry-croissant.jpg', alt: 'Butter croissant illustration' },
  { name: 'Muffins', category: 'pastries', price: 22, priceText: 'R22 each',
    desc: 'Blueberry, banana or bran.',
    img: 'images/pastry-muffin.jpg', alt: 'Muffins illustration' }
];

var CATEGORY_LABELS = { bread: 'Fresh Bread', cakes: 'Celebration Cakes', pastries: 'Pastries' };

document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('product-list');
  var search = document.getElementById('product-search');
  var category = document.getElementById('product-category');
  var sort = document.getElementById('product-sort');
  var count = document.getElementById('product-count');
  var empty = document.getElementById('no-results');
  if (!list) return;

  function render() {
    var term = search.value.trim().toLowerCase();
    var cat = category.value;

    var results = PRODUCTS.filter(function (p) {
      var matchesText = !term ||
        p.name.toLowerCase().indexOf(term) !== -1 ||
        p.desc.toLowerCase().indexOf(term) !== -1;
      var matchesCat = cat === 'all' || p.category === cat;
      return matchesText && matchesCat;
    });

    if (sort.value === 'price-asc') results.sort(function (a, b) { return a.price - b.price; });
    if (sort.value === 'price-desc') results.sort(function (a, b) { return b.price - a.price; });
    if (sort.value === 'name') results.sort(function (a, b) { return a.name.localeCompare(b.name); });

    list.innerHTML = '';
    results.forEach(function (p) {
      var li = document.createElement('li');

      var img = document.createElement('img');
      img.src = p.img;
      img.alt = p.alt;
      img.loading = 'lazy';

      var h3 = document.createElement('h3');
      h3.textContent = p.name;

      var badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = CATEGORY_LABELS[p.category];

      var para = document.createElement('p');
      para.textContent = p.priceText + ' \u2013 ' + p.desc;

      li.appendChild(img);
      li.appendChild(h3);
      li.appendChild(badge);
      li.appendChild(para);
      list.appendChild(li);
    });

    // Re-apply keyboard focus support for the lightbox on the new images
    list.querySelectorAll('img').forEach(function (i) { i.setAttribute('tabindex', '0'); });

    count.textContent = results.length + (results.length === 1 ? ' product found' : ' products found');
    empty.hidden = results.length !== 0;
  }

  search.addEventListener('input', render);
  category.addEventListener('change', render);
  sort.addEventListener('change', render);
  document.getElementById('product-reset').addEventListener('click', function () {
    search.value = '';
    category.value = 'all';
    sort.value = 'default';
    render();
  });

  render();
});
