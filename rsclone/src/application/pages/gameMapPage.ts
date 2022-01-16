import Picture from "../../utils/canvasBtn";
import CutPicture from "../../utils/cutPictures";
import  Control from "../../builder/controller";

interface IButtons {
    name: string, image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; 
}
export default class GameMapPage extends Control {
     startLevel!: () => void;
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
         {  
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
         }
      ]; 
      this.buttons = [
         {  
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
         name: "уровень1",
         image: "images/map/new__level.png",
         x: 590, 
         y: 958,
         width: 54,
         height: 54, 
         sx: 11,
         sy: 164,
         swidth: 54,
         sheight: 54
      }
      ];  
      // коэффициенты масштаба
      this.curWidthK = 1;
      this.curHeightK = 1;
      this.heightRatio = 1.33333333;

      const canvasContainer = new Control(this.node, "div", "canvas__container", "");
      const canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");
      this.createCanvas(canvas.node);
      this.scaleNumber(canvas.node);

     
      window.onresize = () =>{   
         this.resize(canvas.node);
         // запоминает масштаб
         this.scaleNumber(canvas.node);        
      };   
  }

      private scaleNumber(canvas: HTMLCanvasElement) {
         const widthContainer = getComputedStyle(canvas).width;
         const heightContainer = getComputedStyle(canvas).height;
         console.log(heightContainer, widthContainer);
          this.curWidthK = 1600 / parseInt(widthContainer, 10);
          this.curHeightK = 1200 / parseInt(heightContainer, 10);
         //  console.log(this.curWidthK, this.curHeightK);
         // alert(`w: ${widthContainer}, k: ${this.curWidthK}`);
   }
 
   private resize(canvas: HTMLCanvasElement) {
      canvas.style.height = `${this.heightRatio * canvas.width}`;
   }

   private createCanvas(canvas: HTMLCanvasElement) {
      canvas.addEventListener("click", (e) => {
            this.canvasEventsHundler(e, canvas, this.buttons);
         });
      canvas.width = 1600;
      canvas.height = 1200;
      const context = <CanvasRenderingContext2D>canvas.getContext("2d");

      const pictures = this.imagesOptions.map(image => this.loadImage(image.image));
      Promise.all(pictures).then(responses => {
         responses.forEach((img, index)=> {
           const item = this.imagesOptions[index];
           if(item.sx){
            const cutPicture = new CutPicture(img , item.sx, item.sy, item.swidth, item.sheight, item.x, item.y, item.width, item.height);
            cutPicture.draw(context);
           } else {
            const btn = new Picture(img, item.x, item.y, item.width, item.height);
           btn.draw(context); 
           }
         });   
      });
   }

   private loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve) =>{
         const image = new Image();
         image.src = src;
         console.log(image.src);
         image.onload = () => resolve(image);
        });
     } 

   private canvasEventsHundler(e: MouseEvent, canvas: HTMLCanvasElement, buttons: IButtons[]){
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      buttons.forEach(btn => {
         const currentX = btn.x / this.curWidthK;
         const currentW = btn.width / this.curWidthK;
         const currentY = btn.y / this.curHeightK;
         const currentH = btn.height / this.curHeightK;
         if(mouseX >= currentX && mouseX < (currentX + currentW) && mouseY >= currentY && mouseY < currentY + currentH) {
            switch(btn.name){
               case "магазин": {
                  this.onSelectShop();
                  break;
               }
               case "меню": {
                  this.onBack();
                  break;
               }
               case "уровень1": {
                  this.startLevel();
                  break;
               }
               default: {
                  console.log("error");
               }
            }
         }
      });
     }  
}


