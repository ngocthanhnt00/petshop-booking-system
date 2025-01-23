export enum ProductStatus {
  AVAILABLE = 'có hàng',
  OUT_OF_STOCK = 'hết hàng',
  DISCONTINUED = 'ngừng kinh doanh',
  COMING_SOON = 'sắp ra mắt'
}

export const ProductStatusMapping: Record<string, ProductStatus> = {
  AVAILABLE: ProductStatus.AVAILABLE,
  OUT_OF_STOCK: ProductStatus.OUT_OF_STOCK,
  DISCONTINUED: ProductStatus.DISCONTINUED,
  COMING_SOON: ProductStatus.COMING_SOON
};
