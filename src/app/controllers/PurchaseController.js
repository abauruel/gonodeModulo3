const Ad = require('../model/Ad')
const User = require('../model/User')
const Purchase = require('../model/Purchase')

const Queue = require('../services/Queue')
const PurchaseMail = require('../jobs/PurchaseMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)
    await Purchase.create({ ...req.body, user: req.userId })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.send()
  }

  async accept (req, res) {
    const purchase = await Purchase.findById(req.params.id)
    const saled = await Ad.findByIdAndUpdate(
      purchase.ad,
      {
        purchasedBy: purchase._id
      },
      {
        new: true
      }
    )

    return res.json(saled)
  }
}

module.exports = new PurchaseController()
