const express = require("express");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51M6hOFBzkRWCspGOr4OFfy4yCb2nFOlc6K5Ik17yI2LjX8rUTfdyH90mVG52ZfNDK3SstDUKNGuSYvk7cFghB3eP00JkE9v2Sm');
const router = express.Router();

// post request to create checkout session
router.post("/create-checkout-session", async (req, res) => {

  // iteration on the data from the cart
  const line_items = req.body.cartItems.map(item=>{
    return(
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image]
          },
          unit_amount: item.productPrice * 100,
        },
        quantity: item.productQuantity,
      }
    )
  })

  // create the session i send
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: "https://anime-products.vercel.app/checkoutSuccess",
    cancel_url: "http://localhost:3000",
  });

  res.send({ url: session.url });
});

module.exports = router;
