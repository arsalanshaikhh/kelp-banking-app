# Sample Input/Output

# Input:

- CREATE ACC001 KELP

```sh
node index.js CREATE ACC001 KELP
```

- DEPOSIT ACC001 10000

```sh
node index.js DEPOSIT ACC001 10000
```

- WITHDRAW ACC001 1000

```sh
node index.js WITHDRAW ACC001 1000
```

- CREATE ACC002 FVTPL

```sh
node index.js CREATE ACC002 FVTPL
```

- DEPOSIT ACC002 10000

```sh
node index.js DEPOSIT ACC002 10000
```

- WITHDRAW ACC002 2000

```sh
node index.js WITHDRAW ACC002 2000
```

- BALANCE ACC002

```sh
node index.js BALANCE ACC002
```

- BALANCE ACC001

```sh
node index.js BALANCE ACC001
```

# Output:

- FVTPL 8000
- KELP 9000

# steps to setup the app

- setup the npm environment

```sh
npm init -y
npm i
```

- intall the express

```sh
npm install express
```

- install the commander

```sh
npm install commander
```

- taken the input from cli
- from the input done some done some opration

### CREATE

- Check name and accountNumber entered by user is available in db.json of not.
- if YES then show "Account Number already Exist" in console.
- if NO then create a New Account.

### DEPOSIT

- Check amount shoud be more than zero and accountNumber entered by user is available in db.json of not.
- if YES then deposit the entered amount.
- if NO then show "The Amount you enter is Wrong!" and "Account No Does Not Exist" respectively

### WITHDRAW

- Check the accountNumber entered by user is available in db.json
- if YES then Check accountBalance is more than enterd amount
- if YES the deduct the amount from the accountBalance.

### BALANCE

- Check name and accountNumber entered by user is available in db.json of not.
- if YES the Show the accountBalance
