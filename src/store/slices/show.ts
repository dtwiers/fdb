import { createSlice } from "@reduxjs/toolkit";


export type ShowSong = {
  title: string;
  duration: Duration;
};

export type IgnitionEvent<T = any> = {
  item: T;
  startTime: Duration;
  rack?: string;
};


export type Fuse = {
  title: string;
  speed: number;
  startTime: Duration;
  downstreamEvents: IgnitionEvent[];
}

export type Show = {
  songs: ShowSong[];
  
}

export const show = createSlice({
  reducers: {
    
  }
})