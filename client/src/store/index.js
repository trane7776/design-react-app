import { proxy } from 'valtio';
const state = proxy({
  color: '#000000',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './Pepsi.png',
  fullDecal: './Pepsi.png',
  canvas: null,
  currentTool: null,
});
export default state;
