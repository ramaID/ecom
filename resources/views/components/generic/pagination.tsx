import React from 'react'
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '~/views/components/pagination'

interface PaginationComponentProps {
  links: Array<{ url: string | null; label: string; active: boolean }>
  prevPageUrl: string | null
  nextPageUrl: string | null
}

export const GenericPagination: React.FC<PaginationComponentProps> = ({ links, prevPageUrl, nextPageUrl }) => {
  const getFullUrl = (pageUrl: string) => {
    const urlLink = new URL(pageUrl, window.location.origin)
    const url = new URL(window.location.href)
    url.searchParams.set('page', urlLink.searchParams.get('page') || '1')
    return url.toString()
  }

  return (
    <Pagination className="mt-8">
      <PaginationPrevious href={prevPageUrl && getFullUrl(prevPageUrl)} />
      <PaginationList>
        {links.map((link, index) => (
          <React.Fragment key={'pagination-link-' + index}>
            {link.label === '...' ? (
              <PaginationGap />
            ) : (
              index !== 0 &&
              index !== links.length - 1 &&
              link.url && (
                <PaginationPage href={getFullUrl(link.url)} current={link.active}>
                  {link.label}
                </PaginationPage>
              )
            )}
          </React.Fragment>
        ))}
      </PaginationList>
      <PaginationNext href={nextPageUrl && getFullUrl(nextPageUrl)} />
    </Pagination>
  )
}
