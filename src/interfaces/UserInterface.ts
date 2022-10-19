export type UserBaseType = {
  uid: string;
  displayName: string;
  photoURL: string;
};

export type UserInterface = {
  email: string;
  selectedPosts?: string;
} & UserBaseType;
