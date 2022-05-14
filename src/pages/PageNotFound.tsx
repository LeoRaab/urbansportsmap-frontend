import GraphicMessage from '../components/UI/GraphicMessage';
import {ILLUSTRATIONS} from '../constants/Illustrations';

const PageNotFound = () => {

    return (
        <div className="mt-32">
            <GraphicMessage illustration={ILLUSTRATIONS.PAGE_NOT_FOUND}
                            title={'Seite nicht gefunden!'}
                            text={'Uuups... Wir konnten die gesuchte Seite nicht finden!'}
                            link={{
                                path: '/',
                                text: 'Hier kommst du zurück.'
                            }}/>
        </div>

    )
}

export default PageNotFound;