import { SongData } from "../models/SongData";
import infinityCycleMp3 from "../assets/sounds/songs/bensound-infinitycycle.mp3";
import metamorphosisMp3 from "../assets/sounds/songs/bensound-metamorphosis.mp3";
import movingwayupMp3 from "../assets/sounds/songs/bensound-movingwayup.mp3";
import raindropsMp3 from "../assets/sounds/songs/bensound-raindrops.mp3";
import thedeclineofmankindMp3 from "../assets/sounds/songs/bensound-thedeclineofmankind.mp3";
import voyageverslenordMp3 from "../assets/sounds/songs/bensound-voyageverslenord.mp3";
import infinityCycleCover from "../assets/images/covers/infinitcycle_spearfisher.jpg";
import metamorphosisCover from "../assets/images/covers/metamorphosis_laneking.jpg";
import movingwayupCover from "../assets/images/covers/movingwayup_marcus.jpg";
import raindropsCover from "../assets/images/covers/movingwayup_marcus.jpg";
import thedeclineofmankindCover from "../assets/images/covers/thedeclineofmankind_gefilterfish.jpg";

export const songs: SongData[] = [
    {
        audioFile: infinityCycleMp3,
        title: "Infinity Cycle",
        artist: "Spearfisher",
        cover: infinityCycleCover,
    },
    {
        audioFile: metamorphosisMp3,
        title: "Metamorphosis",
        artist: "Lane King",
        cover: metamorphosisCover,
    },
    {
        audioFile: movingwayupMp3,
        title: "Moving WayUp",
        artist: "Marcus",
        cover: movingwayupCover,
    },
    {
        audioFile: raindropsMp3,
        title: "Raindrops",
        artist: "Veace D",
        cover: raindropsCover,
    },
    {
        audioFile: thedeclineofmankindMp3,
        title: "The Decline Of Man Kind",
        artist: "Ge Filter Fish",
        cover: thedeclineofmankindCover,
    },
    {
        audioFile: voyageverslenordMp3,
    },
];
