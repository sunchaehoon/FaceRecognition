export interface FaceProps {
    gender: {
        value: string,
        confidence: number,
    },
    age: {
        value: string,
        confidence: number,
    },
    emotion: {
        value: string,
        confidence: number,
    },
}