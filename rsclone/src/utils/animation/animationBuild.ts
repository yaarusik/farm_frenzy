
// import { IAnimBuild, IBuild } from "../../application/iterfaces";
// import { animationBuildOptions } from '../gameData/levelData';

// type dust = {
//   type: string; name: string; image: string; stepY: number; stepX: number; frameX: number; frameY: number; maxX: number; maxY: number; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number;
// }

// export default class SpawnBild {
//   canvas: HTMLCanvasElement;
//   context: CanvasRenderingContext2D;




//   animationBuildOptions: IAnimBuild[];
//   dust: dust;
//   well: { type: string; name: string; image: string; stepY: number; frameX: number; frameY: number; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; };
//   animationEffectsOptions: IAnimBuild;
//   constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, animationEffectsOptions: IBuild) {
//     this.canvas = canvas;
//     this.context = context;
//     this.animationBuildOptions = animationBuildOptions;
//     this.animationEffectsOptions = animationEffectsOptions;

//     this.dust = {
//       type: "animation",
//       name: "dust",
//       image: "images/level/builds/well/house_well_step_1.png",
//       stepY: 48,
//       stepX: 40,
//       frameX: 5,
//       frameY: 10,
//       maxX: 200,
//       maxY: 400,
//       x: 500,
//       y: 100,
//       width: 240,
//       height: 248,
//       sx: 40,
//       sy: 48,
//       swidth: 40,
//       sheight: 48
//     };

//     this.well =
//     {
//       type: "animation",
//       name: "well",
//       image: "images/level/builds/well/house_well_step_1.png",
//       stepY: 100,
//       frameX: 0,
//       frameY: 0,
//       x: 720,
//       y: -200,
//       width: 230,
//       height: 180,
//       sx: 0,
//       sy: 0,
//       swidth: 128,
//       sheight: 100
//     };

//   }

//   // один раз только нужно запустить
//   public buildSpawn(buildsOptions: IBuild[]) {
//     this.animationBuildOptions.forEach((item, index) => {
//       buildsOptions.forEach((build) => {
//         setTimeout(() => this.buildAnimation(item, build), 500 * index);
//       });
//     });
//   }

//   // public wellAnimation() {

//   // }

//   // private dustAnimation(dust: dust) {
//   //   const image = new Image();
//   //   image.src = dust.image;
//   //   this.context.drawImage(image, dust.sx, dust.sy, dust.swidth, dust.sheight, dust.x, dust.y, dust.width, dust.height);
//   // }



//   private buildAnimation(item: IAnimBuild, build: IBuild) {
//     if (item.name === build.name && item.name !== 'dust') {
//       if (item.maxY > build.y)
//         build.y += item.speed;
//     }
//     // this.dustAnimation(this.dust);
//   }
// }