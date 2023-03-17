import { atom } from "recoil";
import { celebrityProps, FaceProps } from "@/types/analyzers";

const imgBaseAtom = atom<string>({
    key: 'imgbase',
    default: "",
});

const faceInfoAtom = atom<FaceProps>({
    key: "faceInfo",
    default: {
        gender: {
            value: "",
            confidence: 0,
        },
        age: {
            value: "",
            confidence: 0,
        },
        emotion: {
            value: "",
            confidence: 0,
        },
    },
});

const celebrityAtom = atom<celebrityProps>({
    key: "celebrity",
    default: {
        celebrity: {
            value: "",
            confidence: 0,
        },
    }
})

export { imgBaseAtom, faceInfoAtom, celebrityAtom };