export enum EGender {
    MALE = 'MALE', FEMALE = 'FEMALE', OTHER = "OTHER"
}

export function mapGender(genderString: string): EGender {
    switch (genderString.toUpperCase()) {
        case 'MALE':
            return EGender.MALE;
        case 'FEMALE':
            return EGender.FEMALE;
        default:
            return EGender.OTHER;
    }
}
