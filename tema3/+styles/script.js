function fetchBanks() {
  fetch("https://random-data-api.com/api/v2/banks?size=10")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#banksTable tbody");
      tableBody.innerHTML = "";
      data.forEach((bank) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${bank.bank_name}</td>
                    <td>${bank.swift_bic}</td>
                    <td>${bank.iban}</td>
                    <td>${bank.account_number || "N/A"}</td>
                `;
        tableBody.appendChild(row);
      });
    });
}
