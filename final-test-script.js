// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();
newGuess.addEventListener("keyup", checkKey);
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click" , restart);
checkButton.style.visibility = "visible";
restartButton.style.visibility = "hidden";


function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100
 και τον εκχωρεί στη μεταβλητή theGuess */
    theGuess = Math.floor(Math.random() * 100) + 1;
    console.log(theGuess);
}
    
function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>>
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
if (e.key === "Enter"){
    checkGuess();
}
}

function checkGuess(){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
if (isNaN(newGuess.value) || newGuess.value === ""){
  processGuess("error");
} else {
  previousGuesses.push(newGuess.value);
  processGuess(newGuess.value);
}
}

function processGuess(newValue){
 /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */
 message.textContent = "";
 lowHigh.textContent = "";
 if (previousGuesses.length != 0){
  lowHigh.textContent = "Προηγούμενες προσπάθειες: " + previousGuesses.join(" ");
}
console.log(newValue);
 if (newValue === "error"){
  message.textContent = "Δώστε αριθμό";
  message.style.color = getComputedStyle(document.documentElement).getPropertyValue("--msg-text");
  message.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--msg-wrong-color");
  newGuess.value = "";
 } else if (Number(newValue) === Number(theGuess)){
    newGuess.disabled = true;
    newGuess.value = "";
    checkButton.style.visibility = "hidden";
    restartButton.style.visibility = "visible";
    message.textContent = "Μπράβο το βρήκες";
    message.style.color = getComputedStyle(document.documentElement).getPropertyValue("--msg-text");
    message.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--msg-win-color");
    return "win";
  } else if (previousGuesses.length === 10){
    newGuess.disabled = true;
    checkButton.style.visibility = "hidden";
    restartButton.style.visibility = "visible";
    message.textContent = "\nΧάσατε ο σωστος αριθμός ειναι το " + theGuess;
    message.style.color = getComputedStyle(document.documentElement).getPropertyValue("--msg-text");
    message.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--msg-wrong-color");
    return "lost";
  } else if(newGuess.value < theGuess){
    message.textContent = "Λάθος, είσαι πιο χαμηλά";
    message.style.color = getComputedStyle(document.documentElement).getPropertyValue("--msg-text");
    message.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--msg-wrong-color");
    newGuess.value = "";
  } else if (newGuess.value > theGuess){
    message.textContent = "Λάθος, το ξεπέρασες!";	
    message.style.color = getComputedStyle(document.documentElement).getPropertyValue("--msg-text");
    message.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--msg-wrong-color");
    newGuess.value = "";
  }
  console.log(previousGuesses);
 
} 
 

function restart(){
/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο
'restart' και επανεκινεί τη διαδικασία */
previousGuesses = [];
message.textContent = "";
lowHigh.textContent = "";
newGuess.value = "";
newGuess.disabled = false;
checkButton.style.visibility = "visible";
restartButton.style.visibility = "hidden";
newRandom();
}
