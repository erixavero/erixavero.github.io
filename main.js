class TypeWriter{
  constructor(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIdx = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.backspacing = false;
  }

  type(){
    //current word index
    const current = this.wordIdx % this.words.length;
    //full word
    const word = this.words[current];

    //wait time until next action lower is faster
    let typespeed = 200;

    //check state
    if (this.backspacing) {
      typespeed /= 2; //erase faster
      //erase char
      this.txt = word.substring(0, this.txt.length - 1);
    } else {
      //write char
      this.txt = word.substring(0, this.txt.length + 1);
    }

    //place text in html span
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //check if typing done
    if (!this.backspacing && this.txt === word) {
      //wait abit
      typespeed = this.wait;
      //start backspacing
      this.backspacing = true;
    } else if (this.backspacing && this.txt === "") {
      //write next word
      this.backspacing = false;
      this.wordIdx += 1;
      //set slight pause
      typespeed = 400;
    }

    //wait abit
    setTimeout(() => this.type(), typespeed);
  }
}

// init DOM
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}