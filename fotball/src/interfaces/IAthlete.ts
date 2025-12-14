export interface IAthlete {
  id?: number;
  name: string;
  gender: "Male" | "Female" | "Other";
  image: string;
  price: number;
  purchaseStatus: boolean;
}
