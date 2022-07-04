import GraphicMessage from '../components/UI/GraphicMessage';
import PageWrapper from '../components/UI/PageWrapper';
import {ILLUSTRATIONS} from '../constants/illustrations';
import { STRINGS } from '../constants/strings';

const PageNotFound = () => {

    return (
        <PageWrapper title='Not found'>
            <GraphicMessage illustration={ILLUSTRATIONS.PAGE_NOT_FOUND}
                            title={STRINGS.PAGE_NOT_FOUND_TITLE}
                            text={STRINGS.PAGE_NOT_FOUND_TEXT}
                            link={{
                                path: '/',
                                text: STRINGS.PAGE_NOT_FOUND_LINK_TEXT
                            }}/>
        </PageWrapper>

    )
}

export default PageNotFound;