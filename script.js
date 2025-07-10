'use strict';


// BANKIST APP

// Data
const account1 = {
  owner: 'j',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2013-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-07-14T10:17:24.185Z',
    '2024-07-16T14:11:59.604Z',
    '2024-07-18T17:01:17.194Z',
    '2024-07-19T23:36:17.929Z',
    '2024-07-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jes Dav',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2024-07-14T14:18:46.235Z',
    '2024-07-16T16:33:06.386Z',
    '2024-07-18T14:43:26.374Z',
    '2024-07-20T12:01:20.894Z',
    '2024-07-21T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460, 99],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const moveRow = document.querySelector('.movements__row');
const labelLog = document.querySelector('.log');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login_btn');
const btnTransfer = document.querySelector('.btn--transfer');
const btnLoan = document.querySelector('.btn--loan');
const btnClose = document.querySelector('.btn--close');
const btnSort = document.querySelector('.sort');

const inputLoginUsername = document.querySelector('.login__user');
const inputLoginPin = document.querySelector('.login__pin');
const inputTransferTo = document.querySelector('.form__transfer__to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.input__user');
const inputClosePin = document.querySelector('.input__pin');

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2,0);
// const month =  `${now.getMonth() + 1}`.padStart(2,0); // +1 bec it is zero based
// const year = now.getFullYear();
// const hours = `${now.getHours()}`.padStart(2,0);
// const min = `${now.getMinutes()}`.padStart(2,0);
// labelDate.textContent = `As of ${month}/${day}/${year}, ${hours}:${min}`;

//Using API
const now = new Date();
const options = {
  hour:'numeric',
  minute:'numeric',
  day:'numeric',
  month:'long',
  year:'numeric',
  weekday:'long',
}
const local = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat(local,options).format(now);


// Date func
const formatMovmentDate = function(date,local){

  const calcDayPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const dayPassed = calcDayPassed(new Date(), date);
  
  if(dayPassed === 0) return 'Today';
  if(dayPassed === 1) return 'Yesterday';
  if(dayPassed <= 7) return `${dayPassed} days ago`;
  
  // const day = `${date.getDate()}`.padStart(2,0);
  // const month = `${date.getMonth() + 1}`.padStart(2,0); // +1 bec it is zero based
  // const year = date.getFullYear();

  // return `${month}/${day}/${year}`;

  return  new Intl.DateTimeFormat(local).format(date);
}


// Format Currency
const formatCurrency = function(acc,m){

  return new Intl.NumberFormat(acc.locale,{
    style:'currency',
    currency: acc.currency,
  }).format(m);
}

const displayMovments = function(acc, sort =false){

// sorting we use the slice method to make a shallow copy of the orginal array to not mutate the orginal array
  const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;
  let f = false;
  containerMovements.innerHTML='';
  
  movs.forEach(function(m,i){
    
    //date
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovmentDate(date,acc.locale);       

     const currency = formatCurrency(acc,m);  

    // i % 2 === 0 means every second time
    const type = m > 0 ? "deposit" : "withdrawal";
    const html =`                              
          <div class="movements__row" style="${i % 2 === 0 ? 'background-color: #f1f1f1;' : ''}">
              <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
              <div class="movements__date">${displayDate}</div>
              <div class="movements__value">${currency}</div>
           </div>`;
           containerMovements.insertAdjacentHTML("afterbegin",html);
    });
};

const calcPrintBalance = function(account){  
  account.balance = account.movements.reduce( (acc,value) => acc + value, 0);
  labelBalance.textContent = `${(account.balance)}€`;
}

const calcDisplaySummary = function(account){

  const income = account.movements.filter(value => value > 0).reduce((acc,value) => acc + value,0);  
  labelSumIn.textContent = formatCurrency(account,income);

  const out = account.movements.filter(value => value <0).reduce((acc,value) => acc + value,0);
  labelSumOut.textContent = formatCurrency(account,out); //`${(Math.abs(out.toFixed(2)))}€`;

  const interest = account.movements.filter(value => value > 0).map(value => (value * account.interestRate)/100).filter(value => value >=1).reduce((acc,value) => acc + value,0);
  labelSumInterest.textContent = formatCurrency(account,interest);  //`${(interest.toFixed(2))}€`;
}


// Creating UserName
accounts.forEach(function(accs){
  accs.userName=accs.owner.toLowerCase().split(" ").map(u=>u[0]).join("");
})

const updateUI = function(acc){
   // Display movments
   displayMovments(acc);  
   // Display summary
   calcDisplaySummary(acc);
   // Display balance    
   calcPrintBalance(acc);
   //Get rid of data 
}


// Fake login account

let currentAccount;
// currentAccount = account2;
// containerApp.style.opacity =1;
// updateUI(currentAccount)

// Log out timer func
const logOut = function(){

  let time = 120;
  const tick = function(){

    const min = String(Math.trunc(time / 60)).padStart(2,0) ;
    const sec = String(Math.trunc(time % 60)).padStart(2,0) ;

    labelTimer.textContent = `${min}:${sec}`;
    
    if (time === 0) {
      containerApp.style.opacity =0;
      labelWelcome.textContent ='Log in to get started';
    }
    
    time--;
  };

  tick(); //is called immediately to ensure the timer is displayed right away.
  const timer = setInterval(tick,1000);
  return timer;
}

let timer;

btnLogin.addEventListener("click",function(m){

  m.preventDefault();
  currentAccount = accounts.find(acc=> acc.owner === inputLoginUsername.value)

  // using optional chaining (?) if currentAccount exist then continue
  if(currentAccount?.pin === +(inputLoginPin.value)){
    
    //show welcome mess + first name
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}!`; 
    containerApp.style.opacity = 100;
   
    //Get rid of data 
    inputLoginUsername.value = inputLoginPin.value ='';
    inputLoginPin.blur();
    
    if(timer) clearInterval(timer);
    timer = logOut();
    
    updateUI(currentAccount);
    
  }
  else{
    alert("Wrong Credentials");
    containerApp.style.opacity =0;
  }
})

// sorting btn
let sorted = false;
btnSort.addEventListener("click",function(e){

  e.preventDefault();
  displayMovments(currentAccount, !sorted);
  sorted = !sorted;
})



//Transfer money
btnTransfer.addEventListener("click",function(e){

  e.preventDefault();
  // + instead of Number()
  const amount = +(inputTransferAmount.value);
  const recieverAcc =  accounts.find(acc => acc.userName === inputTransferTo.value );
  
  // clear inputs
  inputTransferAmount.value = inputTransferTo.value= '';

  if( amount > 0 && amount <= currentAccount?.balance && currentAccount?.userName != recieverAcc?.userName && accounts.some(acc => acc.userName === recieverAcc.userName) ){

    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = logOut();
  } else {
    alert('Invalid transfer details. Please check the transfer amount and the recipient account.');
  }
})

  //Loan money
  btnLoan.addEventListener("click",function(e){

    e.preventDefault();
    const amount = +(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some( mov => mov >= amount * 0.1)){
      setTimeout( function(){

        currentAccount.movements.push(amount);
        currentAccount.movementsDates.push(new Date().toISOString());
        updateUI(currentAccount);

        clearInterval(timer);
        timer = logOut();
      },3000)
      inputLoanAmount.value = '';
    }
    else{
    alert('Invalid loan amount.');

    }
  })

  //Close account
  btnClose.addEventListener("click",function(e){
    
    e.preventDefault();
    if( currentAccount.userName === inputCloseUsername.value &&   Number( inputClosePin.value ) === currentAccount.pin ){
     
      const index = accounts.findIndex(acc => acc.userName === currentAccount.userName );

      console.log(index);
      accounts.splice(index,1);
      console.log(accounts);

      inputCloseUsername.value = inputClosePin.value ='';
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Login to get started";
    }
  })

