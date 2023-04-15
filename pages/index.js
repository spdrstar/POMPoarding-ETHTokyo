import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading';

const Home = () => {
  const [user] = useContext(UserContext);

  useEffect(() => {
    if(user?.email) {
      //Router.push('/profile')
      const checkEmail = async () => {
        const email = user.email;
        const checkEmailRes = await fetch('/api/findCommunityByEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const checkEmailData = await checkEmailRes.json();
    
        // Redirect to the dashboard if the email exists, otherwise continue to profile
        if (checkEmailData.objects && checkEmailData.objects.length > 0) {
          Router.push('/dashboard');
        } else {
          Router.push('/profile');
        }
      }
      checkEmail();
    }
  }, [user])

  return <>{user?.loading ? <Loading /> : user?.issuer && <div>Thank you! Next</div>}</>;
};

export default Home;
