import {FaSpinner} from 'react-icons/fa';

export const LoadingIcon = () => {
  return (
    <div className='d-flex flex-row justify-content-center align-items-center'>
      <FaSpinner 
      className='loaderIcon'
      style={{fontSize:'3rem'}} />
    </div>
  );
};
