/*
 * handles display of addressBook grid
 */
Template.addressBookGrid.helpers({
  selectedBilling: function () {
    let cart = ReactionCore.Collections.Cart.findOne();

    if (cart) {
      if (cart.payment) {
        if (cart.payment.address) {
          if (this._id === cart.payment.address._id) {
            return "active";
          }
        }
      }
    }
  },

  selectedShipping: function () {
    let cart = ReactionCore.Collections.Cart.findOne();

    if (cart) {
      if (cart.shipping) {
        if (cart.shipping.address) {
          if (this._id === cart.shipping.address._id) {
            return "active";
          }
        }
      }
    }
  },
  account: function () {
    return ReactionCore.Collections.Accounts.findOne({
      userId: Meteor.userId()
    });
  }
});

/*
 * events
 */

Template.addressBookGrid.events({
  "click [data-event-action=selectShippingAddress]": function (event, template) {
    cart = ReactionCore.Collections.Cart.findOne();
    return Meteor.call("cart/setShipmentMethod", cart._id, this);
  },
  "click [data-event-action=selectBillingAddress]": function (event, template) {
    cart = ReactionCore.Collections.Cart.findOne();
    return Meteor.call("cart/setPaymentAddress", cart._id, this);
  }
});
