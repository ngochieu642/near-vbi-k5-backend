export type GenderMale = 'male';
export type GenderFemale = 'female';
export type Gender = GenderMale | GenderFemale;

export type Vietnam = 'Vietnam';
export type Nationality = Vietnam;

export type FaceVector = number[][];

export type Pending = 'pending';
export type Rejected = 'rejected';
export type Approved = 'approved';
export type IdentityRequestStatus = Pending | Rejected | Approved;

export interface UserInJwt {
  id: string;
  email: string;
}
