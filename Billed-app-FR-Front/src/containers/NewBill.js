import { ROUTES_PATH } from "../constants/routes.js";
import Logout from "./Logout.js";

export default class NewBill {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document;
    this.onNavigate = onNavigate;
    this.store = store;
    const formNewBill = this.document.querySelector(
      `form[data-testid="form-new-bill"]`
    );
    formNewBill.addEventListener("submit", this.handleSubmit);
    const file = this.document.querySelector(`input[data-testid="file"]`);
    file.addEventListener("change", this.handleChangeFile);
    this.fileUrl = null;
    this.fileName = null;
    this.billId = null;
    new Logout({ document, localStorage, onNavigate });
    this.type = "";
  }
  handleChangeFile = (e) => {
    e.preventDefault();

    const file = this.document.querySelector(`input[data-testid="file"]`)
      .files[0];
    const filePath = e.target.value.split(/\\/g);
    const fileName = filePath[filePath.length - 1];

    // *** DEBUG ***
    // *** vérification du type MIME du fichier ***

    // *** L'interface TextDecoder représente un décodeur pour un encodage de texte spécifique, tel que UTF-8, ISO-8859-2, KOI8-R, GBK, etc. Un décodeur prend un flux d'octets en entrée et émet un flux de points de code. ***
      
    //*** Ajout code ***

    let fileReader = new FileReader();
    //*** Ajout test ***
    // *** pour faire passer les tests ***
    let that = this

    fileReader.onloadend = function (e) {
      //*** résultat binaire ***
      //*** ArrayBuffer est l’objet central, le centre de tout, les données binaires brutes "byte". 1 UNICODE = 1 GRAPHEME ***
      console.log(e.target.result);

      //*** ici on traite le buffer en une séquence d'entiers de 8 bits, creation d'un sous tableau de 4 element correpondant au MIME. ***
      let arr = new Uint8Array(e.target.result).subarray(0, 4);
      console.log(arr);
      let header = "";
      let type;

      //*** binary vers hex (16) , les 4 premier represente l'extention ***
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
        console.log(header);
      }
      switch (header) {
        //*** hex vers text avec le switch ***
        case "89504e47":
          type = "image/png";
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          type = "image/jpeg";
          break;
        default:
          type = "unknown";
          break;
      }

      if (type != "image/jpeg" && type != "image/png") {
        document.querySelector(`input[data-testid="file"]`).value = "";
        alert("invalid Image");

        console.log(type);
        that.type = type;

      } else {
        that.type = type;
        console.log(that.type);
      }
    };

    fileReader.readAsArrayBuffer(file);

    //*** Fin ajout code ***

    const formData = new FormData();
    const email = JSON.parse(localStorage.getItem("user")).email;
    formData.append("file", file);
    formData.append("email", email);

    this.store
      .bills()
      .create({
        data: formData,
        headers: {
          noContentType: true,
        },
      })
      .then(({ fileUrl, key }) => {
        // console.log(fileUrl)
        this.billId = key;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
      })
      .catch((error) => console.error(error));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('e.target.querySelector(`input[data-testid="datepicker"]`).value', e.target.querySelector(`input[data-testid="datepicker"]`).value)
    const email = JSON.parse(localStorage.getItem("user")).email;
    const bill = {
      email,
      type: e.target.querySelector(`select[data-testid="expense-type"]`).value,
      name: e.target.querySelector(`input[data-testid="expense-name"]`).value,
      amount: parseInt(
        e.target.querySelector(`input[data-testid="amount"]`).value
      ),
      date: e.target.querySelector(`input[data-testid="datepicker"]`).value,
      date_number: e.target.querySelector(`input[data-testid="datepicker"]`)
        .value,
      vat: e.target.querySelector(`input[data-testid="vat"]`).value,
      pct:
        parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) ||
        20,
      commentary: e.target.querySelector(`textarea[data-testid="commentary"]`)
        .value,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      status: "pending",
    };
    this.updateBill(bill);
    this.onNavigate(ROUTES_PATH["Bills"]);
  };

  // not need to cover this function by tests
  updateBill = (bill) => {
    if (this.store) {
      this.store
        .bills()
        .update({ data: JSON.stringify(bill), selector: this.billId })
        .then(() => {
          this.onNavigate(ROUTES_PATH["Bills"]);
        })
        .catch((error) => console.error(error));
    }
  };
}