export interface CreatorAssetsEntity{
  creatorId: string;
  assetId: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
  _assets:AssetsEntity[]
}

export interface AssetsEntity {
  creatorId: string;
  originalURL: string;
  blurredURL: string;
  type: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
}