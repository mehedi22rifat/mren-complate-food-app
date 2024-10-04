import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { Typewriter } from 'react-simple-typewriter'

const Deshboard = () => {
  const {user} = useAuth()


 
  return (
    <div className='text-3xl  space-y-6 ml-32 font-bold flex flex-col justify-center items-center mt-10'>

<h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}>
       {' '}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={['Wellcome To Our Deshobard', 'Wellcome To Our Deshobard']}
            loop={2}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          
          
          />
        </span>
      </h1>
     
      <img className='w-20 h-20 rounded-full' src={user?.photoURL} alt="" />
      <h1> Name : {user?.displayName}</h1>

    

      
      </div>



  )
}

export default Deshboard