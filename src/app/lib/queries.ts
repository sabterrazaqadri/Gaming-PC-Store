export const productsQuery = `
  *[_type == "product"] {
    _id,
    title,
    price,
    description,
    category->{title},
    images[]{
      asset->{
        _id,
        url
      }
    }
  }
`

// Simple test query to check if category schema exists
export const testCategoryQuery = `
  *[_type == "category"] {
    _id,
    title
  }
`

export const categoriesQuery = `
  *[_type == "category"] {
    _id,
    title,
    icon,
    subcategories[]{
      title
    }
  }
`

export const subcategoriesQuery = `
  *[_type == "subcategory"] {
    _id,
    title,
    category->{
      _id,
      title
    }
  }
`
