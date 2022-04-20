import { useEffect, useState } from 'react'

interface IUsePaginatorParams<T> {
    items: T[]
}

interface IUsePaginatorResult<T> {
    items: T[]
    nextPage: () => void
    prevPage: () => void
}

const PAGE_SIZE = 10

function usePaginator<T>({
    items,
}: IUsePaginatorParams<T>): IUsePaginatorResult<T> {
    const [offset, setOffset] = useState(0)
    const [paginatedItems, setPaginatedItems] = useState<T[]>(
        items.slice(0, PAGE_SIZE)
    )

    useEffect(() => {
        paginate(offset)
    }, [offset])

    const paginate = (offset: number) => {
        setPaginatedItems(items.slice(offset, offset + PAGE_SIZE))
    }

    const handleNextPage = () => {
        if (items.length > offset + PAGE_SIZE) {
            const newOffset = offset + PAGE_SIZE
            setOffset(newOffset)
        }
    }

    const handlePrevPage = () => {
        if (offset - PAGE_SIZE >= 0) {
            const newOffset = offset - PAGE_SIZE
            setOffset(newOffset)
        }
    }

    return {
        items: paginatedItems,
        nextPage: handleNextPage,
        prevPage: handlePrevPage,
    }
}

export default usePaginator
