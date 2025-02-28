export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out of stock',
  DISCONTINUED = 'discontinued',
  COMING_SOON = 'coming soon'
}

export const ProductStatusMapping: Record<string, ProductStatus> = {
  AVAILABLE: ProductStatus.AVAILABLE,
  OUT_OF_STOCK: ProductStatus.OUT_OF_STOCK,
  DISCONTINUED: ProductStatus.DISCONTINUED,
  COMING_SOON: ProductStatus.COMING_SOON
};
