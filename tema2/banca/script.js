// Constructor function pentru contul bancar
function ContBancar(numarCont, id, sold, numeDetinator) {
    this.numarCont = numarCont;
    this.id = id;
    this.sold = sold;
    this.numeDetinator = numeDetinator;
}

// Adăugăm metoda de achitare a unei sume din cont prin prototype
ContBancar.prototype.achita = function(suma) {
    if (this.sold >= suma) {
        this.sold -= suma;
        console.log(`Suma de ${suma} a fost achitată din contul ${this.numarCont}. Sold curent: ${this.sold}`);
    } else {
        console.log(`Fonduri insuficiente în contul ${this.numarCont}.`);
    }
};

// Clasa Banca
class Banca {
    constructor(nume, codSWIFT, taraOrigine) {
        this.nume = nume;
        this.codSWIFT = codSWIFT;
        this.taraOrigine = taraOrigine;
        this.conturiDeschise = [];
    }

    // Metodă pentru crearea unui cont bancar
    creazaCont(numarCont, id, sold, numeDetinator) {
        const contNou = new ContBancar(numarCont, id, sold, numeDetinator);
        this.conturiDeschise.push(contNou);
    }

    // Metodă pentru afișarea conturilor deschise
    afiseazaConturi() {
        console.log(`Conturi deschise la banca ${this.nume}:`);
        this.conturiDeschise.forEach(cont => {
            console.log(`Cont nr. ${cont.numarCont} | Detinator: ${cont.numeDetinator} | Sold: ${cont.sold}`);
        });
    }

    // Metodă pentru afișarea conturilor cu sold negativ
    afiseazaConturiSoldNegativ() {
        console.log(`Conturi cu sold negativ la banca ${this.nume}:`);
        this.conturiDeschise.filter(cont => cont.sold < 0).forEach(cont => {
            console.log(`Cont nr. ${cont.numarCont} | Detinator: ${cont.numeDetinator} | Sold: ${cont.sold}`);
        });
    }
}

// Exemplu de utilizare
const banca = new Banca('Diletanțiilor', 'SWIFT123', 'Republic of Kekistan');

// Creăm conturi bancare
banca.creazaCont('RO123456789', 'ID001', 1000, 'Maria Brusli');
banca.creazaCont('RO987654321', 'ID002', -50, 'Vasile Supermen');
banca.creazaCont('RO112233445', 'ID003', 200, 'Ionuț Inoxidabilul');

// Afișăm conturile deschise
banca.afiseazaConturi();

// Afișăm conturile cu sold negativ
banca.afiseazaConturiSoldNegativ();

// Realizăm o plată dintr-un cont
banca.conturiDeschise[0].achita(200);  // Maria Brusli achită 200
banca.conturiDeschise[1].achita(100);  // Vasile Supermen încearcă să plătească 100