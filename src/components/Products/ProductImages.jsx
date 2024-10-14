
const ProductImages = ({ images }) => {
  return (
    <>
      {
        images?.map((img, i) => (
          <img key={i} src={img.url} width='auto' height={120} alt="" />
        ))
      }
    </>
  )
}

export default ProductImages
