// создать canvas height переменную
      // this.imagesOptions = [
      //    {
      //       image: "images/map/map.jpg",
      //       x: 0, 
      //       y:0,
      //       width: 1600,
      //       height: 1200, 
      //       sx: 0,
      //       sy: 0,
      //       swidth: 0,
      //       sheight: 0
      //    },
      //    {
      //       image: "images/map/map__menu.png",
      //       x: 0, 
      //       y: 1092,
      //       width: 1600,
      //       height: 110,
      //       sx: 0,
      //       sy: 0,
      //       swidth: 0,
      //       sheight: 0
      //    },
      //    {
      //       image: "images/map/button_3.png",
      //       x: 16, 
      //       y: 1114,
      //       width: 148,
      //       height: 62, 
      //       sx: 2,
      //       sy: 2,
      //       swidth: 75,
      //       sheight: 37
      //    },
      //    {
      //       image: "images/map/button_3.png",
      //       x: 1456, 
      //       y: 1114,
      //       width: 134,
      //       height: 62, 
      //       sx: 2,
      //       sy: 2,
      //       swidth: 75,
      //       sheight: 37
      //    }, 
      //    {
      //       image: "images/map/new__level.png",
      //       x: 590, 
      //       y: 958,
      //       width: 54,
      //       height: 54, 
      //       sx: 11,
      //       sy: 164,
      //       swidth: 54,
      //       sheight: 54
      //    }, 
      // ];   

      // const canvasContainer = new Control(this.node, "div", "canvas__container", "");
      // const canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");
      // this.createCanvas(canvas.node);       



   // const shopBtn = new Control(this.node, "button", "", "Магазин");

      // shopBtn.node.onclick = () => {
      //    this.onSelectShop();
      // };

      // const levelList = [1,2,3,4,5];
      // const levelButtons = levelList.map( item => {
      //    const button = new Control(this.node, "button", "", `Уровень ${item.toString()}`);
      //    button.node.onclick = () => {
      //       this.startLevel(item);
      //    };
      // });

      // const mainBackBtn = new Control(this.node, "button", "", "Меню");
      // mainBackBtn.node.onclick = () => {
      //    this.onBack();
      // };

      // private createCanvas(canvas: HTMLCanvasElement) {
     

   //    canvas.addEventListener("click", (e) => {
   //       this.canvasEvents(e, canvas);
   //    });

   //    canvas.width = 1600;
   //    canvas.height = 1200;
   //    const context = <CanvasRenderingContext2D>canvas.getContext("2d");

   //    this.imagesOptions.forEach(async (item) =>{
   //       const picture = await this.loadImage(item.image);
   //       if(item.sx){
   //          const cutPicture = new CutPicture(picture , item.sx, item.sy, item.swidth, item.sheight, item.x, item.y, item.width, item.height);
   //          cutPicture.draw(context);
   //       } else {
   //          const btn = new Button(picture, item.x, item.y, item.width, item.height);
   //          btn.draw(context);
   //       }
   //    });
   // }

   // private loadImage(src: string): Promise<HTMLImageElement> {
   //    return new Promise((resolve) =>{
   //       const image = new Image();
   //       image.src = src;
   //       image.onload = () => resolve(image);
   //      });
   //   } 

   //   private canvasEvents(e: MouseEvent, canvas: HTMLCanvasElement){
   //    const rect = canvas.getBoundingClientRect();
   //    const mouseX = e.clientX - rect.left;
   //    const mouseY = e.clientY - rect.top;

      

   //   }

   // imagesOptions: { image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight:number;}[];
