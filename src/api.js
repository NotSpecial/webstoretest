import Vue from 'vue';
import ls from 'local-storage';

const rawProducts = [{
  _id: '1',
  title: 'Leine',
  description: 'Eine normale Leine. Damit lassen sich Hunde zügeln!',
  category: 'Leinen',
  brand: 'Hundkatzemaus',
  price: 25,
}, {
  _id: '2',
  title: 'Leine9000',
  description: 'Mindestens 8999 mal besser wie eine herkömmliche Leine - ab jetzt haben Sie die Situation wieder in der Hand!',
  category: 'Leinen',
  brand: 'Schäfer\'s Hundeshop',
  price: 790,
}, {
  _id: '3',
  title: 'Mantel',
  description: 'Damit aus dem Dog ein HotDog wird, brauchen sie diesen Hundemantel. Arktistauglich',
  category: 'Mäntel',
  brand: 'Schäfer\'s Hundeshop',
  price: 60,
}];

const rawCategories = [
  'Leinen',
  'Mäntel',
];

const rawBrands = [
  'Schäfer\'s Hundeshop',
  'Hundkatzemaus',
];

const api = {
  get(resource, query) {
    return this.mock[resource](query);
  },

  getitem(resource, id, query) {
    // eslint-disable-next-line no-underscore-dangle
    const data = this.get(resource, query).filter(item => item._id === id);
    return data[0] || {};
  },

  getPriceRange() {
    // Returns array [lowest price in api, highest]
    const prices = rawProducts.map(item => item.price);

    // use weird apply and null since min and max dont
    // work with arrays out of the box
    return [Math.min.apply(null, prices), Math.max.apply(null, prices)];
  },

  // Mock api
  mock: {
    products(query = {}) {
      let products = rawProducts;

      // Text filter
      if ('text' in query) {
        products = products.filter((item) => {
          function check(prop) {
            return (item[prop].toLowerCase()
                    .indexOf(query.text.toLowerCase())) !== -1;
          }
          return check('title') ||
                 check('description') ||
                 check('category') ||
                 check('brand');
        });
      }

      // Category/brand filter
      ['brand', 'category'].filter(cat => cat in query).forEach((cat) => {
        products = products.filter((item) => {
          const key = item[cat];
          return query[cat].indexOf(key) !== -1;
        });
      });

      // price filter
      if ('price_min' in query) {
        products = products.filter(item => item.price >= query.price_min);
      }
      if ('price_max' in query) {
        products = products.filter(item => item.price <= query.price_max);
      }

      return products;
    },
    categories() {
      return rawCategories;
    },
    brands() {
      return rawBrands;
    },
  },
};

// Shopping cart
// Important: We need to use Vue.set / delete to make cart content reactive
const cart = {
  // Get content of localstorage as initial data
  content: ls.get('cartStorage') || {},

  add(id, amount = 1) {
    // Add item to cart and set amount to one
    Vue.set(this.content, id, {
      item: api.getitem('products', id, {}),
      amount,
    });
    this.save();
  },
  update(id, amount) {
    this.content[id].amount = amount;
    this.save();
  },
  remove(id) {
    Vue.delete(this.content, id);
    this.save();
  },

  // LocalStorage
  save() { ls.set('cartStorage', this.content); },
};

// Register callback for localStorage changes
ls.on('cartStorage', (newContent) => { cart.content = newContent; });

export { api, cart };
