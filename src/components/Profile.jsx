import React from "react";

const Profile = ({ user, isAuthenticated, isLoading }) => {


   if (isLoading) {
      return <div>Loading ...</div>;
   }

   return (
      isAuthenticated && (
         <div className='flex flex-col items-center'>
            <img
               src={user.picture}
               alt={user.name}
               className='w-20 rounded-full'
            />
            {/* <h2>{user.name}</h2> */}
            <p>{user.email}</p>
         </div>
      )
   );
};

export default Profile;