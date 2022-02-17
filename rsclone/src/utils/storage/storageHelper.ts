// export default class StorageHelper {
//   public getImg(product: string) {
//     let imgName = '';
//     const img = this.initialIcon.find(img => {
//       const imgUrl = img.src;
//       const iconName = imgUrl.substring(img.src.lastIndexOf('/') + 1, imgUrl.lastIndexOf('.'));
//       imgName = iconName;
//       return iconName === product;
//     });
//     return { name: imgName, img: img };
//   }
// }