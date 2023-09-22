class chatboxAndSpeech{

  constructor(){
    this.flag=false;
    this.finished = false;
  };

  // context split by commas
  // splitTextByCommas(text) {
  //   var sentences = text.split(/(?<![0-9])[。.!?](?![0-9])|(?<![0-9])[。.!?](?=[0-9])|(?<=[0-9])[。.!?](?![0-9])/);
  //   if (sentences[sentences.length - 1] === "") {
  //     sentences.pop();
  //   }
  //   console.log(sentences);
  //   return sentences;
  // }
  splitTextByCommas(text) {
    var regex = /(?<![0-9])[。.!?](?![0-9])|(?<![0-9])[。.!?](?=[0-9])|(?<=[0-9])[。.!?](?![0-9])/;
    var sentences = text.split(regex);
    var result = [];
  
    for (var i = 0; i < sentences.length; i++) {
      var current = sentences[i].trim();
      var next = sentences[i + 1] ? sentences[i + 1].trim() : "";
  
      if (current !== "") {
        if (regex.test(current) && next !== "") {
          result.push(current + sentences[i + 1]);
          i++;
        } else {
          result.push(current);
        }
      }
    }
  
    console.log(result);
    return result;
  }

  dialogGame(text, timeInterval = 60) {
    return new Promise((resolve, reject) => {
      var targetedDiv = "content";
      var box = document.getElementById(targetedDiv);
      var len = text.length;
      var timer = null;
      var index = 0;
      var character = '';
      var pauseDuration = 3000;
  
      const start = () => {
        box.innerHTML = '';
        timer = setInterval(function() {
          if (box.scrollHeight > box.clientHeight) {
            character = text.charAt(index - 1);
            clearInterval(timer);
            reject(new Error('Content overflowed the box.'));
            return;
          }
  
          if (index === len) {
            clearInterval(timer);
            // resolve();
            setTimeout(() => {
              resolve();
            }, pauseDuration);
            return;
          }
  
          var nextChar = character ? character : text.charAt(index);
          box.innerHTML += nextChar;
  
          if (character) {
            character = '';
          } else {
            index++;
          }

        }, timeInterval);
      };
      
      start();

    });
  }


}

export {chatboxAndSpeech};

