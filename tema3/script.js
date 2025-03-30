fetch("https://random-data-api.com/api/v2/banks?size=10")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((bank) => {
      console.log(`Bank name: ${bank.bank_name}`);
      console.log(`SWIFT: ${bank.swift_bic}`);
      console.log(`IBAN: ${bank.iban}`);
      console.log(`Account: ${bank.account_number}`);
      console.log("-------------------------------------------------------");
    });
  });
