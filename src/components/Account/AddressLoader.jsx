import { useEffect } from "react"

const AddressLoader = ({ closeLoader }) => {

  useEffect(() => {
    setTimeout(closeLoader, 50);
  }, []);

  return (
    <div className="mb-5">
      
    </div>
  )
}

export default AddressLoader
