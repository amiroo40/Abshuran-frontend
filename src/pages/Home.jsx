import { useContext } from 'react';
import { Error, FifthToLastNews, FirstNews, Loading, SecondToFourthNews } from '../components';
import NewsContext from '../context/newsContext';

const Home = () => {

    const { news, loading, error } = useContext(NewsContext)

    return (
        <>
            {loading && <Loading />}

            {error && <Error error={error} />}
            
            <div className='sl:mt-36 mt-16 '>

                {news &&
                    <>
                        <FirstNews />
                        <SecondToFourthNews />
                        <FifthToLastNews />
                    </>
                }
            </div>
        </>
    )
}

export default Home