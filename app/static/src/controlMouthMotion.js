const cubism4Model = "../static/resource/Mark/Mark.model3.json";

class live2dModelInit{

  constructor () {
    this.app = new PIXI.Application({
      view: document.getElementById("live2d"),
      autoStart: true,
      resizeTo: false,
      backgroundColor: 0x00000000,
      antialias: true,    // default: false 反锯齿
      transparent: true, // default: false 透明度
      resolution: 1 ,      // default: 1 分辨率
      backgroundAlpha: 0,   // 设置背景颜色透明度   0是透明
      //因为WebGL非常快，所以Pixi的renderer对象将默认为WebGL。如果您想使用canvas绘图API，可以将forceCanvas选项设置为true
      forceCanvas: false
    });
  }

  async createModel(){
    
    this.model = await PIXI.live2d.Live2DModel.from(cubism4Model);
    
    this.app.stage.addChild(this.model);

    this.model.scale.set(0.25);

    // cal center position 计算居中位置
    const renderer = this.app.renderer;
    const centerX = renderer.width / 2;
    const centerY = renderer.height / 2;

    this.model.x = centerX - this.model.width / 2;
    this.model.y = centerY - this.model.height / 2;

    // dragable 可拖动
    this.draggable();

    // // blur 掩盖层去定位
    // this.addFrame();

    //test for mouth button
    // this.testMouthOpen();

    // 获取默认动作组名称
    var defaultMotionGroup = this.model.defaultMotionGroup;
    console.log("motion group: " + defaultMotionGroup);

  }

  // 设置嘴型 setting mouth
  _setMouthOpenY = (v)=>{
    v = Math.max(0,Math.min(1,v));
    this.model.internalModel.coreModel.setParameterValueById('ParamMouthOpenY',v);
  }

  // add foreground for adjustment 前景for 调试位置
  // addFrame(model);

  addFrame(){
    const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE);
    foreground.width = model.internalModel.width;
    foreground.height = model.internalModel.height;
    foreground.alpha = 0.2;
  
    this.model.addChild(foreground);
  
    checkbox("Model Frames", (checked) => (foreground.visible = checked));
  };
  
  draggable() {
    this.model.buttonMode = true;
    this.model.on("pointerdown", (e) => {
      this.model.dragging = true;
      this.model._pointerX = e.data.global.x - this.model.x;
      this.model._pointerY = e.data.global.y - this.model.y;
    });
    this.model.on("pointermove", (e) => {
      if (this.model.dragging) {
        this.model.position.x = e.data.global.x - this.model._pointerX;
        this.model.position.y = e.data.global.y - this.model._pointerY;
      }
    });
    this.model.on("pointerupoutside", () => (this.model.dragging = false));
    this.model.on("pointerup", () => (this.model.dragging = false));
  };

  testMouthOpen(){
    // create the first bt
    var button1 = document.createElement("button");
    button1.id = "mbtn";
    button1.textContent = "b1";

    // create the second bt
    var button2 = document.createElement("button");
    button2.id = "mbtn2";
    button2.textContent = "b2";

    // bt to append into child
    var container = document.getElementById("bt-test"); // 假设有一个id为"container"的容器元素
    container.appendChild(button1);
    container.appendChild(button2);

    document.getElementById("mbtn").onclick = () =>{
      this._setMouthOpenY(1)
      console.log("open your mouth!")
    }

    document.getElementById("mbtn2").onclick = () =>{
      this._setMouthOpenY(0)
    }
  };

  getModel(){
    return this.model;
  };

}

export {live2dModelInit};


