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



// --------------------------------------------------------------
// add item  
const cart = []
function addItem(name,price){
    for (let i = 0; i < cart.length; i+=1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
        }
        return
    }

    const item = {name, price, qty:1}
    cart.push(item)
}
// --------------------------------------------------------------
// show item  
function showItems(){
    let qty = getQty()
    let total = getTotal()
    //console.log(`You have ${qty} items in your cart. `)
    cartQty.innerHTML = `You have ${qty} items in your cart. `

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        //console.log(`${cart[i].name} $${cart[i].price} ${cart[i].qty}`)
        const {name, price, qty} = cart[i]
        itemStr += `<li>${name} $${price} x ${qty} = ${price * qty}</li>` 
    }
    const all_items_button = Array.from(document.querySelectorAll("button"))

    itemList.innerHTML = itemStr
    //console.log(`Total in cart is ${total.toFixed(2)}`)  
    cartTotal.innerHTML = `Total in cart is ${total.toFixed(2)}`
}
// --------------------------------------------------------------
// get quantity  
function getQty() {
    let qty = 1
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
        all_items_button.forEach(elt => elt.addEventListener('click', () => {
            addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
            showItems()
          }))
    }
    return qty
}
// --------------------------------------------------------------
// get total  
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total = cart[i].price * cart[i].qty
        all_items_button.forEach(elt => elt.addEventListener('click', () => {
            addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
            showItems()
          }))
    }
    return total
}
// --------------------------------------------------------------
// remove item  
function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i += 1) {
        all_items_button.forEach(elt => elt.addEventListener('click', () => {
            addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
            showItems()
          }))
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            
            if (cart[i].qty < 1 || qty == 0){
                cart.splice(i, 1)
            }
            
            return
        }
    }
}




addItem('apple',1)
addItem('orange',2)
addItem('mango',3)
showItems()
