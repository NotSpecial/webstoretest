import Vue from 'vue'
import ls from 'local-storage'

var raw_products = [
  {_id: "1",
   title: "Leine",
   description: "Eine normale Leine. Damit lassen sich Hunde zügeln!",
   category: 'Leinen',
   brand: 'Hundkatzemaus',
   price: 25},
  {_id: "2",
   title: "Leine9000",
   description: "Mindestens 8999 mal besser wie eine herkömmliche Leine - ab jetzt haben Sie die Situation wieder in der Hand!",
   category: 'Leinen',
   brand: "Schäfer's Hundeshop",
   price: 790},
  {_id: "3",
   title: "Mantel",
   description: "Damit aus dem Dog ein HotDog wird, brauchen sie diesen Hundemantel. Arktistauglich",
   category: 'Mäntel',
   brand: "Schäfer's Hundeshop",
   price: 60}
]

var raw_categories = [
  'Leinen',
  'Mäntel'
]

var raw_brands = [
  "Schäfer's Hundeshop",
  "Hundkatzemaus"
]

var api = {
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

  // Mock api
  mock: {
    products(query = {}) {
      let products = raw_products

      // Text filter
      if ('text' in query) {
        products = products.filter(function(item) {
          let check = function(prop) {
            return (item[prop].toLowerCase()
                    .indexOf(query.text.toLowerCase())) !== -1
          }
          return check('title') ||
                 check('description') ||
                 check('category') ||
                 check('brand')
        })
      }

      // Category/brand filter
      for (let cat of ['brand', 'category']) {
        if (cat in query) {
          products = products.filter(function(item) {
            return query[cat].indexOf(item[cat]) !== -1
          })
        }
      }
      
      // price filter
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
    categories() {
      return raw_categories;
    },
    brands() {
      return raw_brands;
    }
  }
}

// Shopping cart
// Important: We need to use Vue.set / delete to make cart content reactive
var cart = {
  // Get content of localstorage as initial data
  content: ls.get('cartStorage') || {},

  add(id, amount=1) {
    // Add item to cart and set amount to one
    Vue.set(this.content, id, {
      'item': api.getitem('products', id, {}),
      'amount': amount
    })
    this._save()
  },
  update(id, amount) {
    this.content[id].amount = amount
    this._save()
  },
  remove(id) {
    Vue.delete(this.content, id)
    this._save()
  },

  // LocalStorage
  _save() {ls.set('cartStorage', this.content)},
}

// Register callback for localStorage changes
ls.on('cartStorage', (newContent) => {cart.content = newContent})

export {api, cart}
