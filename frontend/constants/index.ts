export interface IUser {
  username: string;
  accountType: "ADMIN" | "USER";
  JWT: string;
  fullName: string;
  phone?: string;
  email?: string;
}

export interface IEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  participants: Array<IParticipant>;
  location: ILocation;
  verified: boolean;
  imageUrl: string;
  organizerUsername: string;
}

export interface ILocation {
  city: string;
  postalCode: string;
  address: string;
}

export interface IParticipant {
  participantUsername: string;
  participationConfirmed: boolean;
}
