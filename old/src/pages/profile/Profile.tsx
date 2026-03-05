import './Profile.css';
import Image from '../../components/image/Image';
import { getProfile, getProfileImage } from '../../repositories/ProfileRepository';
import { useEffect, useState } from 'react';
import TrianglesParticles from '../../components/particles/TrianglesParticles';
import Contacts from '../contacts/Contacts';
import ProfileModel from '../../model/Profile';

function Profile() {
    const [profile, setProfile] = useState<ProfileModel>();
    const [profileImage, setProfileImage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getProfile();
            setProfile(profile);

            const profileImage = await getProfileImage(profile);
            setProfileImage(profileImage);
        }

        fetchData().catch(console.error);
    }, []);

    return (
        <div className='profile' id='profile'>
            <TrianglesParticles className='profile-particles' backgroundColor='#507790' />
            <div className='profile-image'>
                <Image source={profileImage} alt='profile-image' disableContextMenu={true} disableDrag={true} />
            </div>
            <div className='profile-name'>
                {profile?.name}
            </div>
            <div className='profile-title'>
                {profile?.title}
            </div>
            <Contacts />
        </div>
    );
}

export default Profile;