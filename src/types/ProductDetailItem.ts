export interface Description {
  text: string[];
  title: string;
}

export interface ProductDetailItem {
  camera: string;
  capacity: string;
  capacityAvailable: string[];
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: Description[];
  id: string;
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: string;
  priceRegular: string;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
}
