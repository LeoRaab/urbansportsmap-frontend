import COLOR_SCHEME from "../types/ColorScheme";

type ColorSchemeProps = {
    type: COLOR_SCHEME | COLOR_SCHEME.ERROR
}

const useColorScheme = ({ type }: ColorSchemeProps): {bgColor: string, textColor: string} => {
    let bgColor: string;
    let textColor: string;

    switch (type) {
        case COLOR_SCHEME.ERROR:
            bgColor = 'bg-red-400';
            textColor = 'text-red-50';
            break;
        case COLOR_SCHEME.SUCCESS:
        default:
            bgColor = 'bg-green-400';
            textColor = 'text-green-50';
            break;
    }

    return { bgColor, textColor }
}

export default useColorScheme;