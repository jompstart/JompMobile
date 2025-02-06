class sizeConfig {
  screenHeight: number;
  screenWidth: number;
  _blockWidth = 0;
  _blockHeight = 0;
  textMultiplier: number;
  imageSizeMultiplier: number;
  heightMultiplier: number;
  widthMultiplier: number;
  isPortrait = true;
  isMobilePortrait = false;
  constructor(height: number, width: number) {
    this.screenHeight = height;
    this.screenWidth = width;
    this._blockWidth = this.screenWidth / 100;
    this._blockHeight = this.screenHeight / 100;
    this.textMultiplier = this._blockHeight;
    this.imageSizeMultiplier = this._blockWidth;
    this.heightMultiplier = this._blockHeight;
    this.widthMultiplier = this._blockWidth;
    // console.log(this.screenHeight)
  }
  widthSize(value: number): number {
    const size = value / 4.0;
    return size * this.widthMultiplier;
  }
  heightSize(value: number): number {
    const size = value / 8.96;
    return size * this.heightMultiplier;
  }
  fontSize(value: number): number {
    const size = value / 8.0;
    return size * this.textMultiplier;
  }

  getWidthSize(value: number): number {
    const size = value / 3.7;
    return size * this.widthMultiplier;
  }
  getHeightSize(value: number): number {
    const size = value / 8.3;
    return size * this.heightMultiplier;
  }
  borderRadiusSize(value: number): number {
    const size = value / 4;
    return size * this.widthMultiplier;
  }
}
export const sizes = sizeConfig;
