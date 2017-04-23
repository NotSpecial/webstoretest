var raw_products = [
  {_id: "1",
   title: "Leine",
   description: "Eine normale Leine. Damit lassen sich Hunde zügeln!",
   category: 'Leinen',
   vendor: 'Hundkatzemaus',
   price: 25},
  {_id: "2",
   title: "Leine9000",
   description: "Mindestens 8999 mal so gut wie eine herkömmliche Leine - ab jetzt haben Sie die Situation wieder in der Hand!",
   category: 'Leinen',
   vendor: "Schäfer's Hundeshop",
   price: 790},
  {_id: "3",
   title: "Mantel",
   description: "Damit aus dem Dog ein HotDog wird, brauchen sie diesen Hundemantel. Arktistauglich",
   category: 'Mäntel',
   vendor: "Schäfer's Hundeshop",
   price: 60}
]

var raw_categories = [
  'Leinen',
  'Mäntel'
]

var raw_vendors = [
  "Schäfer's Hundeshop",
  "Hundkatzemaus"
]

export default {
  get(resource, query) {
    return this.mock[resource](query)
  },
  getitem(resource, id, query) {
    let getId = (item) => {return item._id == id}
    let data = this.get(resource, query).filter(getId)

    if (data.length > 0) {
      return data[0]
    } else {
      return {}
    }
  },
  getPriceRange() {
    // Returns array [lowest price in api, highest]
    let getPrices = (item) => {return item.price}
    let prices = raw_products.map(getPrices)

    // use weird apply and null since min and max dont
    // work with arrays out of the box
    return [Math.min.apply(null, prices),
            Math.max.apply(null, prices)]
  },
  cart: {},
  cartHooks : [],
  onCartUpdate(func) {
    this.cartHooks.push(func)
  },
  getCart() {
    // Todo: Add login
    return this.cart
  },
  // Modify content
  addToCart(id, amount) {
    // Todo: Add login

    // If amount is not given, increment
    if (this.cart.hasOwnProperty(id)) {
      if (!amount) {
        this.cart[id].amount += 1
      } else {
        console.log("in here")
        this.cart[id].amount = amount
      }
    } else {
      // Create with 1 or specified amount
      if (!amount) {
        amount = 1
      }
      this.cart[id] = {
        'item': this.getitem('products', id, {}),
        'amount': 1
      }
    }

    // Call hooks
    for (let f of this.cartHooks) {f()}
  },
  removeFromCart(id) {
    delete this.cart[id]
    // Call hooks
    for (let f of this.cartHooks) {f()}
  },

  mock : {
    products(query = {}) {
      let products = raw_products
      if ('text' in query) {
        products = products.filter(function(item) {
          let check = function(prop) {
            return (item[prop].toLowerCase()
                    .indexOf(query.text.toLowerCase())) !== -1
          }
          return check('title') ||
                 check('description') ||
                 check('category') ||
                 check('vendor')
        })
      }
      for (let cat of ['vendor', 'category']) {
        if (cat in query) {
          products = products.filter(function(item) {
            return query[cat].indexOf(item[cat]) !== -1
          })
        }
      }
      // price filters
      if ('price_min' in query) {
        products = products.filter( (item) => {
          return item.price >= query.price_min
        })
      }
      if ('price_max' in query) {
        products = products.filter( (item) => {
          return item.price <= query.price_max
        })
      }

      return products
    },
    category() {
      return raw_categories;
    },
    vendor() {
      return raw_vendors;
    }
  }
}
