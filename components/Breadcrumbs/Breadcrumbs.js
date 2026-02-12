import React from 'react'

const Breadcrumbs = ({ className, children }) => (
  <div data-testid="breadcrumbs" className={className}>
    <ul id="breadcrumbList" className="block my-2 text-black text-sm">{children}</ul>
  </div>
)

export default Breadcrumbs
