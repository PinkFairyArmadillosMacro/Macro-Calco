import React from 'react';
import { useState, useEffect } from 'react';

const RecipeCollectionItem = (props) => {

  const {name, servingSize, cals, protein, carbs, fat, url} = props;
  return (
    <div className='recipe-collection-item-container'>
      <div className="recipe-collection-item-buttons">
        <button className='recipe-collection-item-delete-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </button>
      </div>
      <p>{name}</p>
      <div className="recipe-collection-item">
        <img src="https://edamam-product-images.s3.amazonaws.com/web-img/041/04158b5869398c899942336274f0e0f7-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJIMEYCIQD8yTzcZWvHgGrqe8QxAqPgo8GHx4xUcp9fkvvagCeDlQIhAOgpPIyVXmD7y2DDoIXk%2BQNQz9s4pObGbQa0bWKRmxZiKsIFCPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2Igzwil2Pd94%2F93aVlp4qlgUWFJXcDWBNIeWNdx9OWZP%2Bnwspgdx6fQSq0%2FzHEjdwnKGp%2Boqr6GqXlVJiMhA6to5unr3F85qTCLq3noKj26RnWg99JzB4RxoijmB8CAGvE%2FFg9RqoQOd7wCIzfoQWHz47yjweuZ%2BQTN88DdcNJbr2i04DwV3RGLIiYTrkPyu6y8L012Ynrh4MgOCW2zgU5wmdZRXybxmLSGrXowPgdhz8yLZl6L9%2BH6BRnN23MWCTEKurg4hjQeW3Du8vMkYlYIzI9ImssDKezr4R9mwvObLckysNMwgw4fdcw8ybWLXZwK%2F8Akr1Sno0B7fzFH4%2BYmBn24An2mV3cCNUxAOBDb0mvQlPkvTyamB0b%2BfRkuxsOE%2BvuyEuHLFW926Q2VvYXyFODxR%2Fon2M3X3ZG8%2B8u2WrMzi837JQpUrb8kmpLxTq3iBrUvCyMrFoaJGnUS9sIcwSdYOjc6plBKKAM%2BhX4UUqRWLumzyDFg22SPoHIulDJXXiLiZqBQlwqL%2BJbcY2LQ%2FzTmuJO35n3iJ8luSYJNf4eAF87uDJcBINGaKAHZTYOpPHyovPhKIEnV4knJaV36G7qILSPPBuBy0EZnRf9w4vEmPMIVO1JXdNCJZjWP%2BKBAuR7jL7j1G3JFXlNARssgRsYF8w%2FjEVWTjybCCRCsPf23B5W69Z2gGucVITQKQqeRB31d60W5VCPMuSrE5ugV60Y5Cm62Od7WAsnG9xQ%2F83PLL5ZgIppi3kLqTv09iUkYD%2BCY89m0HE5%2B0uB1TAhjp2bKLqZh8C%2FW7oiNbuF5FqYD4uOvtE2NcUOb2isPOkeY2VhO7Q0VLJDN8icsmUXOxcbKs2oQvz2765gooDYWBaW19RUwLkOYw3lEm16ujyWPa5TduhHTDjq5WgBjqwAXACf%2Fo%2F2aN%2BcWmSSBL3SxWi9E%2FTNkDabTpdfAV5hhs3%2BTc7W3nK6DF%2FiNdrA2m2If%2Fy6p%2FWH0E9Wx%2B7gVA9Z15ZFyLS38csCNcRU3ToS7iGUn3%2FP7wcSLfEXoRVCiMX2cELhwB9wc1i0ujoBrJ0hTqTDdAJDJrydNxfj9dwqSvhJTB21s6jxnaDz72Oc2MMTZZw6bUO5189N%2BTKdK22SHbr%2B5wmPOXmSg%2B%2FL14UPqhm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230306T042301Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKUE2QJ3P%2F20230306%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ec0e59b599cebb881f702ca4a3002c1e8d43757d1c18368a1c8afe097e20d260" alt="Recipe Image" />
        <div className="recipe-collection-item-macros">
          <div className="recipe-collection-item-table">
            <div className="recipe-collection-item-table-row">
              <p>Serving Size</p>
              <p>{servingSize}</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Carbs</p>
              <p>{carbs}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Fat</p>
              <p>{fat}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Protein</p>
              <p>{protein}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>kcal</p>
              <p>{cals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCollectionItem;