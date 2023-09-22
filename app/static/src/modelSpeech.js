import {chatboxAndSpeech} from "./animatedChatBubble.js";
import {live2dModelInit} from "./controlMouthMotion.js";

class ModelSpeech{

    constructor(){
        this.modelClass = new live2dModelInit();
        this.chatbot = new chatboxAndSpeech();
    }

    getLive2dModel(){
        return this.modelClass;
    }

    getChatbot(){
        return this.chatbot;
    }

    async createLive2dModel(){
        await this.modelClass.createModel();
    };
    
    async initSetMouth(sentence){

        // // var mouthParameters = [0,.25,.5,.75,1,.75,.5,.25,0];
        // var mouthParameters = [0,1]
        // var words = sentence.split(" ");
      
        // // for (var i=0;i<words.length;i++){
        // //   mouthParameters.forEach(()=>{
        // //     this.modelClass._setMouthOpenY(parseFloat(mouthParameters[i]));
        // //   });
        // // }
        // mouthParameters.forEach((param)=>{
        //     this.modelClass._setMouthOpenY(parseFloat(param));
        // });
        
        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        const mouthParameters = [0,.1,.3,.4,.3,.2,.1,0];

        const words = sentence.split(" ");

        for (var i=0;i<words.length;i++){
            for (const param of mouthParameters) {
                this.modelClass._setMouthOpenY(parseFloat(param));
                await delay(50); // wait for 50 ms
            }
        }

    };

    async chatAndSpeech(text){

        var splitSentences = this.chatbot.splitTextByCommas(text);
    
        var currentIndex = 0;
    
        const processStringList = (strings, index) => {
          if (index >= strings.length) {
            // 处理完成所有字符串
            return;
          }
        
          const currentString = strings[index];
          
          speakItOut(strings[index]); // 播放语音

          this.initSetMouth(strings[index]); // 设置mouth parameter
    
          this.chatbot.dialogGame(currentString)
            .then(() => {
              // 当前字符串处理完成，递归处理下一个字符串
              processStringList(strings, index + 1);
            })
            .catch(error => {
              // 处理当前字符串时出错
              console.error(`Error processing string: ${currentString}`, error);
            });
        }
    
        processStringList(splitSentences,currentIndex);
    
        // var box = document.getElementById("content"); 
        // if (this.finished){
        //   this.dialogGame()
        // }
    
        // // 点击事件处理函数
        // // 回调嵌套函数，把对象自己传进去
        // function handleClick(object) {
        //   if (object.flag){
        //   currentIndex++; // 增加索引位置
    
        //   // 检查索引是否超出字符串列表的范围
        //   if (currentIndex >= splitSentences.length) {
        //     currentIndex = 0; // 如果超出范围，则回到列表的开头
        //   }
    
        //   object.dialogGame(splitSentences[currentIndex])
        //   }
        // }
    
        // this.dialogGame(splitSentences[currentIndex])
        
        // // 绑定点击事件
        // box.addEventListener("click", handleClick(this));
        return true;
      }

}
export {ModelSpeech};