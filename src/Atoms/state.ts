import { atom } from "recoil";

const PreviewAtom = atom<string>({
    key: 'imgbase',
    default: "",
})



export { PreviewAtom };