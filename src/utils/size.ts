class sizeConfig {
  screenHeight: number;
  screenWidth: number;
  figmaWidth = 402; // Figma design width
  figmaHeight = 874; // Figma design height
  scaleWidth: number;
  scaleHeight: number;
  textMultiplier: number;
  imageSizeMultiplier: number;
  heightMultiplier: number;
  widthMultiplier: number;

  constructor(height: number, width: number) {
    this.screenHeight = height;
    this.screenWidth = width;

    // Figma scaling factors
    this.scaleWidth = this.screenWidth / this.figmaWidth;
    this.scaleHeight = this.screenHeight / this.figmaHeight;

    // Multipliers
    this.textMultiplier = this.scaleHeight;
    this.imageSizeMultiplier = this.scaleWidth;
    this.heightMultiplier = this.scaleHeight;
    this.widthMultiplier = this.scaleWidth;
  }

  widthSize(value: number): number {
    return value * this.scaleWidth;
  }

  heightSize(value: number): number {
    return value * this.scaleHeight;
  }

  fontSize(value: number): number {
    return value * this.scaleHeight;
  }

  getWidthSize(value: number): number {
    return value * this.scaleWidth;
  }

  getHeightSize(value: number): number {
    return value * this.scaleHeight;
  }

  borderRadiusSize(value: number): number {
    return value * this.scaleWidth;
  }
}
export const sizes = sizeConfig;
