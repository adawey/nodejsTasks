// const UserModel = require('../models/user.model')
const { redirect } = require('express/lib/response')
const db = require('../../models/databaseConnection')
const { ObjectId } = require('mongodb');
class Customer {

    static addCustomer = (req, res) => {
        const Customer = { name: "", email: "", age: "", address: "", balance: "" }
        res.render("addcus", { pageTitle: "add new Customer", Customer, errors: {} })
    }
    static addCustomerLogic = (req, res) => {
        console.log(req.body);
        let balance = { value: 0 }
        let debit = { value: 0 }
        let customer = req.body;
        customer.balance = balance;
        customer.debit = debit;
        console.log(customer)
        db((err, client, db) => {
            db.collection('customers').insertOne(customer, (error, result) => {
                if (err || error) return res.redirect("/err")
                console.log('insertOne')
                client.close()
                res.redirect("/")
            })
        })
    }
    static showAll = (req, res) => {
        db((err, client, db) => {
            db.collection('customers').find().toArray((error, result) => {
                // if (error) return redirect('/err')
                const customers = result
                const isEmpty = customers.length == 0
                client.close()
                res.render("index", { pageTitle: "All Customers", customers, isEmpty })
            })
        })
    }
    static singleCustomer = (req, res) => {
        db((err, client, db) => {
            db.collection('customers').findOne({ _id: new ObjectId(req.params.id) },
                (error, result) => {
                    if (!result) {
                        res.render("single", {
                            pageTitle: "Customer Details",
                            customer: result,
                            isEmpty: true
                        })
                        client.close()
                    } else {
                        res.render("single", {
                            pageTitle: "Customer Details",
                            customer: result,
                            isEmpty: false
                        })
                        client.close()
                    }
                }
            )
        })
    }
    static deleteCustomer = (req, res) => {
        db((err, client, db) => {
            db.collection('customers').deleteOne({ _id: new ObjectId(req.params.id) })
                .then(response => {
                    console.log(response);
                    res.redirect("/");
                    client.close();
                })
                .catch(err => {
                    console.log(err)
                    client.close()
                })
        })
    }
    static editCustomer = (req, res) => {
        const id = req.params.id;
        db((err, client, db) => {
            db.collection('customers').findOne({ _id: new ObjectId(id) }, (error, result) => {
                console.log(result)
                if (!result) isEmpty = true;
                res.render("edit", {
                    pageTitle: "customer Details",
                    customer: result,
                    isEmpty: false
                })
                client.close();
            })
        })
    }
    static editCustomerLogic = (req, res) => {
        const id = req.params.id
        db((err, client, db) => {
            db.collection('customers').updateOne({ _id: new ObjectId(id) }, { $set: req.body })
                .then(() => {
                    client.close()
                    res.redirect('/')
                })
                .catch(e => {
                    console.log(err)
                    client.close()

                })
        })
    }
    static addBalance = (req, res) => {
        const id = req.params.id;
        db((err, client, db) => {
            db.collection('customers').findOne({ _id: new ObjectId(id) }, (error, result) => {
                console.log(result)
                if (!result) isEmpty = true;
                res.render("editbalnce", {
                    pageTitle: " add blalance",
                    customer: result,
                    isEmpty: false
                })
                client.close();
            })
        })

    }
    static addBalanceLogic = (req, res) => {
        const id = req.params.id
        const balance = req.body.balance
        console.log(balance);
        db((err, client, db) => {
            db.collection('customers').findOne({ _id: new ObjectId(id) }, (error, result) => {
                const oldBlanace = result.balance.value
                console.log(oldBlanace)
                db.collection('customers').updateOne({ _id: new ObjectId(id) }, {
                        $set: {
                            balance: { value: parseInt(req.body.balance) + parseInt(oldBlanace) }
                        }
                    })
                    .then(() => {
                        client.close()
                        res.redirect('/')
                    })
                    .catch(e => {
                        console.log(err)
                        client.close()
                    })
            })

        })
    }
    static addDeps = (req, res) => {
        const id = req.params.id;
        db((err, client, db) => {
            db.collection('customers').findOne({ _id: new ObjectId(id) }, (error, result) => {
                console.log(result)
                if (!result) isEmpty = true;
                res.render("adddips", {
                    pageTitle: " add dips",
                    customer: result,
                    isEmpty: false
                })
                client.close();
            })
        })

    }
    static addDepsLogic = (req, res) => {
        const id = req.params.id
        const debit = req.body.debit
        console.log(debit);
        db((err, client, db) => {
            db.collection('customers').findOne({ _id: new ObjectId(id) }, (error, result) => {
                const olddebit = result.debit.value
                console.log(olddebit)
                db.collection('customers').updateOne({ _id: new ObjectId(id) }, {
                        $set: {
                            debit: { value: parseInt(req.body.debit) + parseInt(olddebit) }
                        }
                    })
                    .then(() => {
                        client.close()
                        res.redirect('/')
                    })
                    .catch(e => {
                        console.log(err)
                        client.close()
                    })
            })

        })
    }
}
module.exports = Customer