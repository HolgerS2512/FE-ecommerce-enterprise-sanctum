import { Link } from "react-router-dom";

const GenerateMenuHtml = ({ categories, products }) => {

  const renderProduct = (id, product) => (
    <li key={id}>
      <Link to={product.name}>{product.name}</Link>
    </li>
  );
  
  const renderCategory = (category, i) => (
    <li key={i}>
      <span tabIndex={1}>{category.name}</span>

      {
        Boolean(category.subcategories.length) 
        ? (
            <ul>
              {category.subcategories.map((subCategory, i) => renderCategory(subCategory, i))}
            </ul>
          )
        : <ul>
            {products && products.map((product, i) => renderProduct(category.id, product))}
          </ul>
      }
    </li>
  );

  return (
    <ul>
      {categories.map((category, i) => renderCategory(category, i))}
    </ul>
  )
}

export default GenerateMenuHtml
