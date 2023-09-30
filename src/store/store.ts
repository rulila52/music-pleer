import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { createSongsReducer } from "./songs/songsReducer";

const reducer = {
    songs: createSongsReducer(),
};

export const store = configureStore({ reducer });

export type RootState = StateFromReducersMapObject<typeof reducer>;
