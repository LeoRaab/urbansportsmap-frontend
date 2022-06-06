import COLOR_SCHEME from "../types/ColorScheme";

type ColorSchemeProps = {
    colorScheme: COLOR_SCHEME | COLOR_SCHEME.ERROR
}

const useColorScheme = ({ colorScheme }: ColorSchemeProps): {bgColor: string, textColor: string} => {
    let bgColor: string;
    let textColor: string;

    switch (colorScheme) {
        case COLOR_SCHEME.ERROR:
            bgColor = 'bg-red-400';
            textColor = 'text-white';
            break;
        case COLOR_SCHEME.SUCCESS:
        default:
            bgColor = 'bg-green-400';
            textColor = 'text-white';
            break;
    }

    return { bgColor, textColor }
}

export default useColorScheme;