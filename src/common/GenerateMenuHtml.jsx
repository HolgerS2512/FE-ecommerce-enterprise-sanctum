const GenerateMenuHtml = ({ categories }) => {
  
  const renderCategory = (category) => (
    <li key={category.id}>
      <span href="" tabIndex={1}>{category.name}</span>

      {Boolean(category.subcategories.length) && (
        <ul>
          {category.subcategories.map((subCategory) => renderCategory(subCategory))}
        </ul>
      )}
    </li>
  );

  return (
    <ul>
      {categories.map((category) => renderCategory(category))}
    </ul>
  )
}

export default GenerateMenuHtml
