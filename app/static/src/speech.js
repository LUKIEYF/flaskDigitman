function speakItOut(text) {

    // const synth = window.speechSynthesis;
    // const voices = synth.getVoices();
    
    // let curVoices = voices.find((item) => item.name.includes("Xiaoyi"));
    // window.speechSynthesis.onvoiceschanged = () => {
    //   // 找到xiaoyi的声音
    //   curVoices = window.speechSynthesis
    //     .getVoices()
    //     .find((item) => item.name.toLocaleLowerCase().includes("xiaoyi"));
    // };

    const ssu = new SpeechSynthesisUtterance();

    // if (this.curVoices) {
    //     ssu.voice = curVoices;
    // }
    ssu.text = text
    ssu.lang = '"en-US';
    ssu.rate = 0.8;
    speechSynthesis.speak(ssu);
}
