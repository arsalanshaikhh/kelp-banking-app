const { Command } = require("commander");
const program = new Command();
const fs = require("fs");

// ***********************************************************
// commander

program
  .argument("<kind>", "user login details")
  .argument("[accountNo]", "Account Number")
  .argument("[name]", "Amount/Name of Bank Account Holder")
  .action(function (kind, accountNo, holderName) {
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    let mainData = JSON.parse(data);

    // ***********************************************************
    // Create Account

    if (kind === "CREATE") {
      let object = {
        accountNumber: accountNo,
        name: holderName,
        accountBalance: 0,
        id: mainData.accountDetails.length + 1,
      };

      let current = mainData.accountDetails.filter((e) => {
        if (e.accountNumber === accountNo || e.name === holderName) {
          return e;
        }
      });
      if (current.length > 0) {
        console.log("Account number already Exist");
        return;
      }
      mainData.accountDetails.push(object);
      let newwData = JSON.stringify(mainData);
      fs.writeFileSync("./db.json", newwData, { encoding: "utf-8" });
      return;
    }

    // ***********************************************************
    // Withraw from Account

    if (kind === "WITHDRAW") {
      holderName = parseInt(holderName);

      let current = mainData.accountDetails
        .filter((e) => {
          if (e.accountNumber === accountNo) {
            return e;
          }
        })
        .map((e) => {
          if (
            e.accountBalance > 0 &&
            !Number.isNaN(holderName) &&
            e.accountBalance >= holderName
          ) {
            return {
              ...e,
              accountBalance: parseInt(e.accountBalance) - holderName,
            };
          } else {
            console.log("Insufficent Balance!");
            return e;
          }
        });

      if (current.length === 0) {
        console.log("There is No Such Account!");
        return;
      } else {
        let updatedData = mainData.accountDetails.map((e) => {
          if (e.id === current[0].id) {
            return (e = current[0]);
          } else {
            return e;
          }
        });
        mainData.accountDetails = updatedData;
        let newwData = JSON.stringify(mainData);
        fs.writeFileSync("./db.json", newwData, { encoding: "utf-8" });
      }
      return;
    }

    // ***********************************************************
    // Deposit in Account

    if (kind === "DEPOSIT") {
      holderName = parseInt(holderName);
      let current = mainData.accountDetails
        .filter((e) => {
          if (e.accountNumber === accountNo) {
            return e;
          }
        })
        .map((e) => {
          if (!Number.isNaN(holderName) && holderName > 0) {
            return {
              ...e,
              accountBalance: parseInt(e.accountBalance) + holderName,
            };
          } else {
            console.log("The Amount you enter is Wrong!");
            return e;
          }
        });

      if (current.length === 0) {
        console.log("Account No Does Not Exist");
        return;
      } else {
        let updatedData = mainData.accountDetails.map((e) => {
          if (e.id === current[0].id) {
            return (e = current[0]);
          } else {
            return e;
          }
        });
        mainData.accountDetails = updatedData;
        let newwData = JSON.stringify(mainData);
        fs.writeFileSync("./db.json", newwData, { encoding: "utf-8" });
      }
      return;
    }

    // ***********************************************************
    // Account Balance

    if (kind === "BALANCE") {
      mainData.accountDetails.filter((e) => {
        if (e.accountNumber === accountNo) {
          console.log(e.name + " " + e.accountBalance);
        }
      });
      return;
    }
  });

program.parse(process.argv);
