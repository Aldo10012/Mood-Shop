import data from './data.js'

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

const cart = []
function addItem(name,price){
    for (let i = 0; i < cart.length; i+=1) {
        if (cart[1].name === name) {
            cart[1].qty += 1
        }
        return
    }

    const item = {name, price, qty:1}
    cart.push(item)
}

function showItems(){
    let qty = getQty()
    let total = getTotal()
    console.log(`You have ${qty} items in your cart. `)
    for (let i = 0; i < cart.length; i += 1) {
        console.log(`${cart[i].name} $${cart[i].price} ${cart[i].qty}`)
    }
    console.log(`Total in cart is ${total.toFixed(2)}`)
}

function getQty() {
    let qty = 1
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }
    return qty
}

function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total = cart[i].price * cart[i].qty
    }
    return total
}

addItem('apple',1)
addItem('orange',2)
addItem('mango',3)
showItems()