export interface Artist {
  
    artistId: number;
    artistName: string;
    DOB: Date;
    gender: string;
    artworkType: string;
    exhibitionDate: Date;
    specialNotes?: string;
    isFeatured: boolean;
  }
  