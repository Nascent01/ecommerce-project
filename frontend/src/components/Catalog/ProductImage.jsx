import React from 'react'
import src from '../../assets/product-placeholder.jpg'

export default function ProductImage({ alt, className }) {
   return (
     <img
       src={src}
       alt={alt}
       className={`${className}`}
     />
   )
}
