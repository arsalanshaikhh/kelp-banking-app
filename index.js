const { Command } = require("commander");

const program = new Command();
const fs = require("fs");

program
  .argument("<type>", "user login details")
  .argument("[accctno]", "Account Number")
  .argument("[name]", "Amount/Name of Bank Account Holder")
  .action(function (type, acctno, optional) {
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    let parseddata = JSON.parse(data);

    // ***********************************************************

    if (type === "CREATE") {
      let info = {
        account_no: acctno,
        name: optional,
        balance: 0,
        id: parseddata.accountDetails.length + 1,
      };

      let present = parseddata.accountDetails.filter((e) => {
        if (e.account_no === acctno || e.name === optional) {
          return e;
        }
      });
      if (present.length > 0) {
        console.log(
          "Account number already in database enter another account number and name"
        );
        return;
      }
      parseddata.accountDetails.push(info);
      let newdata = JSON.stringify(parseddata);
      fs.writeFileSync("./db.json", newdata, { encoding: "utf-8" });
      return;
    }

    // ***********************************************************

    if (type === "WITHDRAW") {
      optional = Number(optional);

      let present = parseddata.accountDetails
        .filter((e) => {
          if (e.account_no === acctno) {
            return e;
          }
        })
        .map((e) => {
          if (
            e.balance > 0 &&
            !Number.isNaN(optional) &&
            e.balance >= optional
          ) {
            return { ...e, balance: Number(e.balance) - optional };
          } else {
            console.log("Insufficent balance/Something went Wrong!");
            return e;
          }
        });

      if (present.length === 0) {
        console.log("Account NO Does Not Exist!");
        return;
      } else {
        let updatedata = parseddata.accountDetails.map((e) => {
          if (e.id === present[0].id) {
            return (e = present[0]);
          } else {
            return e;
          }
        });
        parseddata.accountDetails = updatedata;
        let newdata = JSON.stringify(parseddata);
        fs.writeFileSync("./db.json", newdata, { encoding: "utf-8" });
      }
      return;
    }

    // ***********************************************************

    if (type === "DEPOSIT") {
      optional = Number(optional);
      let present = parseddata.accountDetails
        .filter((e) => {
          if (e.account_no === acctno) {
            return e;
          }
        })
        .map((e) => {
          if (!Number.isNaN(optional) && optional > 0) {
            return { ...e, balance: Number(e.balance) + optional };
          } else {
            console.log(
              "The Amount you enter is not proper format plz check!/Not an Number"
            );
            return e;
          }
        });

      if (present.length === 0) {
        console.log("Account No Does Not Exist");
        return;
      } else {
        let updatedata = parseddata.accountDetails.map((e) => {
          if (e.id === present[0].id) {
            return (e = present[0]);
          } else {
            return e;
          }
        });
        parseddata.accountDetails = updatedata;
        let newdata = JSON.stringify(parseddata);
        fs.writeFileSync("./db.json", newdata, { encoding: "utf-8" });
      }
      return;
    }

    // ***********************************************************

    if (type === "BALANCE") {
      parseddata.filter((e) => {
        if (e.account_no === acctno) {
          console.log(e.name + " " + e.balance);
        }
      });
      return;
    }
  });

program.parse(process.argv);
