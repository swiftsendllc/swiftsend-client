export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  region: string;
  gender: string;
}

export interface UpdateUserInput {
  username: string;
  website: string;
  bannerURL: string;
  pronouns: string;
  bio: string;
  avatarURL: string;
  websiteURL: string;
}