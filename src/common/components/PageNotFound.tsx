import GraphicMessage from '../components/UI/GraphicMessage';
import PageWrapper from '../components/UI/PageWrapper';
import {ILLUSTRATIONS} from '../constants/illustrations';

const PageNotFound = () => {

    return (
        <PageWrapper title='Not found'>
            <GraphicMessage illustration={ILLUSTRATIONS.PAGE_NOT_FOUND}
                            title={'Seite nicht gefunden!'}
                            text={'Uuups... Wir konnten die gesuchte Seite nicht finden!'}
                            link={{
                                path: '/',
                                text: 'Hier kommst du zurück.'
                            }}/>
        </PageWrapper>

    )
}

export default PageNotFound;