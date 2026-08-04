const input = document.getElementById("command");
const chatBox = document.getElementById("chat-box");

function addMessage(sender, message){

    let div = document.createElement("div");

    div.className = sender;

    div.innerHTML = "<strong>" +
        (sender==="user" ? "You" : "Assistant")
        + ":</strong> " + message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendCommand(){

    let command = input.value.trim();

    if(command===""){
        return;
    }

    addMessage("user",command);

    fetch("/command",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            command:command
        })

    })

    .then(response=>response.json())

    .then(data=>{

        addMessage("assistant",data.response);

        speak(data.response);

    })

    .catch(()=>{

        addMessage("assistant","Server Error.");

    });

    input.value="";
}

function speak(text){

    let speech = new SpeechSynthesisUtterance();

    speech.text = text;

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

}

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        sendCommand();

    }

});

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition = new SpeechRecognition();

    recognition.lang="en-US";

    recognition.continuous=false;

    recognition.interimResults=false;

    document.getElementById("mic").onclick=function(){

        recognition.start();

    }

    recognition.onresult=function(event){

        let text=event.results[0][0].transcript;

        input.value=text;

        sendCommand();

    }

}
else{

    document.getElementById("mic").disabled=true;

}
