// ================ CALLBACK FUNCTION ========
console.log("Jack Ma maslahatlari");
const list = [
  "yahshi talaba bo'ling", // 0-20
  "togri boshliq tanlang va ko'proq hato qiling", // 20-30
  "o'zingizga ishlashni boshlang", // 30-40
  "yoshlarga investitsiya qiling", // 40-50
  "endi dam oling, natijangizdan rohatlaning", //60
];
function maslahatBering(a, callback) {
  if (typeof a !== "number") callback("insert a number", null);
  else if (a <= 20) callback(null, list[0]);
  else if (a > 20 && a <= 30) callback(null, list[1]);
  else if (a > 30 && a <= 40) callback(null, list[2]);
  else if (a > 40 && a <= 50) callback(null, list[3]);
  else if (a > 50 && a <= 60) callback(null, list[4]);
  else {
    callback(null, list[5]);
  }
}

maslahatBering(10, (err, data) => {
  if (err) console.log("ERROR:", err);
  console.log("javob:", data);
});
//===============================================

//================ Asynchronous functionlarni qo'llash

console.log("Jack Ma maslahatlari");
const list1 = [
  "yahshi talaba bo'ling", // 0-20
  "togri boshliq tanlang va ko'proq hato qiling", // 20-30
  "o'zingizga ishlashni boshlang", // 30-40
  "yoshlarga investitsiya qiling", // 40-50
  "endi dam oling, natijangizdan rohatlaning", //60
];

/*define*/
async function maslahatBeri(a) {
  if (typeof a !== "number") throw new Error("insert a number");
  else if (a <= 20) return list1[0];
  else if (a > 20 && a <= 30) return list1[1];
  else if (a > 30 && a <= 40) return list1[2];
  else if (a > 40 && a <= 50) return list1[3];
  else if (a > 50 && a <= 60) return list1[4];
  else {
    // =============== async functionda setTimeout ishlamaydi
    // setTimeout(function () {
    //   return list1[5];
    // }, 5000);
    //==============================================
    // lekin PROMISE ni ichida setTimeout ishlaydi
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list1[4]);
      }, 5000);
    });
  }
}
/*call*/
// then va catch ichma ich yozish kerak
// console.log("passed here 0");
// maslahatBeri(25)
//   .then((data) => {
//     console.log("javob:", data);
//   })
//   .catch((err) => {
//     console.log("ERROR:", err);
//   });
// console.log("passed here 1");

//====================================================================
//asyn va await bu qisqa chaqirish

async function run() {
  let javob = await maslahatBeri(25);
  console.log(javob);
  javob = await maslahatBeri(65);
  console.log(javob);
  javob = await maslahatBeri(41);
  console.log(javob);
}

run();

//================================================================ MITASK-b ===================================================
console.log("======================MITASK-B======================");
function countDigits(text, callback) {
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "0" && text[i] <= "9") {
      count++;
    }
  }

  callback(count);
}

// Test
countDigits("ad2a54y79wet0sfgb9", (result) => {
  console.log(result); // 7
});
//================================================================= MITASK-A ==================================================
console.log("======================MITASK-A======================");
/* 3ta paramentr bor (lette, text .calllback)*/
//letter - harf, text - matn, callback - natijani qaytaruvchi funksiya
function countLetter(letter, text, callback) {
  setTimeout(() => {
    /*litter stringmi yoki text stringmi*/
    if (typeof letter !== "string" || typeof text !== "string") {
      callback("Parametrlar string bo'lishi kerak", null);
    } else {
      let count = 0;
      for (let char of text) {
        if (char === letter) count++;
      }
      callback(null, count);
    }
  }, 1000);
}

// Test
/*"e" ichida nechta E borligini xisoblaydi*/
countLetter("e", "engineer", (err, data) => {
  if (err) console.log("ERROR:", err);
  else console.log("javob:", data); // 3
});
//================= CRUD===========
/*CREATE  READ   UPDATE   DELETE*/

//================================================================= MITASK-c ==================================================

console.log("======================MITASK-C======================");
class Shop {
  constructor(non, fanta, cola) {
    this.non = non;
    this.fanta = fanta;
    this.cola = cola;
  }
  getTime() {
    const yangi = new Date();
    let hour = String(yangi.getHours()).padStart(2, "0");
    let minute = String(yangi.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;
  }
  qoldik() {
    console.log(
      `hozir ${this.getTime()} da ${this.non} ta non ${this.fanta} ta fanta va ${this.cola} mavjut`,
    );
  }
  sotish(maxsulot, soni) {
    if (this[maxsulot] >= soni) {
      this[maxsulot] -= soni;

      console.log(`${this.getTime()} da ${soni} ta ${maxsulot} sotildi`);
    } else {
      console.log(`${maxsulot} yetarlik emas`);
    }
  }
  qabul(maxsulot, soni) {
    this[maxsulot] += soni;

    console.log(`${this.getTime()} da ${soni} ta ${maxsulot} qabul qilindi`);
  }
}
const shop = new Shop(4, 5, 2);
shop.qoldik();
shop.sotish("non", 3);
shop.qabul("cola", 4);
shop.qoldik();


//================================================================= MITASK-D ==================================================
console.log("======================MITASK-D======================");
function checkContent(str1, str2) {
  if (str1.length !== str2.length) return false;

  
  let count1 = {};
  let count2 = {};

  for (let ch of str1) {
    count1[ch] = (count1[ch] || 0) + 1;
  }

  for (let ch of str2) {
    count2[ch] = (count2[ch] || 0) + 1;
  }

  //  solishtirish
  for (let key in count1) {
    if (count1[key] !== count2[key]) {
      return false;
    }
  }

  return true;
}

console.log(checkContent("mitgroup", "gmtiprou")); // true
console.log(checkContent("hello", "olelh"));       // true
console.log(checkContent("abc", "abd"));           // false

//================================================================= MITASK-D ==================================================
console.log("======================MITASK-E======================");


function getReverse(b) {
  if (typeof b !== "string") {
    return "error";

    // return err
  } else {
    return b.split("").reverse().join("");
  }
}

console.log(getReverse("alisher"));
console.log(getReverse("mitgroup"));