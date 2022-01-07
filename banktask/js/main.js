const formData = [

    { name: "accNum", dataStore: "value", default: null, isDefault: true },
    { name: "name", dataStore: "value", default: null, isDefault: false },
    { name: "address", dataStore: "value", default: null, isDefault: false },
    { name: "phone", dataStore: "value", default: null, isDefault: false },
    { name: "intialBalane", dataStore: "value", default: null, isDefault: false },
]

const createMyOwnElement = (element, parent, classes = "", textContent = "", attributes = []) => {
    const el = document.createElement(element)
    parent.appendChild(el)
    if (classes != "") el.classList = classes
    if (textContent != "") el.textContent = textContent
    attributes.forEach(attribute => {
        el.setAttribute(attribute.attName, attribute.attrVal)
    })
    return el
}

const readDataFromStorage = () => {
    let data
    try {
        data = JSON.parse(localStorage.getItem('customers'))
        if (!Array.isArray(data)) throw new Error('data isn\'t array')
    } catch (exp) {
        data = []
    }
    return data
}

const setDataToStorage = (myData) => {
    if (!Array.isArray(myData)) myData = []
    myData = JSON.stringify(myData)
    localStorage.setItem('customers', myData)
}


const resevedData = document.querySelector('#signup_Customer');
const single = document.querySelector('#single');
const showTrans = document.querySelector('#showTrans');
const withdraw = [{ name: "transaction" },
    { name: "Withdraw" }
];

if (resevedData) {
    resevedData.addEventListener('submit', function(e) {
        e.preventDefault();
        const customerData = readDataFromStorage();
        let newid = customerData.length;
        console.log(newid);
        if (newid == 0) {
            newid = newid
            ne = 4999
        } else {
            newid = newid - 1
            ne = customerData[newid].accNum;
        };

        console.log(newid)

        const customer = {}
        formData.forEach(input => {
            if (input.isDefault) customer[input.name] = ne + 1;
            else

                customer[input.name] = this.elements[input.name][input.dataStore]
        });
        customer.withdraw = []
        customerData.push(customer);
        setDataToStorage(customerData)
        this.reset();
    })
}

let test = readDataFromStorage();

const table = document.querySelector('#showData');

drowItems = () => {
    table.innerHTML = ""
    const customerData = readDataFromStorage()
    if (customerData.length == 0) {
        const tr = createMyOwnElement('tr', table, "alert alert-danger text-center")
        createMyOwnElement('td', tr, "", "No customer Yet", [{ attName: "colspan", attrVal: 6 }])
    } else {
        customerData.forEach((customer, index) => {
            const tr = createMyOwnElement('tr', table)
            formData.forEach(head => createMyOwnElement('td', tr, "", customer[head.name]));
            const td = createMyOwnElement('td', tr)
            const delBtn = createMyOwnElement('button', td, "btn btn-danger mx-3", "delete")
            delBtn.addEventListener('click', () => deleteCustomer(customerData, customer.accNum))
            const AddTransaction = createMyOwnElement('button', td, "btn btn-success mx-3", "AddTransaction")
            AddTransaction.addEventListener('click', () => Add_Transaction(customerData, index));
            const AddWithdraw = createMyOwnElement('button', td, "btn btn-primary mx-3", "AddWithdraw")
            AddWithdraw.addEventListener('click', () => Add_Withdraw(customerData, index));
            const showBtn = createMyOwnElement('button', td, "btn btn-success mx-3", "showUser")
            showBtn.addEventListener('click', () => showOne(customer))

        })
    }
}


if (table) drowItems()

deleteCustomer = (customerData, accNum) => {
    newData = customerData.filter(u => u.accNum != accNum)
    setDataToStorage(newData)
    drowItems()
}
Add_Transaction = (customerData, index) => {
    let customer = customerData[index];
    let transaction = {};
    let getTransaction = prompt('add with');
    transaction.transaction = getTransaction;
    customer.withdraw.push(transaction);
    console.log(customer.withdraw)
    setDataToStorage(customerData, customer)
}
Add_Withdraw = (customerData, index) => {
    let customer = customerData[index];
    let Withdraw = {};
    let getWithdraw = prompt('add with');
    Withdraw.Withdraw = getWithdraw;
    customer.withdraw.push(Withdraw);
    console.log(customer.withdraw)
    setDataToStorage(customerData, customer)

}

showOne = (customer) => {
    localStorage.setItem('customer', JSON.stringify(customer))
    window.location.replace('showone.html')
}


if (single) {
    let customer = JSON.parse(localStorage.getItem('customer'))
    const tr = createMyOwnElement('tr', single)
    formData.forEach(head => createMyOwnElement('td', tr, "", customer[head.name]));
    const td = createMyOwnElement('td', tr)
}

if (showTrans) {
    let customer = JSON.parse(localStorage.getItem('customer'))

    customer.withdraw.forEach((cust) => {
        const tr = createMyOwnElement('tr', showTrans)

        withdraw.forEach(w => createMyOwnElement('td', tr, "", `${w.name} = ${cust[w.name]}`));
    })
}