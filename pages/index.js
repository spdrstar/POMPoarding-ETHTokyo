import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading';

const Home = () => {
  const [user] = useContext(UserContext);

  useEffect(() => {
    if(user?.issuer) {
      Router.push('/profile')
    }
  }, [user])

  return <>{user?.loading ? <Loading /> : user?.issuer && <div>Thank you! Next</div>}</>;
};

export default Home;
