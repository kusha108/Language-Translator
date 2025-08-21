var selectTag = document.querySelectorAll("select");
let translate = document.querySelector("button");
let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let exchange = document.querySelector(".exchange");
let icon = document.querySelectorAll(".row i");

const copyContent = (content) => {
    navigator.clipboard.writeText(content).then( () =>{
       alert("Copied!!!"); 
    }).catch( err => {
        alert("Coping failed!!!");
    })
}

const utter = (text,language) =>{
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang =language;
    synth.speak(utterThis);
}

exchange.addEventListener("click", () => {
    let temp = fromText.value;
    fromText.value = toText.value;
    toText.value = temp;

    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})

selectTag.forEach((tag, id) => {
    for(let language in languages){
        let selected = id==0 ? language=="en-GB" ? "selected" : "" : language=="hi-IN" ? "selected" : "";
        let option =  `<option ${selected} value="${language}">${languages[language]}</option>`
        tag.insertAdjacentHTML("beforeend", option);
    }
})

translate.addEventListener("click", () =>{
    let fromlanguage = selectTag[0].value;
    let tolanguage = selectTag[1].value;
    let text = fromText.value;
    if(text == ""){
        toText.value = "";
        toText.setAttribute("placeholder", "");
        return ;
    }
    toText.setAttribute("placeholder", "Translating...")
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromlanguage}|${tolanguage}`;
    fetch(url).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    })
})

icon.forEach(icon =>{
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return ;
        if(target.classList.contains("fa-copy")){
            if(target.id == "from") {
                copyContent(fromText.value);
            }else{
                copyContent(toText.value);
            }
        }else{
            if(target.id =="to"){
                utter(toText.value, selectTag[1].value);
            }else{
                utter(fromText.value, selectTag[0].value);
            }
        }
    })
})