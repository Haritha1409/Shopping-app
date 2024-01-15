document.addEventListener('DOMContentLoaded', function(){
fetchDataAndRender('Men');
fetchDataAndRender('Women');
fetchDataAndRender('Kids');
});
function fetchDataAndRender(category){
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
             .then(response => {
        return response.json();
          })
          .then(data => {
          categories = data.categories.filter(c=>c['category_name'] == category)
          if(categories.length>0){
            products = categories[0].category_products;
            return renderProducts(products, category)
          }
          else{
            return renderProducts([], category)
          }
        });
}

function renderProducts(products, category){
    const container = document.getElementById(`${category}Products`);
    if(container){
        container.innerHTML = '';
        products.forEach(product =>{
            const discount = calculateDiscount(product.price, product.compare_at_price);
            const productCard = `
                <div class="product-card">
                    <img class="product-image" src="${product.image}" alt="${product.title}">
                    <div class="discount-badge">${discount}% OFF</div>
                    <div>${product.title}</div>
                    <div>${product.vendor}</div>
                    <div>Price: $${product.price}</div>
                    <div>Compare Price: $${product.compare_price}</div>
                    <button class="add-to-cart-btn"> Add to Cart</button>
                </div>
            `;
        container.innerHTML += productCard;
    });
}
}

function calculateDiscount(price, comparePrice){
    if(!comparePrice || comparePrice <= price){
        return 0;
    }
    const discount = ((comparePrice - price) / comparePrice) * 100;
    return Math.round(discount);
}
function showProducts(category){
    const allContainers = document.querySelectorAll('.products-container');
    allContainers.forEach(container =>{
        container.style.display = 'none';
    });
    const selectedContainer = document.getElementById(`${category}Products`);
    if(selectedContainer){
        selectedContainer.style.display = 'block';
    }else{
        console.error(`Container not found for category: ${category}`);
    }
}