import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading';
import Intro from '../components/intro';
import { Button } from "@nextui-org/react";

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            {/* <div className='label'>Email</div>
            <div className='profile-info'>{user.email}</div>

            <div className='label'>User Id</div>
            <div className='profile-info'>{user.issuer}</div> */}
            <Intro />
          </>
        )
      )}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap');
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
};

export default Profile;
