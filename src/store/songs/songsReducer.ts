import { createAction, createReducer } from "@reduxjs/toolkit";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";
import { SongData } from "../../models/SongData";
import { songsList } from "../../storage/songsList";

export interface SongsState {
    list: SongData[];
    currentSongIndex: number;
    isPlaying: boolean;
}

const initialState: SongsState = {
    list: songsList,
    currentSongIndex: 0,
    isPlaying: false,
};

const baseName = "songs";

export const toNextSongAction = createAction(`${baseName}/toNext`);
export const toPrevSongAction = createAction(`${baseName}/toPrev`);
export const setIsPlayingAction = createAction<boolean>(`${baseName}/setIsPlaying`);
export const setVolume = createAction<number>(`${baseName}/setVolume`);
export const setProgress = createAction<number>(`${baseName}/setProgress`);

export const createSongsReducer = (): ReducerWithInitialState<SongsState> =>
    createReducer<SongsState>(initialState, (builder) =>
        builder
            .addCase(toNextSongAction, (state) => {
                state.currentSongIndex = (state.currentSongIndex + 1) % state.list.length;
            })
            .addCase(toPrevSongAction, (state) => {
                state.currentSongIndex =
                    (state.currentSongIndex - 1 + state.list.length) % state.list.length;
            })
            .addCase(setIsPlayingAction, (state, { payload }) => {
                state.isPlaying = payload;
            }),
    );
