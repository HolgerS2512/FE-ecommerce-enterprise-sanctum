const GenerateMenuHtml = ({ categories }) => {
  
  const renderCategory = (category, i) => (
    <li key={i}>
      <span href="" tabIndex={1}>{category.name}</span>

      {Boolean(category.subcategories.length) && (
        <ul>
          {category.subcategories.map((subCategory, i) => renderCategory(subCategory, i))}
        </ul>
      )}
    </li>
  );

  return (
    <ul>
      {categories.map((category, i) => renderCategory(category, i))}
    </ul>
  )
}

export default GenerateMenuHtml
