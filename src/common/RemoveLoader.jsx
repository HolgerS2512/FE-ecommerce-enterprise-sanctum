import React, { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom';

const RemoveLoader = () => {
  const { isLoading, setIsLoading } = useOutletContext();

  useEffect(() => {
    /*
    * Loading without spinner
    * Have to set every false - in this middleware managing loading state
    */
    if (isLoading) setIsLoading(false);
  }, [isLoading]);

  return <Outlet />
}

export default RemoveLoader
