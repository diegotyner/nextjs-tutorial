'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropwdown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  const signOutHandler = async () => {
    signOut();
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt="logo" width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Nav */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOutHandler} className='outline_btn'>Sign Out</button>
            <Link href="/profile">
              <Image src={session.user.image || "/assets/images/no_pfp.svg"} alt="profile" width={37} height="37" className='rounded-full'></Image>
            </Link>
          </div>
        ) : 
        <>  
          {providers && Object.values(providers).map((provider) => (
            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
          ))}
        </>
        }
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
              <Image src={session.user.image || "/assets/images/no_pfp.svg"} alt="profile" width={37} height="37" className='rounded-full' onClick={() => setToggleDropwdown((prev) => !prev)}/>
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link href="/profile" className='dropdown_link' onClick={() => setToggleDropwdown(false)}>
                    My Profile
                  </Link>
                  <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggleDropwdown(false)}>
                    Create Prompt
                  </Link>
                  <button type='button' className='mt-5 w-full black_btn' onClick={() => {
                    setToggleDropwdown(false);
                    signOut();
                  }}>
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ) : 
        <>  
          {providers && Object.values(providers).map((provider) => (
            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
          ))}
        </>
        }
      </div>
    </nav>
  )
}

export default Nav