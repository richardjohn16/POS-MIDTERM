let n = 1;
let price = 0;
let payment = 0;
let change = 0;

const prodSize = ["M", "L"];
const sizePrice = [70, 90]; 
const foodPrice = [80, 85, 100, 75, 85, 95]; 

//For getting all 'Add to Order' buttons
const elements = document.getElementsByClassName("btn btn-primary");

for (let i = 0; i < 9; i++) {    
    elements[i].addEventListener('click', function() {
        //Getting div.overlfow-auto inside 'Ordered Items'
        const container = document.querySelector('.overflow-auto');
        
        const prodName = "prodName" + i;
        const product = document.getElementById(prodName).innerHTML;
        
        const drinkSize = "drinkSize" + i;
        const sizeIndex = document.getElementById(drinkSize).options.selectedIndex;
        const size = prodSize[sizeIndex];

        const drinkAmt = "drinkAmt" + i;
        const drinkQty = document.getElementById(drinkAmt).value;
    
        const prodItemHTML=`
                      <div class="mt-3 card w-100">
                          <div class="card-body">
                            <h3 class="card-title">${product} - ${size}</h3>
                            <div class="qtyContainer">
                                <p class="card-text">Qty: ${drinkQty}</p>
                            </div>
                          </div>
                      </div>
        `;
        
        price = price + (sizePrice[sizeIndex] * drinkQty);
        
        container.insertAdjacentHTML('beforeend', prodItemHTML);
        
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.remove();
        const priceLabel = document.getElementById('priceLabel');
        const priceHTML = `<h1 id="totalPrice">Total: Php ${price}</h1>`;
        priceLabel.insertAdjacentHTML('beforeend', priceHTML);
    
        n++;
    });
}

for (let i = 9; i < elements.length - 1; i++) {
    elements[i].addEventListener('click', function() {
        const container = document.querySelector('.overflow-auto');
        
        const prodName = "prodName" + i;
        const product = document.getElementById(prodName).innerHTML;
        
        const foodAmt = "foodAmt" + i;
        const foodQty = document.getElementById(foodAmt).value;

        const prodItemHTML=`
                      <div class="mt-3 card w-100">
                          <div class="card-body">
                            <h3 class="card-title">${product}</h3>
                            <div class="qtyContainer">
                                <p class="card-text">Qty: ${foodQty}</p>
                            </div>
                          </div>
                      </div>
        `;
        
        const k = i - 9;
        price = price + (foodPrice[k] * foodQty);
        
        container.insertAdjacentHTML('beforeend', prodItemHTML);
        
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.remove();
        const priceLabel = document.getElementById('priceLabel');
        const priceHTML = `<h1 id="totalPrice">Total: Php ${price}</h1>`;
        priceLabel.insertAdjacentHTML('beforeend', priceHTML);
    
        n = n + 1;
    });
}

document.getElementById('pay').addEventListener('click', function() {
    event.preventDefault();
    
    payment = document.getElementById('totalPay').value;
    
    if (payment < price) {
        alert('Not enough balance. Please try again.');
    }
    else {
        change = payment - price;
        alert('Thanks for ordering! Here\'s your ' + change + ' pesos change.');
    }
});

function printReceipt() {
    document.getElementById('pay').addEventListener('click', function() {
        payment = document.getElementById('totalPay').value;
        
        if (payment < price) {
            alert('Not enough balance. Please try again.');
        }
        else {
            change = payment - price;
        }
    });

    payment = document.getElementById('totalPay').value;
    const orderedItemsContainer = document.querySelector('.overflow-auto');
    const orderedItemsContent = orderedItemsContainer.innerHTML;
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f3f4f6;
                    padding: 20px;
                }
                h1 {
                    color: red;
                    text-transform: uppercase;
                    text-align: center;
                    font-size: 60px;
                }

                .ordered-items {
                    margin-top: 20px;
                }
                .card {
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                    padding: 15px;
                }
                .card-title {
                    color: #333;
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .card-text {
                    color: #666;
                    font-size: 16px;
                }
                .total {
                    margin-top: 20px;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <h1>Receipt</h1>
            <div class="ordered-items">
                ${orderedItemsContent}
            </div>
            <div class="total">
                <p>Total: Php ${price.toFixed(2)}</p>
                <p>Change: Php ${change.toFixed(2)}</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}


document.getElementById('printReceipt').addEventListener('click', printReceipt);

const coffeeLink = document.getElementById('coffeeLink');
const foodLink = document.getElementById('foodLink');

const coffeeButton = function() {
    coffeeLink.classList.add("disabled");
    foodLink.classList.remove("disabled");

    const coffeeContainer = document.getElementById('coffeeContainer');
    coffeeContainer.classList.remove("d-none");
    
    const foodContainer = document.getElementById('foodContainer');
    foodContainer.classList.add("d-none");

};

const foodButton = function() {
	const foodContainer = document.getElementById('foodContainer');
	foodContainer.classList.remove("d-none");
	
	const coffeeContainer = document.getElementById('coffeeContainer');
	coffeeContainer.classList.add("d-none");
	
	coffeeLink.classList.remove("disabled");
	foodLink.classList.add("disabled");
}
// Function to remove all items from the order list
function removeAllItemsFromOrder() {
    orderedItems = []; // Clear the ordered items array
    displayOrderedItems(); // Update the display of ordered items
}

// Inside your 'printReceipt' function, before opening the print window, call removeAllItemsFromOrder()

// Add a "Remove Previous Order" button to your HTML
const removePreviousOrderButton = document.getElementById('removePreviousOrder');
removePreviousOrderButton.addEventListener('click', removeAllItemsFromOrder);

coffeeLink.addEventListener('click', coffeeButton, false);
foodLink.addEventListener('click', foodButton, false);

