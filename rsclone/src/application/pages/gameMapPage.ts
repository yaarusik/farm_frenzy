import  Control from "./../../builder/controller";

interface IButtons {
    name: string, image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; 
}
export default class GameMapPage extends Control {
     startLevel!: (levelNumber: number) => void;
   onBack!: () => void;
   onSelectShop!: () => void;

   heightRatio: number;
   curWidthK: number;
   curHeightK: number;
   imagesOptions: IButtons[];
   buttons: IButtons[];

   constructor(parentNode: HTMLElement, tagName = "div", className = "", content = ""){
      super(parentNode, tagName, className, content);

      this.imagesOptions = [
         {
            name: "карта",
            image: "images/map/map.jpg",
            x: 0, 
            y:0,
            width: 1600,
            height: 1200, 
            sx: 0,
            sy: 0,
            swidth: 0,
            sheight: 0
         },
         {
            name: "меню__бар",
            image: "images/map/map__menu.png",
            x: 0, 
            y: 1092,
            width: 1600,
            height: 110,
            sx: 0,
            sy: 0,
            swidth: 0,
            sheight: 0
         },
      ]; 
      this.buttons = [  {  
         name: "магазин",
         image: "images/map/button_3.png",
         x: 16, 
         y: 1114,
         width: 148,
         height: 62, 
         sx: 2,
         sy: 2,
         swidth: 75,
         sheight: 37
      },
      {
         name: "меню",
         image: "images/map/button_3.png",
         x: 1456, 
         y: 1114,
         width: 134,
         height: 62, 
         sx: 2,
         sy: 2,
         swidth: 75,
         sheight: 37
      }, 
      {
         name: "уровень 1",
         image: "images/map/new__level.png",
         x: 590, 
         y: 958,
         width: 54,
         height: 54, 
         sx: 11,
         sy: 164,
         swidth: 54,
         sheight: 54
      }];  

      this.curWidthK = 0;
      this.curHeightK = 1200;
      this.heightRatio = 1.33333333;

       const canvasContainer = new Control(this.node, "div", "canvas__container", "");
      const canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");
      this.createCanvas(canvas.node);
      this.scaleNumber(canvas.node);

     
      window.onresize = () =>{   
         this.resize(canvas.node);
         this.scaleNumber(canvas.node);
         
      };
      
  }

      private scaleNumber(canvas: HTMLCanvasElement) {
         const widthContainer = getComputedStyle(canvas).width;
         const heightContainer = getComputedStyle(canvas).height;
          this.curWidthK = 1600 / parseInt(widthContainer, 10);
          this.curHeightK = 1200 / parseInt(heightContainer, 10);
         // alert(`w: ${widthContainer}, k: ${this.curWidthK}`);
   }
 
   private resize(canvas: HTMLCanvasElement) {
      canvas.style.height = `${this.heightRatio * canvas.width}`;
   }

   private createCanvas(canvas: HTMLCanvasElement) {
      canvas.addEventListener("click", (e) => {
            this.canvasEvents(e, canvas);
         });
      canvas.width = 1600;
      canvas.height = 1200;
      const context = <CanvasRenderingContext2D>canvas.getContext("2d");

      this.imagesOptions.forEach(async (item) =>{
         const picture = await this.loadImage(item.image);
         if(item.sx){
            const cutPicture = new CutPicture(picture , item.sx, item.sy, item.swidth, item.sheight, item.x, item.y, item.width, item.height);
            cutPicture.draw(context);
         } else {
            const btn = new Button(picture, item.x, item.y, item.width, item.height);
            btn.draw(context);
         }
      });
   }

   private loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve) =>{
         const image = new Image();
         image.src = src;
         image.onload = () => resolve(image);
        });
     } 

   private canvasEvents(e: MouseEvent, canvas: HTMLCanvasElement){
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const obj = {
         image: "images/map/new__level.png",
         x: 590, 
         y: 958,
         width: 54,
         height: 54, 
         sx: 11,
         sy: 164,
         swidth: 54,
         sheight: 54
      };


         alert(`x: ${mouseX}, xMath: ${obj.x / this.curWidthK}, this: ${this.curWidthK}`);
         if(mouseX >= (obj.x / this.curWidthK) && mouseX < (obj.x / this.curWidthK) + (obj.width / this.curWidthK) && mouseY >= (obj.y / this.curHeightK) && mouseY < (obj.y / this.curHeightK) + (obj.height / this.curHeightK)){
            alert("button");
         }
     }
    
//   private responsive(canvas: HTMLCanvasElement) {
//    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//    const height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
//    const widthn = width - 100;
//    const heightn = height - 100;
//    canvas.width = widthn;
//    canvas.height = heightn;
// }
}
class Button {
   height: number;
   width: number;
   ypoint: number;
   xpoint: number;
   picture: HTMLImageElement;

   constructor(image: HTMLImageElement,xpoint: number, ypoint: number, width: number, height: number){
      this.xpoint = xpoint;
      this.ypoint = ypoint;
      this.width = width;
      this.height = height;
      this.picture = image;
   }

   public draw(ctx: CanvasRenderingContext2D){
      ctx.drawImage(this.picture , this.xpoint, this.ypoint, this.width, this.height);
   }
}

class CutPicture extends Button {
   sheight: number;
   swidth: number;
   sypoint: number;
   sxpoint: number;

   constructor(image: HTMLImageElement, sxpoint: number, sypoint: number, swidth: number, sheight: number,xpoint: number, ypoint: number, width: number, height: number){
      super(image, xpoint, ypoint, width, height);
      this.sxpoint = sxpoint;
      this.sypoint = sypoint;
      this.swidth = swidth;
      this.sheight = sheight;
   }

   public draw(ctx: CanvasRenderingContext2D){
      ctx.drawImage(this.picture, this.sxpoint, this.sypoint, this.swidth, this.sheight, this.xpoint, this.ypoint, this.width, this.height);
   }
}




 //    const canvas = new fabric.Canvas(canvasTag.node, {
   //       width: 1600,
   //       height: 1200,
   //       hoverCursor: "auto",
   //    });
   //    // адаптивный холст
   //    window.onresize = (): void => {
   //       this.responsive(canvas);
   //    };

   //    fabric.Image.fromURL("images/map/map.jpg", (image) => {
   //    image.set({
   //       selectable: false, 
   //       width: canvas.getWidth(),
   //    });
   //    canvas.add(image);
   // });
   // const menu = fabric.Image.fromURL("images/map/map__menu.png", (image) => {
   //    image.set({selectable: false, left: 0, top: 2,});
   //    image.scaleToWidth(canvas.getWidth());
   //    canvas.add(image);

   //    image.on("selected", () => {
   //       console.log("hi");
   //    });
   // });
   // fabric.Image.fromURL("images/map/button_3.png", (image) => {
   //    image.set({selectable: false, left: 100, top: 102,});
   //    image.on("selected", () => {
   //       console.log("hi");
   //    });
   //    canvas.add(image);
   // });