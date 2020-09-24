import data from './data.js'

const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const itemsContainer = document.getElementById('items')

for (let i=0; i<data.length; ++i) {
    let newDiv = document.createElement('div');
      newDiv.className = 'item'
    // display the image
    let img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)
  
    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)
    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)
  
    let button = document.createElement('button')
    button.id = data[i].name
  
    // creates a custom attribute called data-price.
    // That will hold the price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
  }
const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))
console.log(all_items_button)

const cart = []

itemList.onchange = function(e){
    if(e.target && e.target.classList.containe('update')){
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name,qty)
    }
}

// Handle Clicks on list ------------------------------------------------------
itemList.onclick = function(e){
    if(e.target && e.target.classList.contains('remove')){
        const name = e.target.dataset.name
        removeItem(name)
    } else if(e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItem(name)
    } else if(e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name
        removeItem(name,1)
    }      
}


// Add Items ------------------------------------------------------
function addItem(name, price){
    for(let i = 0; i < cart.length; i += 1) {
        if(cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            return
        }
    }
    const item = {name, price, qty:1}
    cart.push(item)
}

// Show Items ------------------------------------------------------
function showItems() {
    const qty = getQty()
    const total = getTotal()
    //console.log(`You have ${qty} items in your cart`)
    cartQty.innerHTML = `You have ${qty} items in your cart`
    
    let itemStr = ''
    for(let i = 0; i < cart.length; i += 1) {
        //console.log(`- ${cart[i].name} ${cart[i].price} x ${cart[i].qty}`)
        const {name, price, qty} = cart[i]
        itemStr +=  `<li>
            ${name} ${price} x ${qty} = $${price * qty} 
            <button class='remove' data-name='${name}'>Remove</button>
            <button class='add-one' data-name='${name}'> + </button>
            <button class='remove-one' data-name='${name}'> - </button>
            <input class='update' type='number' data-name="${name}"></input>
        </li>`
    }
    itemList.innerHTML = itemStr

    //console.log(`Tatal in cart: $${total}`)
    cartTotal.innerHTML = `Tatal in cart: $${total}`
}

// Get Qty ------------------------------------------------------
function getQty(){
    let qty = 0
    for(let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty  
    }
    return qty
}

// Get Total ------------------------------------------------------
function getTotal(){
    let total = 0 
    for(let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

// Remove Item ------------------------------------------------------
function removeItem(name, qty=0) {
    for(let i = 0; i < cart.length; i += 1) {
        if(cart[i].name === name) {
            if(qty > 0){
                cart[i].qty -= qty
            } 
            if(cart[i].qty < 1 || qty === 0){
                cart.splice(i,1)
            } 
            showItems()      
            return
        }
    }
}

// Update cart ------------------------------------------------------
function updateCart(name,qty) {
    for(let i = 0; i < cart.length; i += 1) {
        if(cart[i].name == name) {
            if(qty < 1) {
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}

addItem('apple',0.99)
addItem('apple',0.99)
addItem('orange',1.39)
addItem('mango',0.02)
addItem('orange',1.39)
addItem('apple',0.99)

showItems()
removeItem('apple',1)
removeItem('mango')
showItems()









