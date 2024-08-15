// 1.slider ko change karne slider range badalegi 
// >isme password ki length 10 hai by default and slider ko aage karne par password ki length increase kar jati hai and piche karne par decrease kar jati hai
// >slider ko aage-piche karne se UI upadate ho rha hai
// > sabse pehle jo jo bhi elements hai jihne change karna hai vo sabhi fetch karke lane honge
//querySelector method element ko fetch karne ke liye use hota hai iska syntax-document.querySelector('class_name'/'tage_name'/'Id_name'/'custom attribute')

const inputSlider=document.querySelector("[data-lengthSlider]");//[] ka use isliye kiya kyoki ye syntax hai
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");//isse vo sare element aayenge input type=checkbox hai

let password="";//starting me paasword empty hai
let passwordLength=10;//starting me password ki length 10 hai
let checkCount=0;//Starting me ek checkbox count huaa pda hai
//sate strength circle color to grey(Starting me circle ka color grey huaa pda hai)
setIndicator("#ccc");//Iska function niche bna hai vo dekhe fir ise samajhe
//function:-

//1.copy ho rha hai=copyContent()
//2.slider ko handle karna usse kya impact padega usko handle karna=handleSlider()
//3.generate password me=generatePassword()
//4.Strength ke circle me color set ho rha hai=setIndicator()  (ye color change karta hai uske sath "shadow" bhi lata hai)
//5.password random ban rha hai to random paaword ke liye function bnao jisse mujhe random integer mile =getRandomInteger(min,max); min max ke bich ka number generate kiya ja sakta hai ,getRandomUppercase(),getRandomLowercase(),getRandomNumber(),getRandomSymbols()
//6.circle me red for weak pass,green for strong pass, iske liye function=calcStrength()

//set passwordLength
function handleSlider(){
    inputSlider.value=passwordLength;//starting me slider 10 par aa jayega
    lengthDisplay.innerText=passwordLength;//Starting me password length 10 aayegi
    //or kuch bhi karna hai-HW
    //Thumb ko ghumane par kitna background bhara hona chahiye aur kitna nhi:-
    const min=inputSlider.min;
    const max=inputSlider.max;
   inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}
handleSlider();
//Strength ko show karne ke liye color set karna and shadow set karna
function setIndicator(color){
   indicator.style.backgroundColor=color;
   //shadow homework
   indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//for getting random Integer
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;//Math.random() se ans 0 se 1 ke bich random no. generate karta tha isme (max-min) multiply karne se ans 0 se max-min ke bich aayega jisme 0 include and (max-min) exclude hoga
    //Math.random()*(max-min) possibility hai ki vo ek floating number ho isliye ise Math.floor kar diya round of karne ke liye jisse hume ek integer value milegi
    //+min range ko 0 se max-min se change karke min se max kar dega (0+min=min ans max-min+min=max so ans=min to max)
    //Math.random()-> 0 se 1 ke bich me number deta hai jisme 0 include hota hai and 1 exclude hota hai
    //Math.random()=>[0,1)
}

//for getting random Number
function generateRandomNumber(){
    return getRndInteger(0,9);
}

//for getting random lowercase character
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));//122='z' and here 123 exclude// String.fromCharCode(Ascii value) ye hume character dega ascii value vala
}

//for getting random uppercase character
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));// String.fromCharCode(Ascii value) ye hume character dega ascii value vala
    //String.fromCharCode(Random asscii value)-ye hume character dega according to asscii value
}

//for getting symbols
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;//charo checkbox ki value ko starting me false man liya 
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    // kisi bhi checkbox ko app check kar dete ho aur usko verify karna chahte ho ki vo checked hai ya nhi to .checked property ka use karte hai

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
}

// API 2 software component ke bich communication medium hota hai

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        // clipboard par likhne ke liye writeText vala method available hai It means clipboard par ek tarah se hum copy kar he hai and writeText vala method promise return karta hai
        //navigator.clipboard.writeText(passwordDisplay.value) method ka use karke hum clipboard par koi bhi chij copy kar sakte hai
        //navigator.clipboard.writeText(passwordDisplay.value) vala method promise return karta hai
        //Promise ki 2 value hoti hai ya to ye resolve hoga ya ye reject hoga
        //await keyword lagane se jab tak promise resolve nhi ho jata tab tak wait karunga uske bad hi aage vala code print karunga
        //Jab promise resolve hoga tabhi manenge ki chije aapne clipbord se successfully copy kar li hai
       // navigator.clipboard.writeText(passwordDisplay.value);  ek async operation hai aur me chahta hu jab tak ye complete na ho me aage nhi badunga so mene "await" keyword use kiya
        //possibility ye bhi hai ki error aa jaye or na bhi aaye

        //await tabhi kam karta hai jab async function ke andar ise likhte hai

        copyMsg.innerText = "copied";//jese hi promise resolve hoga span tag ke andar "copied" text aa jayega
        //copied vala text aayega or kuch time bad chala jayega It means copied text par time-out lga huaa hai
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);//2000 means 2 second
}

//ye eventListener slider ko change karne par passwrdLenght ko bhi change karega and slider ko bhi
inputSlider.addEventListener('input', function(event){//function htake (e)=> bhi likh sakte hai
    passwordLength = event.target.value;//e.target slider ki value ko show karta hai//e.target.value slider ke current value ko darshati hai
    // The target property returns the element where the event occured.
    handleSlider();
})

//Agar passwordDisplay empty ho to copy na ho
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)//(passwordDisplay.value ek nonempty(sahi value) hai to copyContent() vala function chalega.  *We can also write password.length>0 then copy hoga otherwise copy nhi hoga, aage humne password=""; likha hai 
    //Agar input vala tag nonempty hai to copyContent() fuction run hoga 8
        copyContent();
})

function handleCheckBoxChange() {
        checkCount = 0;
        allCheckBox.forEach( (checkbox) => {
            if(checkbox.checked)
                checkCount++;
        });
    
        //special condition
        if(passwordLength < checkCount ) {
            passwordLength = checkCount;
            handleSlider();
        }
    }
    
    //allCheckBox ek variable upper bnaya hai jinka input[type=checkbox]  hai 
    allCheckBox.forEach( (checkbox) => {//function(checkbox){} me function ko htake arrow lgaya 
        checkbox.addEventListener('change', handleCheckBoxChange);//ticked/unticked ko change mana jayega
    })

generateBtn.addEventListener('click',()=>{
   //Agar koi bhi checkbox checked nhi hai to password generate nhi hoga so iske liye checkCount(jiski value uper 1 di hai) ki need padegi par checkCount to update nhi hoga aur bhi checked karne pa iska matlab hai mujhe checkBox par bhi eventListener lagana hoga
   //Atleast one checkBox should bhi checked to generate a password 
   //Mujhe ek count bnana padega jo btayega kitne checkBox checked hai iske liye mujhe checkBoxes par eventListener lgana hoga
   //Hume checkBoxes par eventListener lgana hai taki hum track kar paye kitne checkBox ticked hai or kitne nhi

   //none of the checkbox are selected

    if(checkCount <= 0) 
        return;

    if(passwordLength < checkCount) {//suppose 4 chechbox checked hai to minimum 4 length ka password bnega lekin passwordLength 4 se kam hai to ise update karna padega aur checkCount ke equal karna padega
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    //console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff(jo-jo bhi check kiya hai usko dalna hai password me to) mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();//() means function call kardi hai
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //Password ready hai par isme hume pta hai ki phla letter uppercase,dusra lowercase,tishra numbers and chotha symbols hai lekin hum chahte hai ki humara password random ho to iske liye jo password bna hai usko shuffle karna hoga 
    //shuffle the password
    password = shufflePassword(Array.from(password));//Code niche likha hai ,uper bhi likh sakte hai
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();

});

function shufflePassword(array) {
    //Fisher Yates Method:This algorithm is used for suffle the arrays
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

