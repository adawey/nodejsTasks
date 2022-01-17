const router = require("express").Router()
const customer = require("../controller/customer.controller")

router.get("/", customer.showAll)
    // router.get('/', function(req, res) {
    //     res.render("index");
    // });
router.get("/addcus", customer.addCustomer)
router.post("/addcus", customer.addCustomerLogic)
router.get("/single/:id", customer.singleCustomer)
router.get("/delete/:id", customer.deleteCustomer)
router.get("/edit/:id", customer.editCustomer)
router.post("/edit/:id", customer.editCustomerLogic)
router.get("/addBalance/:id", customer.addBalance)
router.post("/addBalance/:id", customer.addBalanceLogic)
router.get("/addDeps/:id", customer.addDeps)
router.post("/addDeps/:id", customer.addDepsLogic)

module.exports = router