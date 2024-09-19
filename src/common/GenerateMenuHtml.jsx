import { Link } from "react-router-dom";
import { transformSlug } from "../Modules/ObjectHelper";

const GenerateMenuHtml = ({ categories }) => {
  
  const renderCategory = (category, i, parentName = '') => (
    <li key={i}>
      <Link to={transformSlug(category.name, parentName)} tabIndex={1}>{category.name}</Link>
      
      {/* {(category.description && category.description.length > 5) && 
        <span tabIndex={1}>{category.description}</span>
      } */}

      {<ul>
        {category.subcategories?.map((subCategory, i) => renderCategory(subCategory, i, transformSlug(category.name, parentName)))}
      </ul>}
    </li>
  );

  return (
    <>
      {categories.map((category, i) => renderCategory(category, i))}
    </>
  )
}

export default GenerateMenuHtml
