/* =====================================================
   Harbor Cellars – Singapore Wine Distribution
   Product Management Script (products.js)
   ===================================================== */

// ------------------ Wine Data Source ------------------
// You can replace this static array with a fetch() call from MockAPI or JSON file
const wineData = [
  {
    id: 1,
    name: 'Château Margaux 2018',
    type: 'Red',
    region: 'Bordeaux, France',
    price: '$520',
    image: 'https://www.lagunacellar.com/media/catalog/product/m/a/margaux_2018.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=&width=',
    description: 'An exquisite Bordeaux blend offering deep berry flavors, fine tannins, and remarkable elegance.'
  },
  {
    id: 2,
    name: 'Cloudy Bay Sauvignon Blanc 2022',
    type: 'White',
    region: 'Marlborough, New Zealand',
    price: '$45',
    image: 'assets/wines/cloudybay.jpg',
    description: 'Bright citrus and tropical notes with a crisp, refreshing finish — a New Zealand classic.'
  },
  {
    id: 3,
    name: 'Whispering Angel Rosé 2023',
    type: 'Rosé',
    region: 'Côtes de Provence, France',
    price: '$39',
    image: 'assets/wines/whisperingangel.jpg',
    description: 'Delicate and dry rosé with aromas of peach, strawberry, and subtle minerality.'
  },
  {
    id: 4,
    name: 'Dom Pérignon Vintage 2013',
    type: 'Sparkling',
    region: 'Champagne, France',
    price: '$290',
    image: 'assets/wines/domperignon.jpg',
    description: 'Prestigious Champagne showing creamy texture, toasted brioche, and a vibrant acidity.'
  },
  {
    id: 5,
    name: 'Penfolds Grange 2017',
    type: 'Red',
    region: 'Barossa Valley, Australia',
    price: '$650',
    image: 'assets/wines/penfolds.jpg',
    description: 'Powerful Shiraz with notes of blackberry, mocha, and spice — a hallmark of Australian winemaking.'
  }
];

// ------------------ Select Elements ------------------
const wineGrid = document.querySelector('.wine-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// ------------------ Render Wines ------------------
function renderWines(list) {
  if (!wineGrid) return;
  wineGrid.innerHTML = '';

  list.forEach(wine => {
    const card = document.createElement('div');
    card.classList.add('wine-card');
    card.innerHTML = `
      <img src="${wine.image}" alt="${wine.name}">
      <div class="info">
        <h3>${wine.name}</h3>
        <p><strong>Type:</strong> ${wine.type}</p>
        <p><strong>Region:</strong> ${wine.region}</p>
        <p class="description">${wine.description}</p>
        <p class="price"><strong>${wine.price}</strong></p>
      </div>
    `;
    wineGrid.appendChild(card);
  });
}

// ------------------ Filter Logic ------------------
if (filterButtons) {
  filterButtons.forEach(button => {
    button.addEventListener('click', e => {
      const category = e.target.dataset.type;

      filterButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      if (category === 'All') {
        renderWines(wineData);
      } else {
        const filtered = wineData.filter(wine => wine.type === category);
        renderWines(filtered);
      }
    });
  });
}

// ------------------ Load Wines Initially ------------------
renderWines(wineData);

// ------------------ Search Functionality ------------------
const searchInput = document.getElementById('wineSearch');
if (searchInput) {
  searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const filtered = wineData.filter(wine =>
      wine.name.toLowerCase().includes(query) ||
      wine.region.toLowerCase().includes(query)
    );
    renderWines(filtered);
  });
}

// ------------------ Fetch from MockAPI (Optional) ------------------
// Uncomment to use live API instead of static data
/*
async function fetchWines() {
  try {
    const response = await fetch('https://64.mockapi.io/harborcellars/wines');
    const data = await response.json();
    renderWines(data);
  } catch (err) {
    console.error('Failed to load wines:', err);
    renderWines(wineData); // fallback
  }
}

fetchWines();

*/
