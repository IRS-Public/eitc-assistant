const filingStatusKey = (filingStatus) => {
    let fsKey

    switch (filingStatus) {
        case 'married-separate':
            fsKey = 2
            break
        case 'single':
            fsKey = 0
            break
        case 'head-of-household':
            fsKey = 3
            break
        case 'married':
            fsKey = 1
            break
        case 'widow':
            fsKey = 4
            break
        default:
            fsKey = 0
    }

    return fsKey
}

export default filingStatusKey
