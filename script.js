function createUser() {
    let account_number = ac_no.value;
    let password = pwd.value;
    let balance = bal.value;
    let user = {
        account_number: account_number,
        password: password,
        balance: balance
    }
    localStorage.setItem(user.account_number, JSON.stringify(user))
    alert("user created")
    location.reload(true)

}

//object->json=JSON.stringify()

//json->object=JSON.parse()

function populate(users) {
    let htmlData = ""
    for (let user of users) {
        htmlData += `<div class="card" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">account number: ${user.account_number}</li>
        <li class="list-group-item">password: ${user.password}</li>
        <li class="list-group-item">balance: ${user.balance}</li>
      </ul>
    </div>`
    }
    resultarea.innerHTML = htmlData
}

function listAllUsers() {
    let users = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let user = JSON.parse(localStorage.getItem(key));
        users.push(user)
    }
    populate(users)

    // console.log(users);
}

function signIn() {
    let uname = username.value
    let pass = password.value
    if (uname in localStorage) {
        let user = JSON.parse(localStorage.getItem(uname))
        if (user.password == pass) {
            sessionStorage.setItem("user", uname)
            alert("login success")
            window.location.href = "userhome.html"
        }
        else {
            alert("incorrect password")
        }
    }
    else {
        alert("user not found")
    }
}

function displayBalance() {
    let user = sessionStorage.getItem("user");
    let data = JSON.parse(localStorage.getItem(user));
    alert(data.balance)
    console.log(data);

}

function getUser(acno){
    let user=JSON.parse(localStorage.getItem(acno))
    return user;
}

function fundTransfer() {
    alert("inside fund transfer")
    let to_ac_no = toaccount.value
    let con_ac_no = confirmtoaccount.value
    let amt = Number(amount.value)
    if (to_ac_no in localStorage) {
        let user = sessionStorage.getItem("user")
        // let account = JSON.parse(localStorage.getItem(user))
        let account=getUser(user);
        if (account.balance < amt) {
            alert("Insufficient Balance")
        }
        else{
            account.balance-=amt
            localStorage.setItem(user,JSON.stringify(account))
            let credit_ac=getUser(to_ac_no)
            credit_ac.balance=amt+Number(credit_ac.balance)
            localStorage.setItem(to_ac_no,JSON.stringify(credit_ac))

        }
    }
    else {
        alert("Invalid To Account Number")
    }
}

user = sessionStorage.getItem("user")
if (user) {
    profile.innerHTML = `<h4>Welcome ${user}</h4>`
}

function logout() {
    sessionStorage.removeItem("user")
    location.href = "login.html"
}