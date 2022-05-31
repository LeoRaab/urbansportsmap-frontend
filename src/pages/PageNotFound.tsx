import GraphicMessage from '../components/UI/GraphicMessage';
import PageWrapper from '../components/UI/page-wrapper';
import {ILLUSTRATIONS} from '../constants/Illustrations';

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